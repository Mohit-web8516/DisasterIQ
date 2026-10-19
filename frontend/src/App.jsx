import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Reports from "./pages/Reports";
import Resources from "./pages/Resources";
import Analytics from "./pages/Analytics";
import Map from "./pages/Map";
import Settings from "./pages/Settings";

function Landing() {
  return (
    <div className="min-h-screen bg-[#060a12] text-white">
      {/* HEADER */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <span className="text-sm font-bold">DI</span>
            </div>

            <div>
              <p className="text-sm font-bold">
                Disaster<span className="text-blue-500">IQ</span>
              </p>

              <p className="text-[8px] uppercase tracking-[0.2em] text-slate-600">
                Disaster Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-500">
                System operational
              </span>
            </div>

            <Link
              to="/dashboard"
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Command Center
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                  AI-Powered Emergency Intelligence
                </span>
              </div>

              <h1 className="mt-7 max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Turn disaster data into{" "}
                <span className="text-blue-500">
                  decisive action.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                DisasterIQ brings incidents, risk signals, emergency
                resources and field reports into one intelligent
                command center for faster disaster response.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
                >
                  Enter Command Center
                  <span className="ml-2">→</span>
                </Link>

                <Link
                  to="/map"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white"
                >
                  Explore Live Map
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                <span className="text-xs text-slate-500">
                  ● Real-time monitoring
                </span>

                <span className="text-xs text-slate-500">
                  ● AI-assisted analysis
                </span>

                <span className="text-xs text-slate-500">
                  ● Response coordination
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c121e] shadow-2xl">
                {/* Preview header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-blue-400">
                      Emergency Operations
                    </p>

                    <h2 className="mt-1 text-lg font-semibold">
                      Command Center
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    LIVE
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/[0.06] bg-[#111927] p-4">
                    <p className="text-2xl font-bold text-red-400">
                      12
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Critical
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-[#111927] p-4">
                    <p className="text-2xl font-bold text-orange-400">
                      47
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Active
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-[#111927] p-4">
                    <p className="text-2xl font-bold text-blue-400">
                      18
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Teams
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-[#111927] p-4">
                    <p className="text-2xl font-bold text-emerald-400">
                      31
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Deployed
                    </p>
                  </div>
                </div>

                {/* MAP PREVIEW */}
                <div className="mx-5 h-56 overflow-hidden rounded-xl border border-white/[0.06] bg-[#101b29]">
                  <div className="relative h-full">
                    {/* roads */}
                    <div className="absolute left-[-10%] top-[45%] h-px w-[120%] rotate-[-12deg] bg-slate-600/50" />
                    <div className="absolute left-[-10%] top-[65%] h-px w-[120%] rotate-[8deg] bg-slate-600/40" />
                    <div className="absolute left-[50%] top-[-20%] h-[140%] w-px rotate-[20deg] bg-slate-600/40" />

                    {/* incidents */}
                    <div className="absolute left-[25%] top-[32%] flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15">
                      <span className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,.7)]" />
                    </div>

                    <div className="absolute left-[62%] top-[28%] flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/15">
                      <span className="h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,.7)]" />
                    </div>

                    <div className="absolute left-[48%] top-[67%] flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    </div>

                    <div className="absolute bottom-3 left-3 rounded-lg border border-white/[0.07] bg-[#080d17]/90 px-3 py-2">
                      <p className="text-[9px] text-slate-500">
                        ACTIVE INCIDENTS
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        47
                      </p>
                    </div>
                  </div>
                </div>

                {/* INCIDENTS */}
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">
                        Priority Incidents
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Requiring immediate attention
                      </p>
                    </div>

                    <span className="rounded-full bg-red-500/10 px-2 py-1 text-[9px] font-semibold text-red-400">
                      2 CRITICAL
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          Flooded Residential Area
                        </p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          Sector 14, Noida
                        </p>
                      </div>

                      <span className="text-[9px] font-bold text-red-400">
                        CRITICAL
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          River Water Level Rising
                        </p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          Yamuna Bank
                        </p>
                      </div>

                      <span className="text-[9px] font-bold text-red-400">
                        CRITICAL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 sm:grid-cols-4">
            {[
              ["01", "Detect", "Identify emerging incidents"],
              ["02", "Understand", "Combine signals and reports"],
              ["03", "Prioritize", "Surface critical situations"],
              ["04", "Coordinate", "Support response teams"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="border-r border-white/[0.06] px-5 py-8 last:border-r-0 sm:px-8"
              >
                <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500">
                  {number}
                </p>

                <h3 className="mt-2 text-sm font-semibold">
                  {title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-[900px] px-5 py-20 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            Disaster response, connected
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            One operational picture.
            <br />
            Faster decisions.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
            Monitor incidents, understand risk and coordinate
            emergency response from a single command center.
          </p>

          <Link
            to="/dashboard"
            className="mt-7 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Open Command Center →
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.06]">
          <div className="mx-auto flex max-w-[1400px] justify-between px-5 py-6 sm:px-8 lg:px-10">
            <p className="text-[10px] text-slate-700">
              © 2026 DisasterIQ
            </p>

            <p className="text-[10px] text-slate-700">
              AI-assisted disaster intelligence & response
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/incidents"
          element={
            <DashboardLayout>
              <Incidents />
            </DashboardLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          }
        />

        <Route
          path="/resources"
          element={
            <DashboardLayout>
              <Resources />
            </DashboardLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />

        <Route
          path="/map"
          element={
            <DashboardLayout>
              <Map />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;