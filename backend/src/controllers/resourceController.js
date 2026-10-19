import supabase from "../config/supabase.js";

/* -------------------------------- */
/* GET ALL RESOURCES                */
/* -------------------------------- */

export const getResources = async (req, res) => {
  try {
    const { type, status, search } = req.query;

    let query = supabase
      .from("resources")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (type) {
      query = query.eq("type", type);
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,resource_code.ilike.%${search}%,location_name.ilike.%${search}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Resource fetch error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch resources",
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
/* GET RESOURCE BY ID               */
/* -------------------------------- */

export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
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
/* CREATE RESOURCE                  */
/* -------------------------------- */

export const createResource = async (req, res) => {
  try {
    const {
      name,
      type,
      status,
      capacity,
      location_name,
      latitude,
      longitude,
      contact_number,
    } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "name and type are required",
      });
    }

    const resourceCode = `RES-${Date.now()
      .toString()
      .slice(-6)}`;

    const { data, error } = await supabase
      .from("resources")
      .insert({
        resource_code: resourceCode,
        name,
        type,
        status: status || "Available",
        capacity: capacity ?? null,
        location_name: location_name || null,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        contact_number: contact_number || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Resource creation error:", error);

      return res.status(400).json({
        success: false,
        message: "Failed to create resource",
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
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
/* UPDATE RESOURCE                  */
/* -------------------------------- */

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "name",
      "type",
      "status",
      "capacity",
      "location_name",
      "latitude",
      "longitude",
      "contact_number",
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
        message: "No valid fields provided",
      });
    }

    const { data, error } = await supabase
      .from("resources")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
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
/* DELETE RESOURCE                  */
/* -------------------------------- */

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("resources")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
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