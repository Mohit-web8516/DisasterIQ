import {
  AlertTriangle,
  Layers,
  MapPin,
  Search,
} from "lucide-react";

import LiveDisasterMap from "../components/map/LiveDisasterMap";

import {
  PageHeader,
  Panel,
  StatusBadge,
} from "../components/common/UI";

function Map() {
  return (
    <div>
      <PageHeader
        eyebrow="Situational Awareness"
        title="Live Disaster Map"
        description="Monitor incidents and geographic risk across the response area."
        action={
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400">
              Live data
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Panel className="overflow-hidden p-2">
          <div className="relative h-[650px]">
            <LiveDisasterMap />
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <div className="border-b border-slate-800 p-4">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-slate-500" />

                <input
                  placeholder="Search location..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Map layers
              </p>

              <div className="mt-4 space-y-3">
                <Layer
                  label="Incidents"
                  active
                />

                <Layer
                  label="Risk areas"
                  active
                />

                <Layer
                  label="Response resources"
                />

                <Layer
                  label="Shelters"
                />
              </div>
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle
                size={17}
                className="text-red-400"
              />

              <h3 className="text-sm font-semibold text-white">
                Map Summary
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <Summary
                label="Critical"
                value="12"
                status="critical"
              />

              <Summary
                label="High"
                value="18"
                status="high"
              />

              <Summary
                label="Moderate"
                value="12"
                status="moderate"
              />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Layer({ label, active = false }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-950/50 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <Layers size={14} className="text-slate-600" />

        <span className="text-xs text-slate-300">
          {label}
        </span>
      </div>

      <input
        type="checkbox"
        defaultChecked={active}
        className="accent-blue-500"
      />
    </label>
  );
}

function Summary({
  label,
  value,
  status,
}) {
  return (
    <div className="flex items-center justify-between">
      <StatusBadge status={status}>
        {label}
      </StatusBadge>

      <span className="text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

export default Map;