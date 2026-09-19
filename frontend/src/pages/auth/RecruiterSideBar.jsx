import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RecruiterSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden md:flex w-64 bg-slate-950 text-white flex-col fixed left-0 top-0 bottom-0 z-50">

      {/* ================= BRAND ================= */}
      <div className="px-6 py-7 border-b border-slate-800">
        <button
          onClick={() => navigate("/recruiter/dashboard")}
          className="text-xl font-bold"
        >
          AI<span className="text-blue-500">Powered</span>Job
        </button>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {/* Dashboard */}
        <button
          onClick={() => navigate("/recruiter/dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
            isActive("/recruiter/dashboard")
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>▦</span>
          Dashboard
        </button>

        {/* Post Job */}
        <button
          onClick={() => navigate("/recruiter/create-job")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
            isActive("/recruiter/create-job")
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>＋</span>
          Post a Job
        </button>

        {/* Manage Jobs */}
        <button
          onClick={() => navigate("/recruiter/manage-jobs")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
            isActive("/recruiter/manage-jobs")
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>▤</span>
          Manage Jobs
        </button>

        {/* Applicants */}
        <button
          onClick={() => navigate("/recruiter/applicants")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
            isActive("/recruiter/applicants")
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>♙</span>
          Applicants
        </button>

        {/* Interviews */}
        <button
          onClick={() => navigate("/recruiter/interviews")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
            isActive("/recruiter/interviews")
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>◷</span>
          Interviews
        </button>

        {/* Company Profile */}
        <button
          onClick={() => navigate("/recruiter/company-profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
            isActive("/recruiter/company-profile")
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <span>◯</span>
          Company Profile
        </button>

      </nav>

      {/* ================= LOGOUT ================= */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white transition"
        >
          ⇥ Logout
        </button>
      </div>

    </aside>
  );
}

export default RecruiterSideBar;