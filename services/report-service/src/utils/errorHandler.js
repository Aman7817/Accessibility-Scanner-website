export class  AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indicates if the error is operational or programming error
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Express error-handling middleware.
 * Sends JSON error responses with `success: false` and a message.
 */

export function errorHandler(err, req, res, next) {
    // Log the error details for debugging
    console.error('Error occurred:', {
        message: err.message,
        statusCode: err.statusCode || 500,
        stack: err.stack
    });

    // Set default status code if not provided
    const statusCode = err.statusCode || 500;

    // Send JSON response with error details
    res.status(statusCode).json({
        success: false,
        message: err.message || 'An unexpected error occurred.'
    });
}