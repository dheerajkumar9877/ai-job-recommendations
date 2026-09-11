import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../auth/SideBar";

function Applications() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const [applications] = useState([
    {
      id: 1,
      job: "Frontend React Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Delhi, India",
      type: "Full Time",
      appliedDate: "10 Sep 2026",
      status: "Under Review",
    },
    {
      id: 2,
      job: "Full Stack Developer",
      company: "Innovate Technologies",
      location: "Bangalore, India",
      type: "Full Time",
      appliedDate: "07 Sep 2026",
      status: "Shortlisted",
    },
    {
      id: 3,
      job: "Node.js Developer",
      company: "CodeCraft Solutions",
      location: "Remote",
      type: "Remote",
      appliedDate: "03 Sep 2026",
      status: "Interview",
    },
    {
      id: 4,
      job: "Software Developer",
      company: "Digital Works",
      location: "Mumbai, India",
      type: "Full Time",
      appliedDate: "28 Aug 2026",
      status: "Rejected",
    },
    {
      id: 5,
      job: "Junior React Developer",
      company: "WebTech India",
      location: "Pune, India",
      type: "Full Time",
      appliedDate: "25 Aug 2026",
      status: "Under Review",
    },
  ]);

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter(
          (application) => application.status === filter
        );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-50 text-green-700 border-green-200";

      case "Interview":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "Under Review":
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
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
              My Applications
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Track all the jobs you have applied for.
            </p>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">

          {/* ================= STATISTICS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <p className="text-sm font-medium text-slate-500">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {applications.length}
              </h2>

              <p className="text-xs text-blue-600 mt-2">
                Jobs applied
              </p>

            </div>

            {/* Under Review */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <p className="text-sm font-medium text-slate-500">
                Under Review
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {
                  applications.filter(
                    (app) => app.status === "Under Review"
                  ).length
                }
              </h2>

              <p className="text-xs text-yellow-600 mt-2">
                Waiting for recruiter
              </p>

            </div>

            {/* Shortlisted */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <p className="text-sm font-medium text-slate-500">
                Shortlisted
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {
                  applications.filter(
                    (app) => app.status === "Shortlisted"
                  ).length
                }
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Good progress
              </p>

            </div>

            {/* Interviews */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <p className="text-sm font-medium text-slate-500">
                Interviews
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {
                  applications.filter(
                    (app) => app.status === "Interview"
                  ).length
                }
              </h2>

              <p className="text-xs text-purple-600 mt-2">
                Interview stage
              </p>

            </div>

          </section>

          {/* ================= APPLICATION HISTORY ================= */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header + Filters */}
            <div className="p-5 md:p-8 border-b border-slate-200">

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Application History
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Keep track of your job applications.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">

                  {[
                    "All",
                    "Under Review",
                    "Shortlisted",
                    "Interview",
                    "Rejected",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        filter === item
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

            </div>

            {/* ================= MOBILE ================= */}
            <div className="md:hidden p-4 space-y-4">

              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="border border-slate-200 rounded-xl p-5"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h3 className="font-bold text-slate-900">
                        {application.job}
                      </h3>

                      <p className="text-sm text-blue-600 mt-1">
                        {application.company}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>

                  </div>

                  <div className="mt-4 space-y-2">

                    <p className="text-sm text-slate-500">
                      📍 {application.location}
                    </p>

                    <p className="text-sm text-slate-500">
                      💼 {application.type}
                    </p>

                    <p className="text-sm text-slate-500">
                      📅 Applied: {application.appliedDate}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/jobs/${application.id}`)
                    }
                    className="w-full mt-5 py-2.5 rounded-lg border border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition"
                  >
                    View Job
                  </button>

                </div>
              ))}

            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-slate-50">

                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500">

                    <th className="px-6 py-4 font-semibold">
                      Job
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Location
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Type
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Applied
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <td className="px-6 py-5">

                        <p className="font-semibold text-slate-900">
                          {application.job}
                        </p>

                        <p className="text-sm text-blue-600 mt-1">
                          {application.company}
                        </p>

                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600">
                          {application.location}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600">
                          {application.type}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-500">
                          {application.appliedDate}
                        </span>
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/jobs/${application.id}`)
                          }
                          className="px-4 py-2 rounded-lg border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-50 transition"
                        >
                          View Job
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* ================= EMPTY STATE ================= */}
            {filteredApplications.length === 0 && (
              <div className="py-16 text-center">

                <div className="text-4xl mb-3">
                  📄
                </div>

                <h3 className="font-semibold text-slate-900">
                  No applications found
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  You don't have any applications in this category.
                </p>

              </div>
            )}

          </section>

        </main>

      </div>

    </div>
  );
}

export default Applications;
