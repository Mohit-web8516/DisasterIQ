import {
  AlertTriangle,
  MapPin,
  Users,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { criticalIncidents } from "../../data/mockData";

const severityStyles = {
  Critical: {
    badge: "border-red-500/20 bg-red-500/10 text-red-400",
    icon: "bg-red-500/10 text-red-400",
    dot: "bg-red-500",
  },

  High: {
    badge: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    icon: "bg-orange-500/10 text-orange-400",
    dot: "bg-orange-500",
  },
};

function CriticalIncidents() {
  return (
    <div className="flex h-full min-w-0 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle
                size={17}
                className="text-red-400"
              />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Critical Incidents
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Incidents requiring immediate attention
          </p>
        </div>

        <button
          className="
            flex items-center gap-1
            text-xs font-medium text-blue-400
            transition-colors
            hover:text-blue-300
          "
        >
          View all
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Incident List */}
      <div className="mt-5 flex-1 space-y-3">
        {criticalIncidents.map((incident) => {
          const styles =
            severityStyles[incident.severity] ||
            severityStyles.High;

          return (
            <div
              key={incident.id}
              className="
                rounded-lg border border-slate-800
                bg-slate-950/60 p-3
                transition-colors
                hover:border-slate-700
                hover:bg-slate-950
              "
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`
                      mt-0.5 flex h-8 w-8 shrink-0
                      items-center justify-center rounded-lg
                      ${styles.icon}
                    `}
                  >
                    <AlertTriangle size={16} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-slate-200">
                      {incident.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} />

                      <span className="truncate">
                        {incident.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Severity */}
                <span
                  className={`
                    shrink-0 rounded-full border
                    px-2 py-1 text-[10px]
                    font-semibold uppercase tracking-wide
                    ${styles.badge}
                  `}
                >
                  {incident.severity}
                </span>
              </div>

              {/* Bottom information */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={13} />

                  <span>
                    {incident.affectedPeople} affected
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock3 size={13} />

                  <span>
                    {incident.time}
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-1.5">
                  <span
                    className={`
                      h-1.5 w-1.5 rounded-full
                      ${styles.dot}
                    `}
                  />

                  <span className="text-[11px] text-slate-400">
                    {incident.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CriticalIncidents;