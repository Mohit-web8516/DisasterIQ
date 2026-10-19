import express from "express";
import { ingestWeatherData } from "../controllers/ingestionController.js";

const router = express.Router();

router.post("/weather", ingestWeatherData);

export default router;