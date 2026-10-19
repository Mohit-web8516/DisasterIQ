import {
  Activity,
  BarChart3,
  FileWarning,
  LayoutDashboard,
  Map,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const sections = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Live Map",
        path: "/map",
        icon: Map,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        name: "Incidents",
        path: "/incidents",
        icon: FileWarning,
      },
      {
        name: "Resources",
        path: "/resources",
        icon: Users,
      },
      {
        name: "Reports",
        path: "/reports",
        icon: Activity,
      },
    ],
  },
  {
    title: "Intelligence",
    items: [
      {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
    ],
  },
];

function Sidebar({ isOpen, onClose, desktop = false }) {
  return (
    <>
      {/* Mobile overlay */}
      {!desktop && isOpen && (
        <div
          className="fixed inset-0 z-[1900] bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          z-[2000]
          flex
          h-screen
          w-[248px]
          flex-col
          border-r
          border-white/[0.06]
          bg-[#090d17]

          ${
            desktop
              ? "sticky left-0 top-0"
              : `fixed left-0 top-0 transition-transform duration-200 ${
                  isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }`
          }
        `}
      >
        {/* BRAND */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.06] px-5">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Shield
                size={19}
                className="text-white"
              />
            </div>

            <div>
              <div className="text-[15px] font-bold tracking-tight text-white">
                Disaster<span className="text-blue-500">IQ</span>
              </div>

              <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Operations Center
              </div>
            </div>
          </NavLink>

          {!desktop && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="mb-7"
            >
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                {section.title}
              </p>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                        group
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-[13px]
                        font-medium
                        transition
                        ${
                          isActive
                            ? "bg-blue-500/[0.10] text-blue-400"
                            : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                        }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={17}
                            strokeWidth={
                              isActive ? 2.2 : 1.8
                            }
                            className={
                              isActive
                                ? "text-blue-400"
                                : "text-slate-600 group-hover:text-slate-400"
                            }
                          />

                          <span>{item.name}</span>

                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="shrink-0 border-t border-white/[0.06] p-3">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-[13px]
              ${
                isActive
                  ? "bg-white/[0.05] text-white"
                  : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
              }
              `
            }
          >
            <Settings size={17} />
            Settings
          </NavLink>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-500/[0.05] px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />

            <div>
              <p className="text-[11px] font-medium text-emerald-400">
                System operational
              </p>

              <p className="text-[9px] text-slate-600">
                All services running
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;