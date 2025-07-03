// Utility functions for the API Gateway can be added here.

export const formatResponse = (data, status = 200) => {
    return {
        status,
        data,
    };
}