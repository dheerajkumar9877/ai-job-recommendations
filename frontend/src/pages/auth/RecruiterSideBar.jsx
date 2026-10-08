import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Building2,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

function RecruiterSideBar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const getUserFromStorage = () => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "{}"
      );
    } catch {
      return {};
    }
  };

  const [user, setUser] = useState(
    getUserFromStorage()
  );

  // =========================================================
  // UPDATE SIDEBAR WHEN PROFILE IS SAVED
  // =========================================================

  useEffect(() => {
    const handleProfileUpdated = (event) => {
      const storedUser = getUserFromStorage();

      const updatedUser = {
        ...storedUser,
        name:
          event.detail?.name ||
          storedUser.name ||
          "Recruiter",
        profile_img:
          event.detail?.profile_img ||
          storedUser.profile_img ||
          "",
      };

      setUser(updatedUser);
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdated
      );
    };
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const navigation = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Post a Job",
      path: "/recruiter/create-job",
      icon: PlusCircle,
    },
    {
      name: "Manage Jobs",
      path: "/recruiter/manage-jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applicants",
      path: "/recruiter/applicants",
      icon: Users,
    },
    {
      name: "Interviews",
      path: "/recruiter/interviews",
      icon: CalendarDays,
    },
    {
      name: "Company Profile",
      path: "/recruiter/profile",
      icon: Building2,
    },
  ];

  // =========================================================
  // SIDEBAR
  // =========================================================

  const SidebarContent = () => (
    <div className="flex h-full flex-col">

      {/* LOGO */}
      <div className="flex h-20 items-center border-b border-gray-200 px-6">
        <button
          onClick={() =>
            navigate("/recruiter/dashboard")
          }
          className="text-left"
        >
          <h1 className="text-xl font-bold text-gray-900">
            AI
            <span className="text-emerald-600">
              Powered
            </span>
            Job
          </h1>

          <p className="text-xs text-gray-500">
            Recruiter Portal
          </p>
        </button>

        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* USER */}
      <div className="border-b border-gray-200 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-emerald-600">

            {user.profile_img ? (
              <img
                src={user.profile_img}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={22} />
            )}

          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name || "Recruiter"}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.email || "Recruiter Account"}
            </p>
          </div>

        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* LOGOUT */}
      <div className="border-t border-gray-200 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-bold text-gray-900">
          AI
          <span className="text-emerald-600">
            Powered
          </span>
          Job
        </h1>

        <div className="h-9 w-9 overflow-hidden rounded-full bg-emerald-100">

          {user.profile_img ? (
            <img
              src={user.profile_img}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-emerald-600">
              <User size={18} />
            </div>
          )}

        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-64 border-r border-gray-200 bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="relative h-full w-72 bg-white shadow-xl">
            <SidebarContent />
          </aside>

        </div>
      )}
    </>
  );
}

export default RecruiterSideBar;