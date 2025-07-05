import { violationMap } from "../utils/violationMap";
// import { openaiSuggest } from '../config/openai.config.js'; // optional


export async function generateSuggestions(req, res) {
    try {
        const { violations } = req.body;

        if (!violations || !Array.isArray(violations)) {
            return res.status(400).json({ error: "Invalid input format. 'violations' should be an array." });
        }

        const suggestions = violations.map(violation => {
            const suggestion = violationMap[violation];
            return suggestion ? { violation, suggestion } : { violation, suggestion: "No suggestion available" };
        });

        // Optionally, you can integrate OpenAI for more advanced suggestions
        // const openaiSuggestions = await openaiSuggest(violations);

        return res.status(200).json({ suggestions });
    } catch (error) {
        console.error("Error generating suggestions:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}