import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({
        success: false,
        message: "Supabase is not configured",
      });
    }

    const { data, error } = await supabase
      .from("incidents")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);

      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Supabase connection successful",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database test failed",
    });
  }
});

export default router;