import {
  AlertTriangle,
  Clock3,
  MapPin,
  Users,
  Radio,
  Ambulance,
} from "lucide-react";

import LiveDisasterMap from "../components/map/LiveDisasterMap";
import {
  dashboardStats,
  criticalIncidents,
  resourceStatus,
  riskOverview,
} from "../data/mockData";

import {
  PageHeader,
  Panel,
  PanelHeader,
  StatusBadge,
  Trend,
  MiniLink,
} from "../components/common/UI";

const statusMap = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
};

function Dashboard() {
  return (
    <div>
      <PageHeader
        eyebrow="Emergency Operations"
        title="Command Center"
        description="Monitor incidents, geographic risk and emergency resources from one operational view."
        action={
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.6)]" />

            <span className="text-xs font-medium text-emerald-400">
              Live monitoring
            </span>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Panel key={stat.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>

                <Trend
                  value={stat.change}
                  label={stat.changeLabel}
                />
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  stat.status === "critical"
                    ? "bg-red-500/10 text-red-400"
                    : stat.status === "warning"
                      ? "bg-orange-500/10 text-orange-400"
                      : stat.status === "safe"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {stat.id === "teams" ? (
                  <Users size={19} />
                ) : stat.id === "resources" ? (
                  <Ambulance size={19} />
                ) : (
                  <AlertTriangle size={19} />
                )}
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* Main operation area */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_380px]">
        <Panel className="overflow-hidden">
          <PanelHeader
            title="Live Situation Map"
            description="Active incidents and geographic risk"
            action={
              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                LIVE
              </div>
            }
          />

          <div className="h-[500px] p-2">
            <LiveDisasterMap />
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <PanelHeader
            title="Priority Incidents"
            description="Incidents requiring immediate attention"
            action={<MiniLink>View all</MiniLink>}
          />

          <div>
            {criticalIncidents.map((incident) => (
              <div
                key={incident.id}
                className="border-b border-slate-800/70 px-5 py-4 last:border-0 hover:bg-slate-800/20"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <AlertTriangle size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-200">
                        {incident.title}
                      </h3>

                      <StatusBadge
                        status={statusMap[incident.severity]}
                      >
                        {incident.severity}
                      </StatusBadge>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin size={12} />
                      {incident.location}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
                      <span>
                        {incident.affectedPeople} affected
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock3 size={11} />
                        {incident.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Bottom */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Resource Availability"
            description="Current emergency response capacity"
          />

          <div className="space-y-5 p-5">
            <ResourceBar
              label="Rescue Teams"
              available={resourceStatus.rescueTeams.available}
              total={resourceStatus.rescueTeams.total}
            />

            <ResourceBar
              label="Ambulances"
              available={resourceStatus.ambulances.available}
              total={resourceStatus.ambulances.total}
            />

            <ResourceBar
              label="Shelters"
              available={resourceStatus.shelters.available}
              total={resourceStatus.shelters.total}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Risk Overview"
            description="Highest-risk areas currently monitored"
          />

          <div className="p-5">
            <div className="space-y-4">
              {riskOverview.map((area) => (
                <div key={area.area}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      {area.area}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      {area.score}/100
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${
                        area.score >= 85
                          ? "bg-red-500"
                          : area.score >= 65
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${area.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ResourceBar({ label, available, total }) {
  const percentage = Math.round(
    (available / total) * 100,
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">
          {label}
        </span>

        <span className="text-xs text-slate-500">
          <span className="font-semibold text-white">
            {available}
          </span>{" "}
          / {total} available
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;