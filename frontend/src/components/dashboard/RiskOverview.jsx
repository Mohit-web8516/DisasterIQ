import { ShieldAlert, ArrowRight } from "lucide-react";
import { riskOverview } from "../../data/mockData";

const riskStyles = {
  Critical: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    bar: "bg-red-500",
  },
  High: {
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    bar: "bg-orange-500",
  },
  Moderate: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    bar: "bg-yellow-500",
  },
  Low: {
    text: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    bar: "bg-green-500",
  },
};

function RiskOverview() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
            <ShieldAlert size={18} className="text-red-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Risk Overview
            </h2>
            <p className="text-xs text-slate-500">
              Current risk assessment by area
            </p>
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs font-medium text-blue-400 transition hover:text-blue-300">
          Details
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Risk Areas */}
      <div className="mt-5 space-y-4">
        {riskOverview.map((item) => {
          const style = riskStyles[item.risk] || riskStyles.Moderate;

          return (
            <div
              key={item.area}
              className={`rounded-lg border ${style.border} ${style.bg} p-4`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-200">
                    {item.area}
                  </p>

                  <span
                    className={`mt-1 inline-block text-xs font-semibold ${style.text}`}
                  >
                    {item.risk} Risk
                  </span>
                </div>

                <div className="text-right">
                  <p className={`text-xl font-bold ${style.text}`}>
                    {item.score}
                  </p>

                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Risk Score
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${style.bar} transition-all`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-slate-800 pt-4">
        <p className="text-xs leading-5 text-slate-500">
          Risk scores combine environmental conditions and active incident
          signals. AI-based risk assessment will be connected in a later phase.
        </p>
      </div>
    </div>
  );
}

export default RiskOverview;