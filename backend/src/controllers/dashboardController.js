
import supabase from "../config/supabase.js";

// GET /api/dashboard
export const getDashboard = async (req, res) => {
  try {
    const [
      incidentsResult,
      resourcesResult,
      alertsResult,
      risksResult,
      reportsResult,
    ] = await Promise.all([
      // Fetch incidents
      supabase
        .from("incidents")
        .select("*")
        .order("reported_at", { ascending: false }),

      // Fetch resources
      supabase
        .from("resources")
        .select("*"),

      // Fetch active alerts
      supabase
        .from("alerts")
        .select("*")
        .eq("status", "Active")
        .order("created_at", { ascending: false }),

      // Fetch recent risk assessments
      supabase
        .from("risk_assessments")
        .select("*")
        .order("assessed_at", { ascending: false }),

      // Fetch pending reports
      supabase
        .from("emergency_reports")
        .select("id", { count: "exact", head: true })
        .eq("status", "Pending"),
    ]);

    const results = [
      incidentsResult,
      resourcesResult,
      alertsResult,
      risksResult,
      reportsResult,
    ];

    const failed = results.find((result) => result.error);

    if (failed) {
      console.error("Dashboard query error:", failed.error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard data",
        error: failed.error.message,
      });
    }

    const incidents = incidentsResult.data || [];
    const resources = resourcesResult.data || [];
    const alerts = alertsResult.data || [];
    const allRisks = risksResult.data || [];

    // Incident statistics
    const criticalIncidents = incidents.filter(
      (incident) =>
        incident.severity === "Critical" &&
        incident.status !== "Resolved",
    ).length;

    const activeIncidents = incidents.filter(
      (incident) => incident.status !== "Resolved",
    ).length;

    const resolvedIncidents = incidents.filter(
      (incident) => incident.status === "Resolved",
    ).length;

    // Resource statistics
    const resourceSummary = {};

    resources.forEach((resource) => {
      const type = resource.type;

      if (!resourceSummary[type]) {
        resourceSummary[type] = {
          total: 0,
          available: 0,
          deployed: 0,
          busy: 0,
          maintenance: 0,
          unavailable: 0,
        };
      }

      const summary = resourceSummary[type];
      summary.total += 1;

      const status = resource.status.toLowerCase();

      if (status === "available") summary.available += 1;
      if (status === "deployed") summary.deployed += 1;
      if (status === "busy") summary.busy += 1;
      if (status === "maintenance") summary.maintenance += 1;
      if (status === "unavailable") summary.unavailable += 1;
    });

    const totalResources = resources.length;
    const availableResources = resources.filter(
      (resource) => resource.status === "Available",
    ).length;

    // Use the latest assessment per area
    const latestRiskByArea = new Map();

    for (const risk of allRisks) {
      const key = risk.area_name;

      if (!latestRiskByArea.has(key)) {
        latestRiskByArea.set(key, risk);
      }
    }

    const riskOverview = Array.from(latestRiskByArea.values())
      .sort((a, b) => b.risk_score - a.risk_score)
      .slice(0, 5)
      .map((risk) => ({
        area: risk.area_name,
        risk: risk.risk_level,
        score: risk.risk_score,
        confidence: risk.ai_confidence,
        reasoning: risk.reasoning,
      }));

    // Latest incidents
    const recentIncidents = incidents.slice(0, 5).map((incident) => ({
      id: incident.id,
      incidentCode: incident.incident_code,
      title: incident.title,
      location: incident.location_name,
      severity: incident.severity,
      affectedPeople: incident.affected_people,
      status: incident.status,
      reportedAt: incident.reported_at,
    }));

    // Dashboard response
    res.status(200).json({
      success: true,
      data: {
        stats: {
          criticalIncidents,
          activeIncidents,
          resolvedIncidents,
          totalIncidents: incidents.length,
          totalResources,
          availableResources,
          activeAlerts: alerts.length,
          pendingReports: reportsResult.count || 0,
        },
        resources: resourceSummary,
        recentIncidents,
        alerts: alerts.slice(0, 5),
        riskOverview,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error while loading dashboard",
    });
  }
};
