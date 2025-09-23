import express from 'express';
import 'dotenv/config';
import fixSuggestionRoutes from './routes/suggestion.routes.js';
import { errorHandler } from '../../report-service/src/utils/errorHandler.js';

const app = express();

app.use(express.json());

// ✅ Mount under /api/v1/fix-suggestions
app.use('/api/v1', fixSuggestionRoutes);

app.use(errorHandler);

export default app;
