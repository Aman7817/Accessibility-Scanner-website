// suggestion.service.js
import { violationMap } from "../utils/violationMap.js";

export async function generateSuggestions(violations) {
    try {
        if (!Array.isArray(violations)) {
            throw new Error("Invalid input: violations must be an array.");
        }

        const suggestions = violations.map(violation => {
            const id = typeof violation === 'string' ? violation : violation.id;

            const mapped = violationMap[id];

            if (typeof mapped === 'function') {
                return {
                    violation: id,
                    suggestion: mapped(violation)
                };
            } else if (typeof mapped === 'string') {
                return {
                    violation: id,
                    suggestion: mapped
                };
            } else {
                return {
                    violation: id,
                    suggestion: "No suggestion available"
                };
            }
        });

        return suggestions;
    } catch (error) {
        console.error("Error generating suggestions:", error);
        throw error;
    }
}
