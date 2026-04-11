import { Earth, Home, List, Mail, User } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { label: "Event Dashboard", path: ROUTES.ORGANIZATION_DASHBOARD, icon: <Home /> },
    { label: "My Events", path: ROUTES.ORGANIZATION_EVENTS, icon: <List /> },
    { label: "Explore Events", path: ROUTES.ORGANIZATION_EXPLORE_EVENTS, icon: <Earth /> },
    { label: "Requests", path: ROUTES.ORGANIZATION_REQUESTS, icon: <Mail /> },
    { label: "Profile", path: ROUTES.ORGANIZATION_PROFILE, icon: <User /> },
  ];
  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 hidden md:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            UC
          </div>
          <span className="text-xl font-bold tracking-tight">Org Panel</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              className={`w-full flex flex-row text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-inner"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
