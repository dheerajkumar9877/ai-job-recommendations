import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageJobs() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Temporary data
  // Later this will come from your backend
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend React Developer",
      location: "Delhi, India",
      type: "Full Time",
      applicants: 48,
      shortlisted: 12,
      date: "10 Sep 2026",
      status: "Active",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      location: "Bangalore, India",
      type: "Full Time",
      applicants: 65,
      shortlisted: 18,
      date: "08 Sep 2026",
      status: "Active",
    },
    {
      id: 3,
      title: "Node.js Developer",
      location: "Remote",
      type: "Remote",
      applicants: 32,
      shortlisted: 8,
      date: "05 Sep 2026",
      status: "Active",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      location: "Mumbai, India",
      type: "Full Time",
      applicants: 27,
      shortlisted: 6,
      date: "25 Aug 2026",
      status: "Closed",
    },
    {
      id: 5,
      title: "Software Engineering Intern",
      location: "Pune, India",
      type: "Internship",
      applicants: 0,
      shortlisted: 0,
      date: "12 Sep 2026",
      status: "Draft",
    },
  ]);

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter =
      filter === "All" || job.status === filter;

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const deleteJob = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">

        <div className="flex flex-col md:flex-row md:items-center
          md:justify-between gap-4">

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
              RECRUITER
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Manage Jobs
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create, manage and track your job postings.
            </p>
          </div>

          <button
            onClick={() => navigate("/recruiter/create-job")}
            className="px-5 py-3 rounded-lg bg-blue-600
            text-white font-semibold hover:bg-blue-700
            transition shadow-sm"
          >
            + Post a Job
          </button>

        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">


        {/* ================= STATISTICS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-4 gap-5 mb-8">

          {/* Active */}
          <div className="bg-white rounded-2xl border
            border-slate-200 shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Active Jobs
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {jobs.filter((job) => job.status === "Active").length}
            </h2>

            <p className="text-xs text-blue-600 mt-2">
              Currently hiring
            </p>

          </div>


          {/* Applicants */}
          <div className="bg-white rounded-2xl border
            border-slate-200 shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Total Applicants
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {jobs.reduce(
                (total, job) => total + job.applicants,
                0
              )}
            </h2>

            <p className="text-xs text-green-600 mt-2">
              Across all jobs
            </p>

          </div>


          {/* Shortlisted */}
          <div className="bg-white rounded-2xl border
            border-slate-200 shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Shortlisted
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {jobs.reduce(
                (total, job) => total + job.shortlisted,
                0
              )}
            </h2>

            <p className="text-xs text-purple-600 mt-2">
              Potential candidates
            </p>

          </div>


          {/* Closed */}
          <div className="bg-white rounded-2xl border
            border-slate-200 shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Closed Jobs
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {jobs.filter((job) => job.status === "Closed").length}
            </h2>

            <p className="text-xs text-slate-500 mt-2">
              Completed postings
            </p>

          </div>

        </section>


        {/* ================= JOB SECTION ================= */}
        <section className="bg-white rounded-2xl
          border border-slate-200 shadow-sm">


          {/* ================= TOP ================= */}
          <div className="p-6 md:p-8 border-b border-slate-200">

            <div className="flex flex-col lg:flex-row
              lg:items-center lg:justify-between gap-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Job Postings
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Manage all your job opportunities.
                </p>
              </div>


              {/* Search */}
              <div className="relative w-full lg:w-80">

                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg
                  border border-slate-300
                  text-slate-900 outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>


            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-6">

              {["All", "Active", "Closed", "Draft"].map(
                (item) => (

                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 rounded-lg
                      text-sm font-semibold transition
                      ${
                        filter === item
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {item}
                  </button>

                )
              )}

            </div>

          </div>


          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden p-4 space-y-4">

            {filteredJobs.map((job) => (

              <div
                key={job.id}
                className="border border-slate-200
                rounded-xl p-5"
              >

                <div className="flex items-start
                  justify-between gap-3">

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {job.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      📍 {job.location}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full
                    text-xs font-semibold
                    ${
                      job.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : job.status === "Closed"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>

                </div>


                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">
                      Applicants
                    </p>

                    <p className="font-bold text-slate-900 mt-1">
                      {job.applicants}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">
                      Shortlisted
                    </p>

                    <p className="font-bold text-slate-900 mt-1">
                      {job.shortlisted}
                    </p>
                  </div>

                </div>


                <div className="flex items-center
                  justify-between mt-5">

                  <span className="text-xs text-slate-400">
                    Posted {job.date}
                  </span>

                  <div className="flex gap-2">

                    <button
                      className="px-3 py-2 rounded-lg
                      border border-slate-300
                      text-xs font-semibold
                      hover:bg-slate-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteJob(job.id)}
                      className="px-3 py-2 rounded-lg
                      border border-red-200
                      text-red-600 text-xs font-semibold
                      hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr className="text-left text-xs uppercase
                  tracking-wider text-slate-500">

                  <th className="px-6 py-4 font-semibold">
                    Job
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Type
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Applicants
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Shortlisted
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Posted
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {filteredJobs.map((job) => (

                  <tr
                    key={job.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Job */}
                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-slate-900">
                          {job.title}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          📍 {job.location}
                        </p>

                      </div>

                    </td>


                    {/* Type */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-600">
                        {job.type}
                      </span>

                    </td>


                    {/* Applicants */}
                    <td className="px-6 py-5">

                      <span className="font-semibold text-slate-900">
                        {job.applicants}
                      </span>

                    </td>


                    {/* Shortlisted */}
                    <td className="px-6 py-5">

                      <span className="font-semibold text-slate-900">
                        {job.shortlisted}
                      </span>

                    </td>


                    {/* Date */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-500">
                        {job.date}
                      </span>

                    </td>


                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex px-3 py-1
                        rounded-full text-xs font-semibold
                        ${
                          job.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : job.status === "Closed"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {job.status}
                      </span>

                    </td>


                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <button
                          className="px-3 py-2 rounded-lg
                          border border-slate-300
                          text-xs font-semibold
                          text-slate-700
                          hover:bg-slate-100 transition"
                        >
                          View
                        </button>

                        <button
                          className="px-3 py-2 rounded-lg
                          border border-blue-200
                          text-xs font-semibold
                          text-blue-600
                          hover:bg-blue-50 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteJob(job.id)}
                          className="px-3 py-2 rounded-lg
                          border border-red-200
                          text-xs font-semibold
                          text-red-600
                          hover:bg-red-50 transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= EMPTY STATE ================= */}
          {filteredJobs.length === 0 && (

            <div className="py-16 text-center">

              <div className="text-4xl mb-3">
                💼
              </div>

              <h3 className="font-semibold text-slate-900">
                No jobs found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try changing your search or filter.
              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default ManageJobs;