
import supabase from "../config/supabase.js";

// GET /api/alerts
export const getAlerts = async (req, res) => {
  try {
    const { status, severity, search } = req.query;

    let query = supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (severity) query = query.eq("severity", severity);
    if (search) query = query.ilike("title", `%${search}%`);

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch alerts",
      error: error.message,
    });
  }
};

// GET /api/alerts/:id
export const getAlertById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch alert",
      error: error.message,
    });
  }
};

// POST /api/alerts
export const createAlert = async (req, res) => {
  try {
    const { title, message, severity, location_name, incident_id } = req.body;

    if (!title || !message || !severity) {
      return res.status(400).json({
        success: false,
        message: "title, message, and severity are required",
      });
    }

    const alertCode = `ALT-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from("alerts")
      .insert([{
        alert_code: alertCode,
        title,
        message,
        severity,
        location_name: location_name || null,
        incident_id: incident_id || null,
        status: "Active",
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create alert",
      error: error.message,
    });
  }
};

// PATCH /api/alerts/:id
export const updateAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = ["title", "message", "severity", "location_name", "status"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const { data, error } = await supabase
      .from("alerts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update alert",
      error: error.message,
    });
  }
};
