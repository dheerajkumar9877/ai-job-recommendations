import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/candidate/dashboard",
      icon: "▦",
    },
    {
      name: "Find Jobs",
      path: "/candidate/jobs",
      icon: "⌕",
    },
    {
      name: "Recommendations",
      path: "/candidate/recommendations",
      icon: "✦",
    },
    {
      name: "Applications",
      path: "/candidate/applications",
      icon: "▤",
    },
    {
      name: "Saved Jobs",
      path: "/candidate/saved-jobs",
      icon: "♡",
    },
    {
      name: "Profile",
      path: "/candidate/profile",
      icon: "◯",
    },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-64 bg-slate-950 text-white flex-col">

      {/* ================= BRAND ================= */}
      <div className="px-6 py-7 border-b border-slate-800">
        <h2 className="text-xl font-bold">
          AI<span className="text-blue-500">Powered</span>Job
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Candidate Portal
        </p>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="w-6 text-center text-lg">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          );
        })}

      </nav>

      {/* ================= LOGOUT ================= */}
      <div className="p-4 border-t border-slate-800">

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white transition"
        >
          ⇥ Logout
        </button>

      </div>

    </aside>
  );
}

export default SideBar;