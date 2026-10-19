import {
  Users,
  Ambulance,
  Building2,
  CheckCircle2,
  Truck,
} from "lucide-react";

import { resourceStatus } from "../../data/mockData";

const resourceConfig = [
  {
    key: "rescueTeams",
    title: "Rescue Teams",
    icon: Users,
    color: "blue",
    description: "Emergency response teams",
  },
  {
    key: "ambulances",
    title: "Ambulances",
    icon: Ambulance,
    color: "red",
    description: "Medical response units",
  },
  {
    key: "shelters",
    title: "Shelters",
    icon: Building2,
    color: "green",
    description: "Emergency shelters",
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    bar: "bg-blue-500",
  },
  red: {
    icon: "bg-red-500/10 text-red-400",
    bar: "bg-red-500",
  },
  green: {
    icon: "bg-green-500/10 text-green-400",
    bar: "bg-green-500",
  },
};

function ResourceStatus() {
  return (
    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-900 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Truck size={17} className="text-blue-400" />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Resource Status
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Current emergency response capacity
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-green-400">
          <CheckCircle2 size={14} />
          Operational
        </div>
      </div>

      {/* Resource Cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {resourceConfig.map((resource) => {
          const data = resourceStatus[resource.key];
          const Icon = resource.icon;
          const styles = colorStyles[resource.color];

          const total = data.total;
          const available = data.available;
          const deployed = data.deployed || 0;

          const availablePercentage =
            total > 0 ? Math.round((available / total) * 100) : 0;

          return (
            <div
              key={resource.key}
              className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.icon}`}
                  >
                    <Icon size={18} />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-200">
                    {resource.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {resource.description}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {available}
                  </p>

                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    available
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    Availability
                  </span>

                  <span className="font-medium text-slate-300">
                    {availablePercentage}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${styles.bar}`}
                    style={{
                      width: `${availablePercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-600">
                    Total
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    {total}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-slate-600">
                    Deployed
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    {deployed}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shelter warning */}
      {resourceStatus.shelters.nearCapacity > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2.5">
          <Building2 size={15} className="shrink-0 text-yellow-400" />

          <p className="text-xs text-slate-400">
            <span className="font-medium text-yellow-400">
              {resourceStatus.shelters.nearCapacity} shelters
            </span>{" "}
            are approaching capacity.
          </p>
        </div>
      )}
    </div>
  );
}

export default ResourceStatus;