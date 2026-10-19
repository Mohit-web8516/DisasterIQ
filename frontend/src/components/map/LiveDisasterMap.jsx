import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import {
  AlertTriangle,
  MapPin,
  Users,
  Clock3,
  Radio,
} from "lucide-react";

import { mapIncidents } from "../../data/mockData";
import MapResizeHandler from "./MapResizeHandler";

const severityConfig = {
  Critical: {
    color: "#ef4444",
    label: "Critical",
  },
  High: {
    color: "#f97316",
    label: "High",
  },
  Moderate: {
    color: "#eab308",
    label: "Moderate",
  },
  Low: {
    color: "#22c55e",
    label: "Low",
  },
};

function LiveDisasterMap() {
  const center = [28.595, 77.34];

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* ==================================================
          Header
      ================================================== */}
      <div className="flex shrink-0 flex-col gap-3 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <MapPin
                size={17}
                className="text-blue-400"
              />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Live Disaster Map
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Real-time incident monitoring and geographic risk view
          </p>
        </div>

        <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>

          <Radio
            size={13}
            className="text-green-400"
          />

          <span className="text-xs font-medium text-slate-400">
            Live
          </span>
        </div>
      </div>

      {/* ==================================================
          Map
      ================================================== */}
      <div className="relative h-[460px] w-full">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <MapResizeHandler />

          <ZoomControl position="bottomright" />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Incident markers */}
          {mapIncidents.map((incident) => {
            const severity =
              severityConfig[incident.severity] ||
              severityConfig.Moderate;

            const radius =
              incident.severity === "Critical"
                ? 12
                : incident.severity === "High"
                  ? 10
                  : 8;

            return (
              <CircleMarker
                key={incident.id}
                center={[
                  incident.latitude,
                  incident.longitude,
                ]}
                radius={radius}
                pathOptions={{
                  color: severity.color,
                  fillColor: severity.color,
                  fillOpacity: 0.75,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="min-w-[220px]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-500">
                          {incident.id}
                        </p>

                        <h3 className="mt-1 text-sm font-bold text-slate-900">
                          {incident.title}
                        </h3>
                      </div>

                      <span
                        className="rounded-full px-2 py-1 text-[10px] font-bold uppercase"
                        style={{
                          backgroundColor: `${severity.color}20`,
                          color: severity.color,
                        }}
                      >
                        {incident.severity}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} />
                        <span>{incident.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users size={13} />
                        <span>
                          {incident.affectedPeople} people affected
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={13} />
                        <span>{incident.status}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Active incidents */}
        <div className="pointer-events-none absolute left-3 top-3 z-[1000] rounded-lg border border-slate-700 bg-slate-950/90 px-3 py-2 shadow-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <AlertTriangle
              size={14}
              className="text-red-400"
            />

            <span className="text-xs font-medium text-slate-300">
              {mapIncidents.length} active incidents
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-lg border border-slate-700 bg-slate-950/95 p-3 shadow-lg backdrop-blur">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Risk Level
          </p>

          <div className="flex flex-wrap gap-3">
            {Object.entries(severityConfig).map(
              ([severity, config]) => (
                <div
                  key={severity}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: config.color,
                    }}
                  />

                  <span className="text-[10px] text-slate-400">
                    {severity}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveDisasterMap;