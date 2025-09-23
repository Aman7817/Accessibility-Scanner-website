import express from 'express';
import { Router } from 'express';

import {generateFixSuggestions} from '../controllers/suggestion.controller.js'; 

const router = Router();


// Route to generate fix suggestions

router.get('/suggest', generateFixSuggestions);

// POST /api/v1/fix-suggestions/suggest

export default router;