import { Router } from "express";
import { scanControler } from "../controllres/scan.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { validateURL } from "../middlewares/validateUrl.middleware.js";

const router = Router();

// POST /api/scan
router.route("/scan")
    .post(rateLimiter, validateURL, scanControler);

// Export the router
export default router;