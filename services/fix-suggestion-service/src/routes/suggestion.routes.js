import Router from 'express';

import {generateFixSuggestions} from '../controllers/suggestion.controller.js'; 

const router = Router();

// Route to generate fix suggestions

router.post('/suggest', generateFixSuggestions);

// POST /api/v1/fix-suggestions/suggest

export default router;