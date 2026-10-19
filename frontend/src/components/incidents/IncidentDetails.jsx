import {
  X,
  AlertTriangle,
  MapPin,
  Users,
  Clock3,
  Shield,
  Activity,
} from "lucide-react";

const severityStyles = {
  Critical: {
    badge: "border-red-500/20 bg-red-500/10 text-red-400",
    icon: "text-red-400",
  },
  High: {
    badge: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    icon: "text-orange-400",
  },
  Moderate: {
    badge: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    icon: "text-yellow-400",
  },
  Low: {
    badge: "border-green-500/20 bg-green-500/10 text-green-400",
    icon: "text-green-400",
  },
};

const statusStyles = {
  "Rescue Required": "text-red-400",
  "Response Dispatched": "text-orange-400",
  Monitoring: "text-blue-400",
  Resolved: "text-green-400",
};

function IncidentDetails({ incident, onClose }) {
  if (!incident) {
    return null;
  }

  const severity =
    severityStyles[incident.severity] ||
    severityStyles.Moderate;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ==================================================
            Header
        ================================================== */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <AlertTriangle
                size={19}
                className={severity.icon}
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">
                  {incident.title}
                </h2>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${severity.badge}`}
                >
                  {incident.severity}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {incident.id} · {incident.type}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close incident details"
          >
            <X size={19} />
          </button>
        </div>

        {/* ==================================================
            Content
        ================================================== */}
        <div className="overflow-y-auto p-5">
          {/* Information Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoCard
              icon={MapPin}
              label="Location"
              value={incident.location}
            />

            <InfoCard
              icon={Users}
              label="People Affected"
              value={`${incident.affectedPeople} people`}
            />

            <InfoCard
              icon={Clock3}
              label="Reported"
              value={incident.reportedAt}
            />

            <InfoCard
              icon={Shield}
              label="Assigned Team"
              value={incident.assignedTeam}
            />
          </div>

          {/* Current Status */}
          <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-2">
              <Activity
                size={16}
                className="text-blue-400"
              />

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Current Status
              </p>
            </div>

            <p
              className={`mt-2 text-sm font-semibold ${
                statusStyles[incident.status] ||
                "text-slate-300"
              }`}
            >
              {incident.status}
            </p>
          </div>

          {/* Description */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Incident Description
            </p>

            <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm leading-6 text-slate-400">
                {incident.description}
              </p>
            </div>
          </div>

          {/* Response Information */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Response Information
            </p>

            <div className="mt-2 flex items-center gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                <Shield
                  size={17}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-200">
                  {incident.assignedTeam}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Assigned response team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            Footer
        ================================================== */}
        <div className="flex shrink-0 justify-end border-t border-slate-800 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          className="text-slate-500"
        />

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-medium text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default IncidentDetails;