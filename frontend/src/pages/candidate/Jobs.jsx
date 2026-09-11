import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../auth/SideBar";

function Jobs() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);

  // Temporary jobs
  // Later this data will come from your backend
  const jobs = [
    {
      id: 1,
      title: "Frontend React Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Delhi, India",
      type: "Full Time",
      salary: "₹6 - ₹10 LPA",
      experience: "0 - 2 years",
      skills: ["React", "JavaScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Innovate Technologies",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "₹8 - ₹14 LPA",
      experience: "1 - 3 years",
      skills: ["React", "Node.js", "MySQL"],
    },
    {
      id: 3,
      title: "Node.js Developer",
      company: "CodeCraft Solutions",
      location: "Remote",
      type: "Remote",
      salary: "₹7 - ₹12 LPA",
      experience: "0 - 2 years",
      skills: ["Node.js", "Express", "MySQL"],
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Digital Works",
      location: "Mumbai, India",
      type: "Full Time",
      salary: "₹9 - ₹15 LPA",
      experience: "2 - 4 years",
      skills: ["JavaScript", "Node.js", "REST API"],
    },
    {
      id: 5,
      title: "Junior React Developer",
      company: "WebTech India",
      location: "Pune, India",
      type: "Internship",
      salary: "₹25K - ₹40K / month",
      experience: "Fresher",
      skills: ["React", "CSS", "JavaScript"],
    },
    {
      id: 6,
      title: "Backend Developer",
      company: "Cloud Systems",
      location: "Hyderabad, India",
      type: "Full Time",
      salary: "₹7 - ₹13 LPA",
      experience: "1 - 3 years",
      skills: ["Node.js", "Express", "SQL"],
    },
  ];

  // ================= FILTER JOBS =================
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const locationMatch =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const typeMatch =
      jobType === "" || job.type === jobType;

    return searchMatch && locationMatch && typeMatch;
  });

  // ================= SAVE JOB =================
  const toggleSave = (id) => {
    setSavedJobs((prevSavedJobs) => {
      if (prevSavedJobs.includes(id)) {
        return prevSavedJobs.filter((jobId) => jobId !== id);
      }

      return [...prevSavedJobs, id];
    });
  };

  // ================= CLEAR FILTERS =================
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
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
              JOB SEARCH
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Find Jobs
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Discover opportunities that match your skills and career goals.
            </p>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">

          {/* ================= SEARCH ================= */}
          <section className="bg-slate-900 rounded-2xl p-5 sm:p-6 md:p-8 mb-8">

            <div className="mb-5">

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Find your next opportunity
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Search jobs based on your skills and preferences.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Search */}
              <input
                type="text"
                placeholder="Job title, company or skill"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400"
              />

              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400"
              />

              {/* Job Type */}
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-400"
              >

                <option value="">
                  All Job Types
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="Internship">
                  Internship
                </option>

              </select>

            </div>

            {/* Clear Filters */}
            {(search || location || jobType) && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm text-blue-300 hover:text-white transition"
              >
                Clear filters
              </button>
            )}

          </section>

          {/* ================= RESULTS HEADER ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Available Jobs
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"} found
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/candidate/recommendations")
              }
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 text-left sm:text-right"
            >
              View AI Recommendations →
            </button>

          </div>

          {/* ================= JOBS ================= */}
          {filteredJobs.length > 0 ? (

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

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

                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h3>

                        <p className="text-sm font-medium text-blue-600 mt-1">
                          {job.company}
                        </p>

                      </div>

                    </div>

                    {/* Save Button */}
                    <button
                      type="button"
                      onClick={() => toggleSave(job.id)}
                      className={`w-10 h-10 rounded-lg text-lg transition shrink-0 ${
                        savedJobs.includes(job.id)
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                      title={
                        savedJobs.includes(job.id)
                          ? "Remove saved job"
                          : "Save job"
                      }
                    >
                      {savedJobs.includes(job.id) ? "★" : "☆"}
                    </button>

                  </div>

                  {/* ================= JOB DETAILS ================= */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs">
                      📍 {job.location}
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs">
                      💼 {job.type}
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs">
                      💰 {job.salary}
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs">
                      👤 {job.experience}
                    </span>

                  </div>

                  {/* ================= SKILLS ================= */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                  {/* ================= ACTIONS ================= */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 pt-5 border-t border-slate-100">

                    <span className="text-xs text-slate-400">
                      Posted recently
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/candidate/jobs/${job.id}`)
                      }
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      View Job
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* ================= EMPTY STATE ================= */
            <div className="bg-white rounded-2xl border border-slate-200 text-center py-20 px-6">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                No jobs found
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default Jobs;
