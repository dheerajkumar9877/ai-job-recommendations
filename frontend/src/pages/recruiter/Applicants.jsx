import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterSideBar from "../auth/RecruiterSideBar";

function Applicants() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const applicants = [
    {
      id: 1,
      name: "Aman Sharma",
      email: "aman@gmail.com",
      job: "React Developer",
      experience: "2 Years",
      match: 97,
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      job: "Full Stack Developer",
      experience: "3 Years",
      match: 92,
      status: "Under Review",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      job: "Node.js Developer",
      experience: "2 Years",
      match: 87,
      status: "Interview",
    },
    {
      id: 4,
      name: "Neha Verma",
      email: "neha@gmail.com",
      job: "UI Developer",
      experience: "1 Year",
      match: 82,
      status: "Under Review",
    },
    {
      id: 5,
      name: "Arjun Mehta",
      email: "arjun@gmail.com",
      job: "Frontend Developer",
      experience: "3 Years",
      match: 78,
      status: "Rejected",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Shortlisted") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Interview") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      applicant.name.toLowerCase().includes(searchValue) ||
      applicant.email.toLowerCase().includes(searchValue) ||
      applicant.job.toLowerCase().includes(searchValue);

    const matchesJob =
      jobFilter === "All Jobs" || applicant.job === jobFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      applicant.status === statusFilter;

    return matchesSearch && matchesJob && matchesStatus;
  });

  const handlePostJob = () => {
    navigate("/recruiter/create-job");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <RecruiterSideBar />

      {/* ================= PAGE CONTENT ================= */}
      <div className="md:ml-64 min-h-screen">

        {/* ================= HEADER ================= */}
        <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
                RECRUITER
              </p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">
                Applicants
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Review and manage candidates who applied to your jobs.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button
                type="button"
                className="px-4 py-2.5 rounded-lg border
                border-slate-300 bg-white text-slate-700
                font-medium hover:bg-slate-50 transition"
              >
                Export
              </button>

              <button
                type="button"
                onClick={handlePostJob}
                className="px-5 py-2.5 rounded-lg
                bg-blue-600 text-white font-semibold
                hover:bg-blue-700 transition shadow-sm"
              >
                + Post a Job
              </button>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}
        <main className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

            {/* Total Applicants */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Applicants
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                248
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                Across all jobs
              </p>
            </div>

            {/* Under Review */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Under Review
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                86
              </h2>

              <p className="text-xs text-yellow-600 mt-2">
                Need review
              </p>
            </div>

            {/* Shortlisted */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Shortlisted
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                42
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Potential candidates
              </p>
            </div>

            {/* Interviews */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Interviews
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                18
              </h2>

              <p className="text-xs text-blue-600 mt-2">
                Scheduled interviews
              </p>
            </div>

          </section>

          {/* ================= FILTERS ================= */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">

            <div className="flex flex-col lg:flex-row gap-4">

              {/* Search */}
              <div className="flex-1">

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search applicants by name, email or job..."
                  className="w-full px-4 py-3 rounded-lg
                  border border-slate-300
                  outline-none text-slate-800
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Job Filter */}
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="px-4 py-3 rounded-lg
                border border-slate-300
                text-slate-700 outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100"
              >
                <option>All Jobs</option>
                <option>React Developer</option>
                <option>Full Stack Developer</option>
                <option>Node.js Developer</option>
                <option>UI Developer</option>
                <option>Frontend Developer</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-lg
                border border-slate-300
                text-slate-700 outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100"
              >
                <option>All Status</option>
                <option>Under Review</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Rejected</option>
              </select>

            </div>

          </section>

          {/* ================= APPLICANTS TABLE ================= */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Table Header */}
            <div className="px-6 py-5 border-b border-slate-200">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    All Applicants
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage candidates and their application status.
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {filteredApplicants.length} showing
                </span>

              </div>

            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden p-4 space-y-4">

              {filteredApplicants.map((applicant) => (

                <div
                  key={applicant.id}
                  className="border border-slate-200 rounded-xl p-5"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div
                        className="w-11 h-11 rounded-full
                        bg-blue-100 text-blue-700
                        flex items-center justify-center
                        font-bold shrink-0"
                      >
                        {applicant.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {applicant.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {applicant.email}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="mt-4">

                    <p className="text-sm font-medium text-slate-800">
                      {applicant.job}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Experience: {applicant.experience}
                    </p>

                  </div>

                  {/* Match */}
                  <div className="mt-4">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-xs font-medium text-slate-500">
                        AI Match
                      </span>

                      <span className="text-sm font-bold text-slate-800">
                        {applicant.match}%
                      </span>

                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${applicant.match}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="flex items-center justify-between mt-5">

                    <span
                      className={`inline-flex px-3 py-1.5
                      rounded-full border text-xs font-semibold
                      ${getStatusStyle(applicant.status)}`}
                    >
                      {applicant.status}
                    </span>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg
                      border border-slate-300
                      text-sm font-semibold
                      text-slate-700
                      hover:bg-slate-100 transition"
                    >
                      View
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-4
                      text-xs font-semibold text-slate-500 uppercase">
                      Applicant
                    </th>

                    <th className="text-left px-6 py-4
                      text-xs font-semibold text-slate-500 uppercase">
                      Applied For
                    </th>

                    <th className="text-left px-6 py-4
                      text-xs font-semibold text-slate-500 uppercase">
                      Experience
                    </th>

                    <th className="text-left px-6 py-4
                      text-xs font-semibold text-slate-500 uppercase">
                      AI Match
                    </th>

                    <th className="text-left px-6 py-4
                      text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="text-right px-6 py-4
                      text-xs font-semibold text-slate-500 uppercase">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredApplicants.map((applicant) => (

                    <tr
                      key={applicant.id}
                      className="hover:bg-slate-50 transition"
                    >

                      {/* Applicant */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div
                            className="w-11 h-11 rounded-full
                            bg-blue-100 text-blue-700
                            flex items-center justify-center
                            font-bold shrink-0"
                          >
                            {applicant.name.charAt(0).toUpperCase()}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {applicant.name}
                            </p>

                            <p className="text-sm text-slate-500">
                              {applicant.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Job */}
                      <td className="px-6 py-5">

                        <p className="font-medium text-slate-800">
                          {applicant.job}
                        </p>

                      </td>

                      {/* Experience */}
                      <td className="px-6 py-5 text-slate-600">
                        {applicant.experience}
                      </td>

                      {/* AI Match */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">

                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{
                                width: `${applicant.match}%`,
                              }}
                            />

                          </div>

                          <span className="font-semibold text-slate-800">
                            {applicant.match}%
                          </span>

                        </div>

                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex px-3 py-1.5
                          rounded-full border text-xs font-semibold
                          ${getStatusStyle(applicant.status)}`}
                        >
                          {applicant.status}
                        </span>

                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">

                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg
                          border border-slate-300
                          text-sm font-semibold
                          text-slate-700
                          hover:bg-slate-100 transition"
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* ================= EMPTY STATE ================= */}
            {filteredApplicants.length === 0 && (

              <div className="py-16 text-center">

                <div className="text-4xl mb-3">
                  👤
                </div>

                <h3 className="font-semibold text-slate-900">
                  No applicants found
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            )}

          </section>

        </main>

      </div>

    </div>
  );
}

export default Applicants;