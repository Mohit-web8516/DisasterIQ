import {
  X,
  MapPin,
  Users,
  Phone,
  Clock3,
  Activity,
  Shield,
} from "lucide-react";

const statusStyles = {
  Available: "bg-green-500/10 text-green-400 border-green-500/20",
  Deployed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Maintenance: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Near Capacity": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Full: "bg-red-500/10 text-red-400 border-red-500/20",
};

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-slate-500" />
        <span className="text-xs text-slate-500">{label}</span>
      </div>

      <p className="mt-2 text-sm font-medium text-slate-200">
        {value || "Not assigned"}
      </p>
    </div>
  );
}

function ResourceDetails({ resource, onClose }) {
  if (!resource) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 p-5">
          <div>
            <p className="font-mono text-xs text-blue-400">
              {resource.id}
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              {resource.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {resource.type}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Status */}
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                <Activity size={17} className="text-blue-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Current Status
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {resource.status}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                statusStyles[resource.status] ||
                "border-slate-700 bg-slate-800 text-slate-300"
              }`}
            >
              {resource.status}
            </span>
          </div>

          {/* Information */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              icon={Shield}
              label="Category"
              value={resource.category}
            />

            <InfoItem
              icon={MapPin}
              label="Location"
              value={resource.location}
            />

            <InfoItem
              icon={Users}
              label={
                resource.category === "Shelter"
                  ? "Occupancy"
                  : "Team Members"
              }
              value={
                resource.category === "Shelter"
                  ? `${resource.occupied}/${resource.capacity}`
                  : resource.members
              }
            />

            <InfoItem
              icon={Phone}
              label="Contact"
              value={resource.contact}
            />
          </div>

          {/* Deployment */}
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-sm font-semibold text-white">
              Deployment Information
            </h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Assigned Incident
                </span>

                <span className="font-mono text-xs font-medium text-blue-400">
                  {resource.assignedIncident || "Not assigned"}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-500">
                  Last Updated
                </span>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock3 size={13} />
                  {resource.lastUpdated}
                </div>
              </div>
            </div>
          </div>

          {/* Shelter capacity */}
          {resource.category === "Shelter" && (
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Shelter Capacity
                </span>

                <span className="text-xs font-semibold text-slate-300">
                  {resource.occupied} / {resource.capacity}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${Math.min(
                      (resource.occupied / resource.capacity) * 100,
                      100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceDetails;