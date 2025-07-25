import express from 'express';
import 'dotenv/config';
import fixSuggestionRoutes from './routes/suggestion.routes.js';
import { errorHandler } from '../../report-service/src/utils/errorHandler.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api/v1/fix-suggestions', fixSuggestionRoutes); // Mount fix suggestion routes

app.use (errorHandler); // Global error handler

export default app;