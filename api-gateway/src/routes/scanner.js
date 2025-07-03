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

export default router;
