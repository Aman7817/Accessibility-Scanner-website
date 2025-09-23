import express from 'express';
import path from 'path';
import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';

const router = express.Router();

const REPORT_DIR = process.env.REPORT_DIR || path.join(process.cwd(), 'reports');

// Get report by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if it's a file request
    if (id.includes('.') && !id.includes('..')) {
      const filePath = path.join(REPORT_DIR, id);
      
      if (fs.existsSync(filePath)) {
        // Set appropriate content type
        if (id.endsWith('.png')) {
          res.setHeader('Content-Type', 'image/png');
        } else if (id.endsWith('.json')) {
          res.setHeader('Content-Type', 'application/json');
        } else {
          res.setHeader('Content-Type', 'text/html');
        }
        
        return res.sendFile(filePath);
      }
    }
    
    return next(new ApiError(404, 'Report not found'));
    
  } catch (error) {
    next(new ApiError(500, `Error serving file: ${error.message}`));
  }
});

// List available reports
router.get('/', async (req, res, next) => {
  try {
    if (fs.existsSync(REPORT_DIR)) {
      const files = fs.readdirSync(REPORT_DIR);
      const reportFiles = files.filter(file => 
        file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.png')
      );
      
      res.json({
        success: true,
        data: reportFiles,
        count: reportFiles.length
      });
    } else {
      res.json({
        success: true,
        data: [],
        count: 0,
        message: 'No reports directory found'
      });
    }
  } catch (error) {
    next(new ApiError(500, `Error listing reports: ${error.message}`));
  }
});

export default router;