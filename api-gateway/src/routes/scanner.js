import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

// proxy to the scanner service
router.use(
    "/scan",
    createProxyMiddleware({
        target: process.env.SCANNER_SERVICE_URL,
        changeOrigin: true,
         // Optional: rewrite path if the scanner-service expects a different base path
        // pathRewrite: { '^/api/v1/scan': '' }, 

    })
);
router.use(

    "/suggest", 
    createProxyMiddleware({
        target: process.env.FIX_SUGGESTION_SERVICE_URL,
        changeOrigin: true,
        // Optional: rewrite path if the fix-suggestion-service expects a different base path
        // pathRewrite: { '^/api/v1/fix-suggestions/suggest': '' },
    })
);

// proxy to the report service
router.use(
    "/reports",
    createProxyMiddleware({
        target: process.env.REPORT_SERVICE_URL,
        changeOrigin: true,
        // Optional: rewrite path if the report-service expects a different base path
        // pathRewrite: { '^/api/v1/reports': '' },
    })
);

export default router;
