import {scanservice} from "../services/scan.service.js";
import  {isValidUrl} from "../utils/urlValidator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const scanController = asyncHandler(async(req, res) => {

    // Extract URL from request body
    console.log("Received request body:", req.body);


    const {url} = req.body;
    
    
    // Validate URL presence and format
    if(!url) {
        throw new ApiError('Missing required parameter: url', 400);
    }
    
    if(!isValidUrl(url)) {
        throw new ApiError('Invalid URL format', 400);
    }

    // Attempt accessibility scan
    const result = await scanservice(url);
    
    // Return standardized success response
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                summary: result.summary,
                violations: result.violations
            },
            "Accessibility scan completed successfully"
        )
    );
});

export { scanController };