// 404 Not Found handler

export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Not Found',
    });
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message,
    });
};