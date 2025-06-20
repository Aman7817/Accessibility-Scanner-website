const puppeteerConfig = {
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sendbox'],
    // ... other config options ...

}

export {
    puppeteerConfig
}
