import express from 'express';
import { scanController } from '../controllers/scan.controller.js';

import { Router } from 'express';

const router = Router();

router.post('/start-scan', scanController.startScan);
router.get('/', scanController.listScans);
// router.get('/stats', scanController.getStats);
// router.get('/schduled', scanController.getScheduledScans);
// router.get('/export', scanController.exportScans);
 router.get('/:id', scanController.getScan);

// report related routes
router.get('/reports/:id', scanController.getReport); 
router.get('/reports/:id/download', scanController.downloadReport);
router.get('/reports', scanController.listReports);
// delete scan route
router.delete('/:id', scanController.deleteScan);

export default router;