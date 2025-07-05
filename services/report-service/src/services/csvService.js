import {Parser} from "json2csv";


/**
 * Converts the violations array to CSV format and returns it as a string.
 */

export function createCsvString(violations) {
    if (!violations || violations.length === 0) {
        return "No violations found.";
    }
    
    const fields = Object.keys(violations[0]);
    const opts = { fields };
    const parser = new Parser(opts);
    
    try {
        const csv = parser.parse(violations);
        return csv;
    } catch (err) {
        console.error("Error parsing violations to CSV:", err);
        throw new Error("Failed to generate CSV report.");
    }
}
