import supabase from "../config/supabase.js";

const generateReportCode = () => {
  return `RPT-${Date.now().toString().slice(-6)}`;
};

// GET /api/reports
export const getReports = async (req, res) => {
  try {
    const { status, type, severity, search } = req.query;

    let query = supabase
      .from("emergency_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (type) {
      query = query.eq("type", type);
    }

    if (severity) {
      query = query.eq("severity", severity);
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,location_name.ilike.%${search}%,report_code.ilike.%${search}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Get reports error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch emergency reports",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Get reports error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency reports",
    });
  }
};

// GET /api/reports/:id
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("emergency_reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Emergency report not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency report",
    });
  }
};

// POST /api/reports
export const createReport = async (req, res) => {
  try {
    const {
      title,
      type,
      severity,
      location_name,
      latitude,
      longitude,
      affected_people,
      description,
      reporter_name,
      contact,
    } = req.body;

    if (!title || !type || !severity || !location_name || !description) {
      return res.status(400).json({
        success: false,
        message:
          "title, type, severity, location_name and description are required",
      });
    }

    if (
      affected_people !== undefined &&
      affected_people !== null &&
      Number(affected_people) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "affected_people cannot be negative",
      });
    }

    const report = {
      report_code: generateReportCode(),
      title,
      type,
      severity,
      location_name,
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      affected_people: affected_people ?? 0,
      description,
      reporter_name: reporter_name || null,
      contact: contact || null,
      status: "Pending",
    };

    const { data, error } = await supabase
      .from("emergency_reports")
      .insert(report)
      .select()
      .single();

    if (error) {
      console.error("Create report error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to create emergency report",
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Emergency report submitted successfully",
      data,
    });
  } catch (error) {
    console.error("Create report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create emergency report",
    });
  }
};

// PATCH /api/reports/:id
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "title",
      "type",
      "severity",
      "location_name",
      "latitude",
      "longitude",
      "affected_people",
      "description",
      "reporter_name",
      "contact",
      "status",
    ];

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
      .from("emergency_reports")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Emergency report not found or update failed",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency report updated successfully",
      data,
    });
  } catch (error) {
    console.error("Update report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update emergency report",
    });
  }
};