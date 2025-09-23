import express from 'express';
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router(); // ✅ Use express.Router() directly

// Parse JSON body
router.use(express.json({ limit: '2mb' }));

// Proxy to Scanner Service
router.use(
  '/scan',
  createProxyMiddleware({
    target: process.env.SCANNER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/scan': '/api/v1/scan',
    },
    selfHandleResponse: false,
    onProxyReq: (proxyReq, req, res) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onError(err, req, res) {
      console.error('Proxy error:', err.message);
      res.status(502).json({ error: 'Scanner service unreachable' });
    },
  })
);



console.log('Forwarding to:', process.env.SCANNER_SERVICE_URL);

// proxy to the fix suggestion service
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
    "/report",
    createProxyMiddleware({
        target: process.env.REPORT_SERVICE_URL,
        changeOrigin: true,
        // Optional: rewrite path if the report-service expects a different base path
        // pathRewrite: { '^/api/v1/reports': '' },
    })
);

export default router;
