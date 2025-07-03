import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import scannerRoutes from "./routes/scanner.js";

import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();

// security ans performance middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// API routes
// Mount the scanner-service proxy on /api/v1/scan
// scannerRoutes will handle paths starting with /api/v1

app.use('/api/v1', scannerRoutes);  
// 404 Not Found handler

app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;