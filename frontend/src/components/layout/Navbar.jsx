import {
  Bell,
  Menu,
  ShieldCheck,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-[1000] h-[72px] border-b border-white/[0.06] bg-[#090d17]/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
              Emergency Operations
            </p>

            <p className="mt-0.5 text-sm font-semibold text-slate-200">
              Disaster Command Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Status */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />

            <span className="text-xs font-medium text-slate-500">
              System online
            </span>
          </div>

          <div className="h-5 w-px bg-white/[0.07]" />

          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-slate-200"
          >
            <Bell size={18} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
          </button>

          {/* User */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-300">
                Response Team
              </p>

              <p className="text-[10px] text-slate-600">
                Administrator
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/15 ring-1 ring-blue-500/20">
              <ShieldCheck size={17} className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;