import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import {ApiError} from '../utils/ApiError.js';


export async function scanservice(url) {
  let browser;
  try {
    console.log('1) Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 30000,
    });
    console.log('2) Browser launched.');

    const page = await browser.newPage();
    console.log('3) New page.');

    console.log('4) Navigating to:', url);

    // ⏱ Add Promise.race timeout here
    const scanPromise = (async () => {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 15000, // wait 15s max for page load
      });
      console.log('5) Page loaded.');

      console.log('6) Running axe-puppeteer scan...');
      const results = await new AxePuppeteer(page).include('body').analyze();
      console.log('7) axe-puppeteer scan complete.');

      const { violations, passes, incomplete, inapplicable } = results;
      const summary = {
        totalViolations: violations.length,
        totalPasses: passes.length,
        totalIncomplete: incomplete.length,
        totalInapplicable: inapplicable.length,
      };

      return { summary, violations };
    })();

    // Timeout fallback: 20s max for whole scan
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Scan timed out')), 20000)
    );

    // Use whichever completes first
    return await Promise.race([scanPromise, timeoutPromise]);
  } catch (err) {
    console.error('❌ scanservice error:', err.message);
    throw new ApiError(err.message || 'Accessibility scan failed', 500);
  } finally {
    if (browser) {
      console.log('Closing browser');
      await browser.close();
    }
  }
}
