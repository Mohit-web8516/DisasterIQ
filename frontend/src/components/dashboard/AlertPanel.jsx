import {
  AlertTriangle,
  Bell,
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { alerts } from "../../data/mockData";

const severityStyles = {
  Critical: {
    icon: "bg-red-500/10 text-red-400",
    badge: "border-red-500/20 bg-red-500/10 text-red-400",
    dot: "bg-red-500",
  },

  High: {
    icon: "bg-orange-500/10 text-orange-400",
    badge: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    dot: "bg-orange-500",
  },

  Medium: {
    icon: "bg-yellow-500/10 text-yellow-400",
    badge: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    dot: "bg-yellow-500",
  },

  Low: {
    icon: "bg-green-500/10 text-green-400",
    badge: "border-green-500/20 bg-green-500/10 text-green-400",
    dot: "bg-green-500",
  },
};

function AlertPanel() {
  return (
    <div className="flex h-full min-w-0 flex-col">

      {/* ================================================== */}
      {/* Header */}
      {/* ================================================== */}

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Bell
                size={17}
                className="text-blue-400"
              />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Recent Alerts
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Latest system and disaster alerts
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

      {/* ================================================== */}
      {/* Alerts */}
      {/* ================================================== */}

      <div className="mt-5 space-y-3">
        {alerts.map((alert) => {
          const styles =
            severityStyles[alert.severity] ||
            severityStyles.Medium;

          return (
            <div
              key={alert.id}
              className="
                rounded-lg border border-slate-800
                bg-slate-950/60 p-3
                transition-colors
                hover:border-slate-700
                hover:bg-slate-950
              "
            >
              <div className="flex items-start gap-3">

                {/* Alert Icon */}
                <div
                  className={`
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    ${styles.icon}
                  `}
                >
                  <AlertTriangle size={16} />
                </div>

                {/* Alert Content */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium leading-5 text-slate-200">
                      {alert.title}
                    </h3>

                    <span
                      className={`
                        shrink-0 rounded-full border
                        px-2 py-1 text-[10px]
                        font-semibold uppercase tracking-wide
                        ${styles.badge}
                      `}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  {/* Location + Time */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={12} />

                      <span>
                        {alert.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 size={12} />

                      <span>
                        {alert.time}
                      </span>
                    </div>

                  </div>

                  {/* Status */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <span
                      className={`
                        h-1.5 w-1.5 rounded-full
                        ${styles.dot}
                      `}
                    />

                    <span className="text-[11px] text-slate-500">
                      Active alert
                    </span>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AlertPanel;