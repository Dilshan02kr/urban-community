import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  Building2,
  Truck,
  LogOut,
} from "lucide-react";
import { removeSession } from "@/utils/session";

const ADMIN_NAV = [
  {
    label: "Dashboard",
    to: "/admin",
    end: true,
    icon: LayoutDashboard,
  },
  {
    label: "Recycling Centers",
    to: "/admin/recycling-centers",
    end: false,
    icon: Building2,
  },
  {
    label: "Pickup Requests",
    to: "/admin/pickup-requests",
    end: false,
    icon: Truck,
  },
];

function navLinkClass({ isActive }) {
  return [
    "text-sm font-medium transition",
    isActive ? "text-indigo-400" : "text-slate-400 hover:text-indigo-300",
  ].join(" ");
}

export default function AdminDashboardLayout() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await removeSession("accessToken");
    await removeSession("adminUser");
    setOpen(false);
    navigate("/admin/login");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-200">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: [
              "radial-gradient(circle at top right, rgba(99,102,241,0.15), transparent 40%)",
              "radial-gradient(circle at bottom left, rgba(139,92,246,0.1), transparent 35%)",
            ].join(","),
          }}
        />
      </div>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/80 backdrop-blur-xl"
        aria-label="Admin dashboard"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link
            to="/admin"
            className="flex min-w-0 shrink-0 items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xl shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold tracking-wide text-white">
                Admin Panel
              </p>
              <p className="truncate text-xs text-slate-500">
                Urban Community Management
              </p>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex lg:gap-6">
            {ADMIN_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                <span className="flex items-center gap-1.5">
                  <item.icon size={14} />
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 shadow-sm transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300 lg:inline-flex items-center gap-1.5"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              Log Out
            </button>
            <button
              type="button"
              className="inline-flex rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div
            id={menuId}
            className="border-t border-white/5 bg-slate-900/95 px-6 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {ADMIN_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      [
                        "block rounded-lg px-2 py-2.5 text-sm font-medium transition",
                        isActive
                          ? "bg-indigo-500/10 text-indigo-300"
                          : "text-slate-400 hover:bg-white/5 hover:text-indigo-300",
                      ].join(" ")
                    }
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon size={14} />
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2.5 text-left text-sm font-semibold text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Urban Community — Admin Portal
      </footer>
    </div>
  );
}
