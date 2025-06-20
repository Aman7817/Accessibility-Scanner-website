const isValidUrl = (String) => {
    try {
        const url = new URL(String);
        return url.protocol === "http:" || url.protocol === "https:" && url.host !== "";        
    } catch (_) {
        return false;
    }
}

export { isValidUrl };