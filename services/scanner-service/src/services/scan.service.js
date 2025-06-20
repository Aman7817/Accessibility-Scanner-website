import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { puppeteerConfig } from "../config/puppeteer.config.js";
import axe from "axe-core";

const scanservice = asyncHandler(async(url) => {
    let browser;

    try {
        browser = await puppeteer.launch(puppeteerConfig);
        const page = await browser.newPage();
        await page.setViewport({width:1280,height: 800});
        await page.setBypassCSP(true); // Disable Content Security Policy as needed:contentReference[oaicite:4]{index=4}

        await page.goto(url, { waitUntil: 'networkidle2' });   
         // Inject axe-core into the page 
        await page.evaluate(axe.source);
        // Run axe-core on the page
        const axeResults = await page.evaluate(async() => await axe.run());

        // Prepaper summary counts
        const {violations,passes,incomplete,inapplicable} = axeResults;
        const summary = {
            totalViolations: violations.length,
            totalPasses: passes.length,
            totalIncomplete: incomplete.length,
            totalInapplicable: inapplicable.length
        };
        return {summary,violations}
    } catch (error) {
        throw new ApiError("Accessibility scan failed", 500);
    } finally {
        if (browser) {  
            await browser.close();
            }
        }
});

export {
    scanservice
}

/*
✅ Final Verdict:
code kaam ye karega:

Kisi bhi URL pe jaake page load karega.

Axe-core se run karke accessibility violations dhoondega.

Summary aur detailed violations return karega.
 */