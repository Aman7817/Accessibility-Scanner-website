import {scanservice} from "../services/scan.service.js";
import  {isValidUrl} from "../utils/urlValidator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// Controller for POST /api/scan

const scanControler = asyncHandler(async(req,res,next) => {
    try {
        const {url} = req.body;
        if(!url) {
            throw new ApiError('Missing required parameter: url', 400);
        }
        if(!isValidUrl(url)) {
            throw new ApiError('Invalid URL', 400);
        }
        const result  = await scanservice(url);

        res.status(200).json(
            new ApiResponse({summary: result.summary,violations: result.violations})
        )
        
    } catch (error) {
        next(error);
    }
})

export {
    scanControler
}