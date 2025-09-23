// config/puppeteer.config.js
const puppeteerConfig = {
  headless: "new", // Use new Headless mode
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-infobars',
    '--window-size=1920,1080',
    '--js-flags=--max-old-space-size=4096', // Memory management
    '--single-process', // For resource-constrained environments
  ],
  timeout: 60000,
  ignoreHTTPSErrors: true, // Handle HTTPS warnings
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // For Docker compatibility
};

export { puppeteerConfig };