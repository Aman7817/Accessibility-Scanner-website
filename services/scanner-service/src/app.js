import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimiter } from './middlewares/rateLimiter.js';
import scanRoutes from './routes/scan.routes.js';

const app = express();

// ✅ 1. Parse incoming JSON first
app.use(express.json());

// ✅ 2. Security & Logging
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// ✅ 3. Rate Limiter (safe here)
app.use(rateLimiter);

// ✅ 4. Main Routes
app.use('/api/v1', scanRoutes);

// Optional: error handler
// app.use(errorHandler);

export { app };
