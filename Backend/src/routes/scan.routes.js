import express from 'express';
import { scanController } from '../controllers/scan.controller.js';

import { Router } from 'express';

const router = Router();

router.post('/start-scan', scanController.startScan);
router.get('/reports/:id', scanController.getReport); 
router.get('/reports', scanController.listReports);

export default router;