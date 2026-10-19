import {
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export function Panel({
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-800/80 bg-[#0d1726] ${className}`}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-800/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[15px] font-semibold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-400">
            {eyebrow}
          </p>
        )}

        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

export function StatusBadge({
  children,
  status = "neutral",
}) {
  const styles = {
    critical:
      "bg-red-500/10 text-red-400 border-red-500/20",
    high:
      "bg-orange-500/10 text-orange-400 border-orange-500/20",
    moderate:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    safe:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    info:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
    neutral:
      "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500",
    secondary:
      "border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700",
    ghost:
      "text-slate-400 hover:bg-slate-800 hover:text-white",
    danger:
      "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
      {Icon && (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-500">
          <Icon size={20} />
        </div>
      )}

      <h3 className="mt-4 text-sm font-semibold text-slate-300">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export function MiniLink({ children }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300">
      {children}
      <ChevronRight size={13} />
    </span>
  );
}

export function Trend({ value, label }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
        <ArrowUpRight size={12} />
        {value}
      </span>

      <span className="text-[11px] text-slate-600">
        {label}
      </span>
    </div>
  );
}