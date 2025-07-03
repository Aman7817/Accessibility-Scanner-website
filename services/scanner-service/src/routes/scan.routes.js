import { Router } from "express";
import { scanControler } from "../controllres/scan.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateScanRequest } from "../middlewares/scanValidator.js";

const router = Router();

// POST /api/scan
router.route("/scan")
    .post(rateLimiter, validateScanRequest, scanControler);