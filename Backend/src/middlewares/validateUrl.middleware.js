// src/middlewares/validateUrl.middleware.js

import { ApiResponse } from "../utils/ApiResponse.js";

const validateUrl = (req, res, next) => {
    const { url } = req.body;
    
    // Basic URL validation using a regex
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,})((\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?)$/i;

    if (!url || !urlPattern.test(url)) {
        return next(new ApiResponse(400, 'Invalid URL format'));
    }

    next();
};

export default validateUrl;
