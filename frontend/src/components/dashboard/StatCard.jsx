// src/components/dashboard/StatCard.jsx
import {
  AlertOctagon,
  AlertTriangle,
  Activity,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const iconMap = { AlertOctagon, AlertTriangle, Activity, Users };

const levelStyles = {
  critical: { text: "text-[#ef4444]", bg: "bg-[#ef4444]/10", bar: "bg-[#ef4444]" },
  high: { text: "text-[#f97316]", bg: "bg-[#f97316]/10", bar: "bg-[#f97316]" },
  warning: { text: "text-[#eab308]", bg: "bg-[#eab308]/10", bar: "bg-[#eab308]" },
  safe: { text: "text-[#22c55e]", bg: "bg-[#22c55e]/10", bar: "bg-[#22c55e]" },
  info: { text: "text-[#2563eb]", bg: "bg-[#2563eb]/10", bar: "bg-[#2563eb]" },
};

function StatCard({ label, value, change, trend, level = "info", icon }) {
  const styles = levelStyles[level] || levelStyles.info;
  const Icon = iconMap[icon] || Activity;
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#334155] bg-[#0f172a] p-5">
      <div className={`absolute left-0 top-0 h-full w-1 ${styles.bar}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#94a3b8]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#f8fafc]">{value}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${styles.bg}`}>
          <Icon className={`h-5 w-5 ${styles.text}`} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-[#94a3b8]">
        <TrendIcon className={`h-3.5 w-3.5 ${styles.text}`} />
        <span>{change}</span>
      </div>
    </div>
  );
}

export default StatCard;