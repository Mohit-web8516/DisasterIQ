import supabase from "../config/supabase.js";

/* -------------------------------- */
/* GET ALL INCIDENTS                */
/* -------------------------------- */

export const getIncidents = async (req, res) => {
  try {
    const {
      severity,
      status,
      type,
      search,
    } = req.query;

    let query = supabase
      .from("incidents")
      .select(`
        *,
        rescue_teams (
          id,
          team_code,
          team_name,
          status
        )
      `)
      .order("reported_at", {
        ascending: false,
      });

    if (severity) {
      query = query.eq("severity", severity);
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (type) {
      query = query.eq("type", type);
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,location_name.ilike.%${search}%,incident_code.ilike.%${search}%`,
      );
    }

    const {
      data,
      error,
    } = await query;

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch incidents",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* -------------------------------- */
/* GET INCIDENT BY ID               */
/* -------------------------------- */

export const getIncidentById = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const {
      data,
      error,
    } = await supabase
      .from("incidents")
      .select(`
        *,
        rescue_teams (
          id,
          team_code,
          team_name,
          members_count,
          specialization,
          status,
          current_location,
          contact_number
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* -------------------------------- */
/* CREATE INCIDENT                  */
/* -------------------------------- */

export const createIncident = async (
  req,
  res,
) => {
  try {
    const {
      title,
      type,
      description,
      severity,
      status,
      location_name,
      latitude,
      longitude,
      affected_people,
      assigned_team_id,
      source,
    } = req.body;

    if (
      !title ||
      !type ||
      !severity ||
      !location_name
    ) {
      return res.status(400).json({
        success: false,
        message:
          "title, type, severity and location_name are required",
      });
    }

    const incidentCode = `INC-${Date.now()
      .toString()
      .slice(-6)}`;

    const {
      data,
      error,
    } = await supabase
      .from("incidents")
      .insert({
        incident_code: incidentCode,
        title,
        type,
        description: description || null,
        severity,
        status: status || "Monitoring",
        location_name,
        latitude: latitude || null,
        longitude: longitude || null,
        affected_people:
          affected_people || 0,
        assigned_team_id:
          assigned_team_id || null,
        source: source || "manual",
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return res.status(400).json({
        success: false,
        message: "Failed to create incident",
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* -------------------------------- */
/* UPDATE INCIDENT                  */
/* -------------------------------- */

export const updateIncident = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "title",
      "type",
      "description",
      "severity",
      "status",
      "location_name",
      "latitude",
      "longitude",
      "affected_people",
      "assigned_team_id",
      "source",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      Object.keys(updates).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided",
      });
    }

    if (
      updates.status === "Resolved"
    ) {
      updates.resolved_at =
        new Date().toISOString();
    }

    const {
      data,
      error,
    } = await supabase
      .from("incidents")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident updated successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* -------------------------------- */
/* DELETE INCIDENT                  */
/* -------------------------------- */

export const deleteIncident = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const {
      data,
      error,
    } = await supabase
      .from("incidents")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident deleted successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};