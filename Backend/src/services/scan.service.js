// services/scan.service.js
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import axeCore from 'axe-core';
import path from 'path';

const REPORT_DIR = process.env.REPORT_DIR || path.join(process.cwd(), 'reports');
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const RULE_FIXES = {
  'color-contrast': {
    title: 'Fix Color Contrast',
    fix: 'Increase contrast between foreground and background colors to meet WCAG AA ratio (4.5:1 for normal text). Use a contrast-checker and adjust CSS variables.',
    docs: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html'
  },
  'image-alt': {
    title: 'Add Meaningful Alt Text to Images',
    fix: 'Add descriptive alt text to images that convey meaning. Avoid using empty alt attributes for informative images.',
    docs: 'https://www.w3.org/WAI/tutorials/images/decision-tree/'
  },
  'label': {
    title: 'Ensure Form Elements Have Associated Labels',
    fix: 'Ensure all form elements have associated <label> elements or aria-label attributes for better accessibility.',
    docs: 'https://www.w3.org/WAI/tutorials/forms/labels/'
  }
};

function computeScore(axeResults) {
  const base = 100;
  const weights = { critical: 12, serious: 6, moderate: 3, minor: 1 };
  const counts = (axeResults?.violations || []).reduce((acc, v) => {
    const impact = v.impact || 'minor';
    acc[impact] = (acc[impact] || 0) + 1;
    return acc;
  }, {});

  let penalty = 0;
  for (const k of Object.keys(counts)) {
    penalty += (weights[k] || 1) * counts[k];
  }
  const score = Math.max(0, base - penalty);
  return { score, counts };
}

export async function runScan(url, scanId = null) {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided to runScan');
  }

  let browser = null;
  const id = uuidv4();
  const jsonReportFileName = `axe-results-${id}.json`;
  const htmlReportFileName = `report-${id}.html`;
  const screenshotFileName = `screenshot-${uuidv4()}.png`;

  const jsonReportPath = path.join(REPORT_DIR, jsonReportFileName);
  const htmlReportPath = path.join(REPORT_DIR, htmlReportFileName);
  const screenshotPath = path.join(REPORT_DIR, screenshotFileName);

  console.log(`[scan:${scanId || id}] runScan starting for:`, url);
  try {
    // Prepare puppeteer launch options
    const launchArgs = [];
    // allow override via env var for dev/CI: set PUP_NO_SANDBOX=1 to add no-sandbox args
    if (process.env.PUP_NO_SANDBOX === 'true' || process.env.PUP_NO_SANDBOX === '1') {
      launchArgs.push('--no-sandbox', '--disable-setuid-sandbox');
    }
    // Accept insecure certs if needed
    const launchOptions = {
      headless: true,
      args: launchArgs,
      ignoreHTTPSErrors: true
    };
    // Optionally allow custom chrome/chromium binary path via env
    if (process.env.CHROME_PATH) {
      launchOptions.executablePath = process.env.CHROME_PATH;
      console.log(`[scan:${scanId || id}] Using CHROME_PATH: ${process.env.CHROME_PATH}`);
    }

    console.log(`[scan:${scanId || id}] Launching browser...`);
    try {
      browser = await puppeteer.launch(launchOptions);
    } catch (err) {
      console.error(`[scan:${scanId || id}] puppeteer.launch failed:`, err.message || err);
      throw new Error(`Failed to launch headless browser: ${err.message || err}`);
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate with safer waitUntil and longer timeout
    console.log(`[scan:${scanId || id}] Navigating to URL...`);
    try {
      // Use domcontentloaded to avoid stuck waiting on heavy network resources; keep timeout 60s
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (err) {
      // try again with networkidle2 if needed or log and continue — but throw to let controller handle
      console.warn(`[scan:${scanId || id}] page.goto warning: ${err.message || err}`);
      // if navigation fails critically, rethrow
      throw new Error(`Navigation to ${url} failed: ${err.message || err}`);
    }

    // Inject axe-core
    console.log(`[scan:${scanId || id}] Injecting axe-core...`);
    try {
      await page.addScriptTag({ content: axeCore.source });
    } catch (err) {
      console.error(`[scan:${scanId || id}] axe injection failed:`, err.message || err);
      // We can choose to continue and run partial report, but better to throw so controller marks scan failed
      throw new Error(`Failed to inject axe-core: ${err.message || err}`);
    }

    // Run axe
    console.log(`[scan:${scanId || id}] Running axe.run on the page...`);
    let axeResults = null;
    try {
      axeResults = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        if (typeof axe === 'undefined' || !axe.run) {
          throw new Error('axe not available in page context');
        }
        return await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'section508'] }
        });
      });
    } catch (err) {
      console.error(`[scan:${scanId || id}] axe.run failed:`, err.message || err);
      throw new Error(`axe.run failed: ${err.message || err}`);
    }

    // Screenshot (best-effort)
    console.log(`[scan:${scanId || id}] Taking screenshot...`);
    try {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (err) {
      console.warn(`[scan:${scanId || id}] Screenshot capture failed:`, err.message || err);
      // don't fail the whole scan for screenshot failure
    }

    // compute score and prepare violations with fixes
    const { score, counts } = computeScore(axeResults);
    const violationsWithFixes = (axeResults?.violations || []).map(v => {
      const fixMeta = RULE_FIXES[v.id] || {};
      return {
        id: v.id,
        impact: v.impact,
        description: v.help || v.description || '',
        nodes: v.nodes,
        recommendedFix: fixMeta.fix || 'Review documentation and apply WCAG guidance for this rule.',
        docs: fixMeta.docs || ''
      };
    });

    const summary = {
      url,
      total: (axeResults?.violations || []).length,
      byImpact: counts,
      score
    };

    const outJson = {
      results: axeResults,
      summary,
      violations: violationsWithFixes,
      generatedAt: new Date().toISOString()
    };

    // Write JSON report (try/catch to avoid crashing)
    console.log(`[scan:${scanId || id}] Writing JSON report to ${jsonReportPath}...`);
    try {
      fs.writeFileSync(jsonReportPath, JSON.stringify(outJson, null, 2));
    } catch (err) {
      console.error(`[scan:${scanId || id}] Failed to write JSON report:`, err.message || err);
      // if write fails, we still continue but log error; controller can decide
    }

    // Build a simple HTML report (referencing screenshot file name)
    console.log(`[scan:${scanId || id}] Building HTML report at ${htmlReportPath}...`);
    try {
      const gradeMsg = score >= 85 ? `<span style="color:green">A</span>` : `<span style="color:red">RISK</span>`;
      const html = `
      <!doctype html>
      <html>
      <head><meta charset="utf-8"><title>A11y Report - ${url}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color:#222; background:#f7f8fb; }
          .header { display:flex; align-items:center; gap:16px; margin-bottom:12px }
          .badge { padding:6px 10px; border-radius:6px; background:#eef; font-weight:700;}
          .summary pre { background:#fff;padding:10px;border-radius:6px;overflow:auto; }
          .violation { margin-bottom:12px;padding:12px;border-left:4px solid #e74c3c;background:#fff9f9 }
          a.doc { font-size:0.9em; color:#0366d6; }
          img { max-width:100%; border:1px solid #ddd; margin-top:12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin:0">Accessibility Report</h1>
          <div class="badge">Score: ${score}/100 — ${gradeMsg}</div>
        </div>
        <p>URL: <a href="${url}" target="_blank" rel="noreferrer">${url}</a></p>
        <p>${new Date().toLocaleString()}</p>

        <div class="summary">
          <h2>Summary</h2>
          <pre>${JSON.stringify(summary, null, 2)}</pre>
        </div>

        <div>
          <h2>Violations & recommended fixes</h2>
          ${violationsWithFixes.map(v => `
            <div class="violation">
              <h3>${v.id} — ${v.impact}</h3>
              <p>${v.description}</p>
              <p><b>Fix:</b> ${v.recommendedFix} ${v.docs ? `<a class="doc" href="${v.docs}" target="_blank">Read more</a>` : ''}</p>
              <details><summary>Nodes (${v.nodes.length})</summary>
                <pre>${JSON.stringify(v.nodes, null, 2)}</pre>
              </details>
            </div>
          `).join('')}
        </div>

        <hr/>
        <h3>Screenshot</h3>
        ${fs.existsSync(screenshotPath) ? `<img src="${screenshotFileName}" alt="screenshot of ${url}" />` : '<p>No screenshot available</p>'}

        <hr/>
        <p style="font-size:0.9em;color:#555">Automated checks cover only a subset of WCAG success criteria. Manual review is required for full conformance. See <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">W3C WCAG</a>.</p>
      </body>
      </html>
      `;
      fs.writeFileSync(htmlReportPath, html);
    } catch (err) {
      console.error(`[scan:${scanId || id}] Failed to write HTML report:`, err.message || err);
    }

    console.log(`[scan:${scanId || id}] runScan completed. score=${score}, totalViolations=${summary.total}`);

    return {
      results: axeResults,
      summary,
      violationsWithFixes,
      jsonReportPath,
      htmlReportPath,
      jsonReportFileName,
      htmlReportFileName,
      screenshotFileName
    };
  } catch (err) {
    console.error(`[scan:${scanId || id}] runScan ERROR:`, err.message || err);
    // Re-throw so calling controller can mark scan failed and persist error
    throw err;
  } finally {
    if (browser) {
      try {
        console.log(`[scan:${scanId || id}] Closing browser...`);
        await browser.close();
      } catch (closeErr) {
        console.warn(`[scan:${scanId || id}] browser.close failed:`, closeErr.message || closeErr);
      }
    }
  }
}
