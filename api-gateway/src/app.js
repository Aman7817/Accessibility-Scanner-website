import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
// Import routes

import scannerRoutes from "./routes/scanner.js";

import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();



// security ans performance middlewares
app.use(helmet());

// backend/app.js
const corsOptions = {
  origin: 'http://localhost:5173', // Your Vite frontend URL  
  credentials: true, // Allow cookies to be sent
  methods: ['POST', 'GET','DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};
app.use(cors(corsOptions));


app.use(morgan('tiny'));

 app.use(express.json({ limit: '2mb' })); // ⬅️ Add this instead of default


// API routes
// Mount the scanner-service proxy on /api/v1/scan
// scannerRoutes will handle paths starting with /api/v1

app.use('/api/v1', scannerRoutes);
// Mount other services if needed
// app.use('/api/v1/fix-suggestions', fixSuggestionRoutes);
// app.use('/api/v1/reports', reportRoutes);

// 404 Not Found handler

app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export { 
    app
};