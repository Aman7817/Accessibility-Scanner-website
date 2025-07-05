import { generateSuggestions } from "../services/suggestion.service.js";

import { AppError } from "../utils/errorHandler.js";

export const generateFixSuggestions = async (req, res, next) => {
    try {
        const { violations } = req.body;

        if(!violations || !Array.isArray(violations)) {
            throw new AppError(400, "Invalid input format. 'violations' should be an array.");
        }

        const suggestions = await generateSuggestions(violations);
        res.status(200).json({ suggestions });
    
        
    } catch (err) {
        next(err);
    }
}