import express from 'express';
import { generateReport,generateCsvReport } from '../controllers/reportControllers.js';

const router = express.Router();


// This route handles: GET /api/v1/report?format=pdf or format=csv
router.get('/', (req, res) => {
  const { format } = req.query;

  if (format === 'pdf') {
    return generateReport(req, res);
  }

  if (format === 'csv') {
    return generateCsvReport(req, res);
  }

  return res.status(400).json({ message: 'Invalid format specified' });
});




// router.post('/pdf', generateReport); // POST /api/v1/reports/generate
// router.post('/csv', generateCsvReport); // POST /api/v1/reports/generate/csv

// Add more report-related routes as needed
export default router;
// This file defines the routes for the report service.