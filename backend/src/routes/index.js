import ingestionRoutes from "./ingestionRoutes.js";
import express from "express";

import healthRoutes from "./healthRoutes.js";
import databaseRoutes from "./databaseRoutes.js";
import incidentRoutes from "./incidentRoutes.js";
import resourceRoutes from "./resourceRoutes.js";
import reportRoutes from "./reportRoutes.js";
import alertRoutes from "./alertRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";

const router = express.Router();
router.use("/ingestion", ingestionRoutes);
router.use("/health", healthRoutes);
router.use("/database", databaseRoutes);
router.use("/incidents", incidentRoutes);
router.use("/resources", resourceRoutes);
router.use("/reports", reportRoutes);
router.use("/alerts", alertRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;