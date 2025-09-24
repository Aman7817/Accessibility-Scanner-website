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
    const launchArgs = [
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-dev-shm-usage'
    ];
    
    if (process.env.PUP_NO_SANDBOX === 'true' || process.env.PUP_NO_SANDBOX === '1') {
      launchArgs.push('--no-sandbox', '--disable-setuid-sandbox');
    }
    
    const launchOptions = {
      headless: true,
      args: launchArgs,
      ignoreHTTPSErrors: true
    };
    
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
    
    // Set a longer default timeout
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the page
    console.log(`[scan:${scanId || id}] Navigating to URL...`);
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle0', 
        timeout: 60000 
      });
    } catch (err) {
      console.warn(`[scan:${scanId || id}] page.goto warning: ${err.message || err}`);
      // Try with a different wait strategy
      try {
        await page.goto(url, { 
          waitUntil: 'domcontentloaded', 
          timeout: 60000 
        });
      } catch (err2) {
        throw new Error(`Navigation to ${url} failed: ${err2.message}`);
      }
    }

    // FIXED: Simple and reliable axe-core injection
    console.log(`[scan:${scanId || id}] Injecting axe-core...`);
    try {
      // Method 1: Direct evaluation (most reliable)
      await page.evaluate(axeSource => {
        // Create a script element and inject axe-core
        const script = document.createElement('script');
        script.textContent = axeSource;
        document.head.appendChild(script);
      }, axeCore.source);

      // Wait for axe to be available with multiple checks
      let axeAvailable = false;
      for (let i = 0; i < 10; i++) {
        axeAvailable = await page.evaluate(() => {
          return typeof window.axe !== 'undefined' && 
                 typeof window.axe.run === 'function' &&
                 typeof window.axe.configure === 'function';
        });
        
        if (axeAvailable) break;
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (!axeAvailable) {
        throw new Error('axe-core not loaded after multiple attempts');
      }

      console.log(`[scan:${scanId || id}] axe-core injected successfully`);
    } catch (err) {
      console.error(`[scan:${scanId || id}] axe injection failed:`, err.message || err);
      throw new Error(`Failed to inject accessibility engine: ${err.message}`);
    }

    // Run axe with simpler configuration
    console.log(`[scan:${scanId || id}] Running axe.run on the page...`);
    let axeResults = null;
    try {
      axeResults = await page.evaluate(async () => {
        if (typeof axe === 'undefined' || !axe.run) {
          throw new Error('axe core not available');
        }
        
        // Simple configuration that works reliably
        return await axe.run(document, {
          runOnly: {
            type: 'tags',
            values: ['wcag2a', 'wcag2aa', 'best-practice']
          }
        });
      });
      
      console.log(`[scan:${scanId || id}] axe.run completed successfully. Found ${axeResults.violations.length} violations.`);
    } catch (err) {
      console.error(`[scan:${scanId || id}] axe.run failed:`, err.message || err);
      throw new Error(`Accessibility analysis failed: ${err.message}`);
    }

    // Take screenshot
    console.log(`[scan:${scanId || id}] Taking screenshot...`);
    try {
      await page.screenshot({ path: screenshotPath, fullPage: false });
    } catch (err) {
      console.warn(`[scan:${scanId || id}] Screenshot capture failed:`, err.message || err);
    }

    // Compute score and prepare violations with fixes
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

    // Write JSON report
    console.log(`[scan:${scanId || id}] Writing JSON report to ${jsonReportPath}...`);
    try {
      fs.writeFileSync(jsonReportPath, JSON.stringify(outJson, null, 2));
    } catch (err) {
      console.error(`[scan:${scanId || id}] Failed to write JSON report:`, err.message || err);
    }

    // Build HTML report
    console.log(`[scan:${scanId || id}] Building HTML report at ${htmlReportPath}...`);
    try {
      const gradeMsg = score >= 85 ? `<span style="color:green">A</span>` : 
                       score >= 70 ? `<span style="color:orange">B</span>` : 
                       `<span style="color:red">RISK</span>`;
      
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
          ${violationsWithFixes.length > 0 ? violationsWithFixes.map(v => `
            <div class="violation">
              <h3>${v.id} — ${v.impact}</h3>
              <p>${v.description}</p>
              <p><b>Fix:</b> ${v.recommendedFix} ${v.docs ? `<a class="doc" href="${v.docs}" target="_blank">Read more</a>` : ''}</p>
              <details><summary>Nodes (${v.nodes.length})</summary>
                <pre>${JSON.stringify(v.nodes, null, 2)}</pre>
              </details>
            </div>
          `).join('') : '<p>No violations found! 🎉</p>'}
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