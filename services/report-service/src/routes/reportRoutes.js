import express from 'express';
import { generateReport,generateCsvReport } from '../controllers/reportControllers.js';

const router = express.Router();

router.post('/pdf', generateReport); // POST /api/v1/reports/generate
router.post('/csv', generateCsvReport); // POST /api/v1/reports/generate/csv

// Add more report-related routes as needed
export default router;
// This file defines the routes for the report service.