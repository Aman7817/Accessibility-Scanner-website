import express from "express";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();
app.use(express.json);
app.use(rateLimiter);

export {
    app
}