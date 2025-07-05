import { createPdfStream } from "../services/pdfService.js";
import { createCsvString } from "../services/csvService.js";
import { AppError } from "../utils/errorHandler.js";


const generateReport = async(req, res,next) => {
    try {
        // Extract summary and violations from the request body
        const { summary, violations } = req.body;

        // Validate input data
        if (!summary || !violations ) {
            return next(new AppError("Invalid input data", 400));
        }

        // Generate PDF report
        const pdfStream = createPdfStream(summary, violations);

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="accessibility-report.pdf"');

        // Pipe the PDF stream to the response
        pdfStream.pipe(res);
        pdfDoc.end();
        
    } catch (error) {
        // Handle any errors that occur during report generation
        next(new AppError("Failed to generate report", 500));
        
    }

};

/**
 * Handler to generate a CSV from Axe-core JSON.
 * Expects { summary, violations } in the request body.
 * Returns a CSV file as the response.
 */

const generateCsvReport = async (req, res, next) => {
    try {
        const { summary, violations } = req.body;
        // Validate input data
        if (!summary || !violations) {
            return next(new AppError("Invalid input data", 400));
        }
        // Create CSV string from violations
        const csvString = createCsvString(violations);
        // Set response headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="accessibility-report.csv"');
        // Send the CSV string as the response
        res.status(200).send(csvString);

    } catch (error) {
        next(new AppError("Failed to generate CSV report", 500));
    }
}

// Export the generateReport function for use in routes
export { 
    generateReport,
    generateCsvReport
};