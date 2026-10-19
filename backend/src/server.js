import express from "express";
import cors from "cors";

import env from "./config/env.js";
import apiRoutes from "./routes/index.js";

const app = express();

/* ----------------------------- */
/* Middleware                    */
/* ----------------------------- */

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------------------------- */
/* Basic route                   */
/* ----------------------------- */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DisasterIQ API is running",
  });
});

/* ----------------------------- */
/* API routes                    */
/* ----------------------------- */

app.use("/api", apiRoutes);

/* ----------------------------- */
/* 404 handler                   */
/* ----------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* ----------------------------- */
/* Error handler                 */
/* ----------------------------- */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

/* ----------------------------- */
/* Start server                  */
/* ----------------------------- */

app.listen(env.port, () => {
  console.log("");
  console.log("======================================");
  console.log("       DISASTERIQ BACKEND");
  console.log("======================================");
  console.log(`Server: http://localhost:${env.port}`);
  console.log(`API:    http://localhost:${env.port}/api`);
  console.log(`Health: http://localhost:${env.port}/api/health`);
  console.log("======================================");
  console.log("");
});