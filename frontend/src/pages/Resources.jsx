import {
  Ambulance,
  Building2,
  Users,
  Truck,
  MapPin,
} from "lucide-react";

import {
  PageHeader,
  Panel,
  PanelHeader,
  StatusBadge,
  Button,
} from "../components/common/UI";

const resources = [
  {
    name: "Rescue Teams",
    icon: Users,
    total: 24,
    available: 18,
    deployed: 6,
    color: "blue",
  },
  {
    name: "Ambulances",
    icon: Ambulance,
    total: 15,
    available: 9,
    deployed: 6,
    color: "emerald",
  },
  {
    name: "Shelters",
    icon: Building2,
    total: 10,
    available: 7,
    deployed: 3,
    color: "orange",
  },
  {
    name: "Rescue Vehicles",
    icon: Truck,
    total: 12,
    available: 8,
    deployed: 4,
    color: "purple",
  },
];

function Resources() {
  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Resource Management"
        description="Track emergency teams, vehicles and shelters available for deployment."
        action={
          <Button>
            + Add Resource
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const percentage = Math.round(
            (resource.available / resource.total) * 100,
          );

          return (
            <Panel key={resource.name} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon size={19} />
                </div>

                <span className="text-xs font-semibold text-emerald-400">
                  {percentage}% available
                </span>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-white">
                {resource.name}
              </h3>

              <p className="mt-1 text-xs text-slate-600">
                {resource.total} total resources
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs">
                <span className="text-slate-500">
                  Available
                </span>

                <span className="font-semibold text-white">
                  {resource.available}
                </span>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-6">
        <PanelHeader
          title="Deployment Overview"
          description="Current location and operational status"
        />

        <div className="divide-y divide-slate-800/70">
          {[
            [
              "Rescue Team Alpha",
              "Sector 14, Noida",
              "Deployed",
              "critical",
            ],
            [
              "Response Team Bravo",
              "Yamuna Bank",
              "Monitoring",
              "high",
            ],
            [
              "Ambulance Unit 04",
              "Sector 18",
              "Available",
              "safe",
            ],
            [
              "Shelter Community Center 03",
              "Sector 21",
              "Near Capacity",
              "moderate",
            ],
          ].map(([name, location, status, tone]) => (
            <div
              key={name}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  {name}
                </p>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin size={12} />
                  {location}
                </p>
              </div>

              <StatusBadge status={tone}>
                {status}
              </StatusBadge>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default Resources;