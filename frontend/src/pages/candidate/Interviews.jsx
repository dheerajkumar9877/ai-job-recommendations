import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../auth/SideBar";

function Interviews() {
  const navigate = useNavigate();

  const interviews = [
    {
      id: 1,
      company: "Tech Solutions Pvt Ltd",
      role: "Frontend React Developer",
      date: "18 September 2026",
      time: "10:30 AM",
      type: "Video Interview",
      status: "Upcoming",
      interviewer: "HR Team",
    },
    {
      id: 2,
      company: "Innovate Technologies",
      role: "Full Stack Developer",
      date: "21 September 2026",
      time: "2:00 PM",
      type: "Technical Interview",
      status: "Upcoming",
      interviewer: "Technical Team",
    },
    {
      id: 3,
      company: "Digital Solutions",
      role: "Node.js Developer",
      date: "10 September 2026",
      time: "11:00 AM",
      type: "HR Interview",
      status: "Completed",
      interviewer: "Recruitment Team",
    },
  ];

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "Upcoming"
  );

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <SideBar />

      {/* ================= PAGE CONTENT ================= */}
      <div className="md:ml-64 min-h-screen">

        {/* ================= HEADER ================= */}
        <header className="bg-white border-b border-slate-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-5">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* Heading */}
              <div>

                <p className="text-xs sm:text-sm font-semibold tracking-widest text-blue-600">
                  CANDIDATE
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Interviews
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage your upcoming and completed interviews.
                </p>

              </div>

              {/* Dashboard Button */}
              <button
                type="button"
                onClick={() => navigate("/candidate/dashboard")}
                className="w-fit px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition"
              >
                ← Dashboard
              </button>

            </div>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

            {/* Total Interviews */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Interviews
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {interviews.length}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                All scheduled interviews
              </p>

            </div>

            {/* Upcoming */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Upcoming
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {upcomingInterviews.length}
              </h2>

              <p className="text-xs text-blue-600 mt-2">
                Interviews to attend
              </p>

            </div>

            {/* Completed */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {completedInterviews.length}
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Previously completed
              </p>

            </div>

          </section>

          {/* ================= UPCOMING INTERVIEWS ================= */}
          <section className="mb-10">

            {/* Section Header */}
            <div className="mb-5">

              <h2 className="text-xl font-bold text-slate-900">
                Upcoming Interviews
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Interviews you need to attend.
              </p>

            </div>

            {/* Interview Cards */}
            <div className="space-y-4">

              {upcomingInterviews.map((interview) => (

                <div
                  key={interview.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                    {/* ================= COMPANY ================= */}
                    <div className="flex items-start gap-4 min-w-0">

                      <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold shrink-0">
                        {interview.company.charAt(0)}
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-lg font-bold text-slate-900">
                          {interview.role}
                        </h3>

                        <p className="text-blue-600 font-medium mt-1">
                          {interview.company}
                        </p>

                        <p className="text-sm text-slate-500 mt-2">
                          Interviewer: {interview.interviewer}
                        </p>

                      </div>

                    </div>

                    {/* ================= DATE & TIME ================= */}
                    <div className="flex flex-wrap gap-3">

                      <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 min-w-[150px]">

                        <p className="text-xs text-slate-500">
                          DATE
                        </p>

                        <p className="font-semibold text-slate-800 mt-1">
                          {interview.date}
                        </p>

                      </div>

                      <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 min-w-[120px]">

                        <p className="text-xs text-slate-500">
                          TIME
                        </p>

                        <p className="font-semibold text-slate-800 mt-1">
                          {interview.time}
                        </p>

                      </div>

                    </div>

                    {/* ================= ACTIONS ================= */}
                    <div className="flex flex-col gap-2 w-full xl:w-auto">

                      <span className="px-4 py-2 rounded-lg text-center bg-blue-50 text-blue-600 text-sm font-semibold">
                        {interview.type}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/candidate/interviews/${interview.id}`)
                        }
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      >
                        Join Interview
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/candidate/interviews/${interview.id}`)
                        }
                        className="px-5 py-2 text-sm text-slate-500 hover:text-slate-700 transition"
                      >
                        View Details
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* ================= INTERVIEW HISTORY ================= */}
          <section>

            {/* Section Header */}
            <div className="mb-5">

              <h2 className="text-xl font-bold text-slate-900">
                Interview History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your previously completed interviews.
              </p>

            </div>

            {/* History Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">

                  {/* Table Header */}
                  <thead className="bg-slate-50 border-b border-slate-200">

                    <tr>

                      <th className="text-left px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        Position
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        Company
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        Date
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        Type
                      </th>

                      <th className="text-left px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        Status
                      </th>

                    </tr>

                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-100">

                    {completedInterviews.map((interview) => (

                      <tr
                        key={interview.id}
                        className="hover:bg-slate-50 transition"
                      >

                        <td className="px-6 py-4">

                          <p className="font-semibold text-slate-900">
                            {interview.role}
                          </p>

                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {interview.company}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {interview.date}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {interview.type}
                        </td>

                        <td className="px-6 py-4">

                          <span className="inline-flex px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                            Completed
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              {/* Empty History */}
              {completedInterviews.length === 0 && (
                <div className="py-12 text-center">

                  <p className="text-slate-500">
                    No completed interviews yet.
                  </p>

                </div>
              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Interviews;
