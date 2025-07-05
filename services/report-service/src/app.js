import express from 'express';
import 'dotenv/config';
import { errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('api/v1/reports',reportRoutes); // Mount report routes

app.use(errorHandler); // Global error handler

export default app;