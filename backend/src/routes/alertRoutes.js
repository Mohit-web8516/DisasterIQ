import express from "express";
import {
  getAlerts,
  getAlertById,
  createAlert,
  updateAlert,
} from "../controllers/alertController.js";

const router = express.Router();

router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.post("/", createAlert);
router.patch("/:id", updateAlert);

export default router;