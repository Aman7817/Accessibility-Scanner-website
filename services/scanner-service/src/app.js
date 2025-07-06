import express from "express";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();
app.use(express.json);
app.use(rateLimiter);


import  scanRoutes  from "./routes/scan.routes.js";
app.use("/api/v1/scan", scanRoutes);

export {
    app
}