import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b14] text-slate-100">
      {/* Desktop layout:
          Sidebar = real grid column
          Main = real grid column
      */}
      <div className="min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* SIDEBAR COLUMN */}
        <div className="hidden lg:block">
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            desktop
          />
        </div>

        {/* MAIN APPLICATION */}
        <div className="min-w-0 overflow-x-hidden">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1500px]">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className="lg:hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;