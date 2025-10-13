import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORT_DIR = process.env.REPORT_DIR || path.join(process.cwd(), 'reports');

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', // dev frontend
    'https://accessibility-scanner-website-qg5h.vercel.app' // live frontend
  ],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static('public'));
app.use('/reports', express.static(REPORT_DIR));
app.use(cookieParser());

// Routes import 
import userRouter from './routes/user.routes.js';
import scanRouter from './routes/scan.routes.js';
import reportRouter from './routes/report.routes.js';

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/scan", scanRouter);
app.use("/api/v1/reports", reportRouter);


// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export { app };