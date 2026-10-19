// ============================================================
// DisasterIQ - Dashboard Mock Data
// ============================================================

// ------------------------------------------------------------
// Dashboard Statistics
// ------------------------------------------------------------

export const dashboardStats = [
  {
    id: "critical",
    title: "Critical Incidents",
    value: 12,
    change: "+3",
    changeLabel: "since last hour",
    status: "critical",
  },
  {
    id: "active",
    title: "Active Incidents",
    value: 47,
    change: "+8",
    changeLabel: "today",
    status: "warning",
  },
  {
    id: "teams",
    title: "Response Teams",
    value: 18,
    change: "14",
    changeLabel: "available",
    status: "safe",
  },
  {
    id: "resources",
    title: "Resources Deployed",
    value: 31,
    change: "7",
    changeLabel: "awaiting deployment",
    status: "info",
  },
];

// ------------------------------------------------------------
// Critical Incidents
// ------------------------------------------------------------

export const criticalIncidents = [
  {
    id: "INC-001",
    title: "Flooded Residential Area",
    location: "Sector 14, Noida",
    severity: "Critical",
    affectedPeople: 25,
    time: "8 min ago",
    status: "Rescue Required",
  },
  {
    id: "INC-002",
    title: "River Water Level Rising",
    location: "Yamuna Bank",
    severity: "Critical",
    affectedPeople: 40,
    time: "14 min ago",
    status: "Monitoring",
  },
  {
    id: "INC-003",
    title: "Road Blockage",
    location: "Sector 62",
    severity: "High",
    affectedPeople: 12,
    time: "21 min ago",
    status: "Response Dispatched",
  },
  {
    id: "INC-004",
    title: "Water Entering Buildings",
    location: "Sector 18",
    severity: "High",
    affectedPeople: 18,
    time: "29 min ago",
    status: "Rescue Required",
  },
];

// ------------------------------------------------------------
// Alerts
// ------------------------------------------------------------

export const alerts = [
  {
    id: "ALT-001",
    title: "River level crossed warning threshold",
    location: "Yamuna Bank",
    time: "5 min ago",
    severity: "Critical",
  },
  {
    id: "ALT-002",
    title: "Heavy rainfall detected",
    location: "Noida",
    time: "12 min ago",
    severity: "High",
  },
  {
    id: "ALT-003",
    title: "Multiple citizen reports received",
    location: "Sector 14",
    time: "18 min ago",
    severity: "High",
  },
  {
    id: "ALT-004",
    title: "Shelter capacity approaching limit",
    location: "Community Center 03",
    time: "32 min ago",
    severity: "Medium",
  },
];

// ------------------------------------------------------------
// Resource Status
// ------------------------------------------------------------

export const resourceStatus = {
  rescueTeams: {
    total: 24,
    available: 18,
    deployed: 6,
  },

  ambulances: {
    total: 15,
    available: 9,
    deployed: 6,
  },

  shelters: {
    total: 10,
    available: 7,
    nearCapacity: 2,
    full: 1,
  },
};

// ------------------------------------------------------------
// Risk Overview
// ------------------------------------------------------------

export const riskOverview = [
  {
    area: "Sector 14",
    risk: "Critical",
    score: 92,
  },
  {
    area: "Yamuna Bank",
    risk: "Critical",
    score: 88,
  },
  {
    area: "Sector 18",
    risk: "High",
    score: 76,
  },
  {
    area: "Sector 62",
    risk: "High",
    score: 68,
  },
  {
    area: "Sector 27",
    risk: "Moderate",
    score: 49,
  },
];
// ------------------------------------------------------------
// Disaster Map Incidents
// ------------------------------------------------------------

export const mapIncidents = [
  {
    id: "INC-001",
    title: "Flooded Residential Area",
    location: "Sector 14, Noida",
    latitude: 28.5958,
    longitude: 77.3197,
    severity: "Critical",
    affectedPeople: 25,
    status: "Rescue Required",
  },
  {
    id: "INC-002",
    title: "River Water Level Rising",
    location: "Yamuna Bank",
    latitude: 28.6139,
    longitude: 77.315,
    severity: "Critical",
    affectedPeople: 40,
    status: "Monitoring",
  },
  {
    id: "INC-003",
    title: "Road Blockage",
    location: "Sector 62",
    latitude: 28.6271,
    longitude: 77.3649,
    severity: "High",
    affectedPeople: 12,
    status: "Response Dispatched",
  },
  {
    id: "INC-004",
    title: "Water Entering Buildings",
    location: "Sector 18",
    latitude: 28.5708,
    longitude: 77.326,
    severity: "High",
    affectedPeople: 18,
    status: "Rescue Required",
  },
  {
    id: "INC-005",
    title: "Waterlogging Report",
    location: "Sector 27",
    latitude: 28.5812,
    longitude: 77.332,
    severity: "Moderate",
    affectedPeople: 7,
    status: "Monitoring",
  },
];
export const incidents = [
  {
    id: "INC-001",
    title: "Flooded Residential Area",
    type: "Flood",
    location: "Sector 14, Noida",
    severity: "Critical",
    affectedPeople: 25,
    status: "Rescue Required",
    reportedAt: "8 min ago",
    description:
      "Heavy waterlogging reported in a residential area with multiple people requiring immediate assistance.",
    assignedTeam: "Rescue Team Alpha",
  },
  {
    id: "INC-002",
    title: "River Water Level Rising",
    type: "Water Level",
    location: "Yamuna Bank",
    severity: "Critical",
    affectedPeople: 40,
    status: "Monitoring",
    reportedAt: "14 min ago",
    description:
      "River water level has crossed the warning threshold and continues to rise.",
    assignedTeam: "Response Team Bravo",
  },
  {
    id: "INC-003",
    title: "Road Blockage",
    type: "Infrastructure",
    location: "Sector 62",
    severity: "High",
    affectedPeople: 12,
    status: "Response Dispatched",
    reportedAt: "21 min ago",
    description:
      "Floodwater has blocked a major road and disrupted emergency access.",
    assignedTeam: "Rescue Team Charlie",
  },
  {
    id: "INC-004",
    title: "Water Entering Buildings",
    type: "Flood",
    location: "Sector 18",
    severity: "High",
    affectedPeople: 18,
    status: "Rescue Required",
    reportedAt: "29 min ago",
    description:
      "Floodwater is entering residential buildings and evacuation assistance is required.",
    assignedTeam: "Rescue Team Alpha",
  },
  {
    id: "INC-005",
    title: "Waterlogging Report",
    type: "Waterlogging",
    location: "Sector 27",
    severity: "Moderate",
    affectedPeople: 7,
    status: "Monitoring",
    reportedAt: "36 min ago",
    description:
      "Moderate waterlogging reported. Situation is currently under observation.",
    assignedTeam: "Response Team Delta",
  },
  {
    id: "INC-006",
    title: "Flooded Road Junction",
    type: "Flood",
    location: "Sector 12",
    severity: "High",
    affectedPeople: 15,
    status: "Response Dispatched",
    reportedAt: "42 min ago",
    description:
      "Floodwater has accumulated near a major road junction.",
    assignedTeam: "Rescue Team Charlie",
  },
  {
    id: "INC-007",
    title: "Shelter Assistance Required",
    type: "Shelter",
    location: "Sector 21",
    severity: "Moderate",
    affectedPeople: 10,
    status: "Monitoring",
    reportedAt: "51 min ago",
    description:
      "Additional shelter capacity may be required if water levels continue to rise.",
    assignedTeam: "Response Team Delta",
  },
];
export const resources = [
  {
    id: "RES-001",
    name: "Rescue Team Alpha",
    category: "Rescue Team",
    type: "Water Rescue",
    location: "Sector 14, Noida",
    status: "Deployed",
    members: 6,
    contact: "+91 98765 43210",
    assignedIncident: "INC-001",
    lastUpdated: "5 min ago",
  },
  {
    id: "RES-002",
    name: "Rescue Team Bravo",
    category: "Rescue Team",
    type: "Emergency Response",
    location: "Yamuna Bank",
    status: "Deployed",
    members: 5,
    contact: "+91 98765 43211",
    assignedIncident: "INC-002",
    lastUpdated: "8 min ago",
  },
  {
    id: "RES-003",
    name: "Rescue Team Charlie",
    category: "Rescue Team",
    type: "Flood Rescue",
    location: "Sector 62",
    status: "Available",
    members: 7,
    contact: "+91 98765 43212",
    assignedIncident: null,
    lastUpdated: "12 min ago",
  },
  {
    id: "RES-004",
    name: "Response Team Delta",
    category: "Rescue Team",
    type: "General Response",
    location: "Sector 27",
    status: "Available",
    members: 5,
    contact: "+91 98765 43213",
    assignedIncident: null,
    lastUpdated: "15 min ago",
  },

  {
    id: "AMB-001",
    name: "Ambulance Unit 01",
    category: "Ambulance",
    type: "Advanced Life Support",
    location: "Sector 18",
    status: "Deployed",
    members: 3,
    contact: "+91 98765 44001",
    assignedIncident: "INC-004",
    lastUpdated: "4 min ago",
  },
  {
    id: "AMB-002",
    name: "Ambulance Unit 02",
    category: "Ambulance",
    type: "Basic Life Support",
    location: "Sector 27",
    status: "Available",
    members: 2,
    contact: "+91 98765 44002",
    assignedIncident: null,
    lastUpdated: "10 min ago",
  },
  {
    id: "AMB-003",
    name: "Ambulance Unit 03",
    category: "Ambulance",
    type: "Basic Life Support",
    location: "Sector 12",
    status: "Maintenance",
    members: 2,
    contact: "+91 98765 44003",
    assignedIncident: null,
    lastUpdated: "25 min ago",
  },

  {
    id: "SHL-001",
    name: "Community Shelter 01",
    category: "Shelter",
    type: "Emergency Shelter",
    location: "Sector 21",
    status: "Available",
    members: 0,
    capacity: 250,
    occupied: 120,
    contact: "+91 98765 45001",
    assignedIncident: null,
    lastUpdated: "6 min ago",
  },
  {
    id: "SHL-002",
    name: "Community Shelter 02",
    category: "Shelter",
    type: "Emergency Shelter",
    location: "Sector 18",
    status: "Near Capacity",
    members: 0,
    capacity: 180,
    occupied: 165,
    contact: "+91 98765 45002",
    assignedIncident: null,
    lastUpdated: "9 min ago",
  },
  {
    id: "SHL-003",
    name: "Community Shelter 03",
    category: "Shelter",
    type: "Emergency Shelter",
    location: "Sector 14",
    status: "Full",
    members: 0,
    capacity: 150,
    occupied: 150,
    contact: "+91 98765 45003",
    assignedIncident: null,
    lastUpdated: "3 min ago",
  },
];