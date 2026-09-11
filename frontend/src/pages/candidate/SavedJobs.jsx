import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../auth/SideBar";

function SavedJobs() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // Temporary data
  // Later this will come from your backend
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: "Frontend React Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Delhi, India",
      type: "Full Time",
      salary: "₹6 - ₹10 LPA",
      savedDate: "10 Sep 2026",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Innovate Technologies",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "₹8 - ₹14 LPA",
      savedDate: "08 Sep 2026",
    },
    {
      id: 3,
      title: "Node.js Developer",
      company: "CodeCraft Solutions",
      location: "Remote",
      type: "Remote",
      salary: "₹7 - ₹12 LPA",
      savedDate: "05 Sep 2026",
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Digital Works",
      location: "Mumbai, India",
      type: "Full Time",
      salary: "₹9 - ₹15 LPA",
      savedDate: "02 Sep 2026",
    },
  ]);

  // ================= FILTER JOBS =================
  const filteredJobs = savedJobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.location.toLowerCase().includes(searchText)
    );
  });

  // ================= REMOVE SAVED JOB =================
  const removeSavedJob = (id) => {
    setSavedJobs((prevJobs) =>
      prevJobs.filter((job) => job.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <SideBar />

      {/* ================= PAGE CONTENT ================= */}
      <div className="md:ml-64 min-h-screen">

        {/* ================= HEADER ================= */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-10 py-5">

          <div className="max-w-7xl mx-auto">

            <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
              CANDIDATE
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Saved Jobs
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Jobs you've saved for later.
            </p>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">

          {/* ================= TOP CARD ================= */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-8 mb-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Your Saved Jobs
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {savedJobs.length}{" "}
                  {savedJobs.length === 1 ? "job" : "jobs"} saved
                </p>

              </div>

              {/* Search */}
              <div className="w-full md:w-80">

                <input
                  type="text"
                  placeholder="Search saved jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

          </section>

          {/* ================= JOBS ================= */}
          {filteredJobs.length > 0 ? (

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {filteredJobs.map((job) => (

                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition"
                >

                  {/* ================= JOB HEADER ================= */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-4 min-w-0">

                      {/* Company Icon */}
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                        {job.company.charAt(0)}
                      </div>

                      <div className="min-w-0">

                        <h2 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h2>

                        <p className="text-sm font-medium text-blue-600 mt-1">
                          {job.company}
                        </p>

                      </div>

                    </div>

                    {/* ================= REMOVE BOOKMARK ================= */}
                    <button
                      type="button"
                      onClick={() => removeSavedJob(job.id)}
                      title="Remove from saved jobs"
                      className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 hover:bg-red-50 hover:text-red-600 transition text-lg shrink-0"
                    >
                      ★
                    </button>

                  </div>

                  {/* ================= JOB DETAILS ================= */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">

                    <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                      📍 {job.location}
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                      💼 {job.type}
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium">
                      💰 {job.salary}
                    </span>

                  </div>

                  {/* ================= BOTTOM ================= */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5 border-t border-slate-100">

                    <p className="text-xs text-slate-400">
                      Saved on {job.savedDate}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">

                      {/* View Job */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/candidate/jobs/${job.id}`)
                        }
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition"
                      >
                        View Job
                      </button>

                      {/* Apply */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/candidate/jobs/${job.id}/apply`
                          )
                        }
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Apply Now
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </section>

          ) : (

            /* ================= EMPTY STATE ================= */
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm py-20 px-6 text-center">

              <div className="text-5xl mb-4">
                🔖
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {search ? "No matching jobs" : "No saved jobs"}
              </h2>

              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">

                {search
                  ? "Try searching with a different job title, company or location."
                  : "Save interesting jobs while browsing and come back to them when you're ready."}

              </p>

              {search ? (

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 px-5 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-700 transition"
                >
                  Clear Search
                </button>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    navigate("/candidate/jobs")
                  }
                  className="mt-6 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Find Jobs
                </button>

              )}

            </section>

          )}

        </main>

      </div>

    </div>
  );
}

export default SavedJobs;
