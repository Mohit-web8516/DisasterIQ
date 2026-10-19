import { useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  AlertTriangle,
  Clock3,
  Users,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { incidents } from "../data/mockData";
import IncidentDetails from "../components/incidents/IncidentDetails";

const severityStyles = {
  Critical: "border-red-500/20 bg-red-500/10 text-red-400",
  High: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  Moderate: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  Low: "border-green-500/20 bg-green-500/10 text-green-400",
};

const statusStyles = {
  "Rescue Required": "text-red-400",
  "Response Dispatched": "text-orange-400",
  Monitoring: "text-blue-400",
  Resolved: "text-green-400",
};

function Incidents() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Currently selected incident for details modal
  const [selectedIncident, setSelectedIncident] = useState(null);

  /* ==================================================
     Filter Incidents
  ================================================== */

  const filteredIncidents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return incidents.filter((incident) => {
      const matchesSearch =
        normalizedSearch === "" ||
        incident.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        incident.location
          .toLowerCase()
          .includes(normalizedSearch) ||
        incident.id
          .toLowerCase()
          .includes(normalizedSearch) ||
        incident.type
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesSeverity =
        severityFilter === "All" ||
        incident.severity === severityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        incident.status === statusFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [search, severityFilter, statusFilter]);

  /* ==================================================
     Summary Statistics
  ================================================== */

  const totalIncidents = incidents.length;

  const criticalCount = incidents.filter(
    (incident) => incident.severity === "Critical",
  ).length;

  const highCount = incidents.filter(
    (incident) => incident.severity === "High",
  ).length;

  const activeCount = incidents.filter(
    (incident) => incident.status !== "Resolved",
  ).length;

  /* ==================================================
     Open Incident Details
  ================================================== */

  const openIncidentDetails = (incident) => {
    setSelectedIncident(incident);
  };

  const closeIncidentDetails = () => {
    setSelectedIncident(null);
  };

  return (
    <>
      <div className="min-w-0 space-y-6">
        {/* ==================================================
            Header
        ================================================== */}
        <section>
          <p className="text-sm font-medium text-blue-400">
            Emergency Operations
          </p>

          <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Incident Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Review, filter and coordinate active disaster
                incidents.
              </p>
            </div>

            <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              <AlertTriangle
                size={15}
                className="text-red-400"
              />

              <span className="text-xs font-medium text-slate-400">
                {activeCount} Active
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================
            Summary Cards
        ================================================== */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Incidents"
            value={totalIncidents}
            icon={AlertTriangle}
            iconClass="text-blue-400"
          />

          <SummaryCard
            label="Critical"
            value={criticalCount}
            icon={AlertTriangle}
            iconClass="text-red-400"
          />

          <SummaryCard
            label="High Priority"
            value={highCount}
            icon={AlertTriangle}
            iconClass="text-orange-400"
          />

          <SummaryCard
            label="Active"
            value={activeCount}
            icon={Clock3}
            iconClass="text-green-400"
          />
        </section>

        {/* ==================================================
            Filters
        ================================================== */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex flex-col gap-4 xl:flex-row">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search incidents, locations, types or IDs..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            {/* Severity */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={16}
                className="shrink-0 text-slate-500"
              />

              <select
                value={severityFilter}
                onChange={(event) =>
                  setSeverityFilter(event.target.value)
                }
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
              >
                <option value="All">All Severity</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Rescue Required">
                Rescue Required
              </option>
              <option value="Response Dispatched">
                Response Dispatched
              </option>
              <option value="Monitoring">Monitoring</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </section>

        {/* ==================================================
            Incident List
        ================================================== */}
        <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {/* List Header */}
          <div className="flex flex-col gap-2 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Active Incidents
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredIncidents.length} incidents found
              </p>
            </div>

            {(search ||
              severityFilter !== "All" ||
              statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSeverityFilter("All");
                  setStatusFilter("All");
                }}
                className="w-fit text-xs font-medium text-blue-400 transition hover:text-blue-300"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ==================================================
              Desktop Table
          ================================================== */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Incident
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Severity
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Affected
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Reported
                  </th>

                  <th className="px-5 py-3" />
                </tr>
              </thead>

              <tbody>
                {filteredIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/40"
                  >
                    {/* Incident */}
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                          <AlertTriangle
                            size={15}
                            className={
                              incident.severity === "Critical"
                                ? "text-red-400"
                                : incident.severity === "High"
                                  ? "text-orange-400"
                                  : incident.severity === "Moderate"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                            }
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200">
                            {incident.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {incident.id} · {incident.type}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin size={14} />
                        {incident.location}
                      </div>
                    </td>

                    {/* Severity */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${severityStyles[incident.severity]}`}
                      >
                        {incident.severity}
                      </span>
                    </td>

                    {/* Affected */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Users size={14} />
                        {incident.affectedPeople}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-medium ${statusStyles[incident.status] || "text-slate-400"}`}
                      >
                        {incident.status}
                      </span>
                    </td>

                    {/* Reported */}
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {incident.reportedAt}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          openIncidentDetails(incident)
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                        aria-label={`View ${incident.id} details`}
                      >
                        <ChevronRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ==================================================
              Mobile List
          ================================================== */}
          <div className="divide-y divide-slate-800 md:hidden">
            {filteredIncidents.map((incident) => (
              <button
                key={incident.id}
                type="button"
                onClick={() =>
                  openIncidentDetails(incident)
                }
                className="block w-full p-4 text-left transition hover:bg-slate-800/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {incident.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {incident.id} · {incident.type}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${severityStyles[incident.severity]}`}
                  >
                    {incident.severity}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {incident.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users size={13} />
                    {incident.affectedPeople} affected
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p
                    className={`text-xs font-medium ${statusStyles[incident.status] || "text-slate-400"}`}
                  >
                    {incident.status}
                  </p>

                  <ChevronRight
                    size={16}
                    className="text-slate-600"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* ==================================================
              Empty State
          ================================================== */}
          {filteredIncidents.length === 0 && (
            <div className="px-5 py-12 text-center">
              <AlertTriangle
                size={28}
                className="mx-auto text-slate-600"
              />

              <p className="mt-3 text-sm font-medium text-slate-400">
                No incidents found
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ==================================================
          Incident Details Modal
      ================================================== */}
      {selectedIncident && (
        <IncidentDetails
          incident={selectedIncident}
          onClose={closeIncidentDetails}
        />
      )}
    </>
  );
}

/* ==================================================
   Summary Card
================================================== */

function SummaryCard({
  label,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>

        <Icon
          size={18}
          className={iconClass}
        />
      </div>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default Incidents;