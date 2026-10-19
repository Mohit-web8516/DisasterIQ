import express from "express";

import {
  getReports,
  getReportById,
  createReport,
  updateReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.patch("/:id", updateReport);

export default router;