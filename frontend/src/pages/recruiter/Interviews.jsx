import React, { useState } from "react";

function Interviews() {
  const [filter, setFilter] = useState("All");

  const interviews = [
    {
      id: 1,
      candidate: "Aman Sharma",
      position: "React Developer",
      date: "12 Sep 2026",
      time: "10:00 AM",
      type: "Video Interview",
      status: "Upcoming",
      interviewer: "You",
    },
    {
      id: 2,
      candidate: "Priya Singh",
      position: "Full Stack Developer",
      date: "13 Sep 2026",
      time: "11:30 AM",
      type: "Video Interview",
      status: "Upcoming",
      interviewer: "You",
    },
    {
      id: 3,
      candidate: "Rahul Kumar",
      position: "Node.js Developer",
      date: "14 Sep 2026",
      time: "02:00 PM",
      type: "Technical Interview",
      status: "Upcoming",
      interviewer: "You",
    },
    {
      id: 4,
      candidate: "Neha Verma",
      position: "UI Developer",
      date: "08 Sep 2026",
      time: "03:30 PM",
      type: "HR Interview",
      status: "Completed",
      interviewer: "You",
    },
    {
      id: 5,
      candidate: "Vikas Gupta",
      position: "Backend Developer",
      date: "06 Sep 2026",
      time: "12:00 PM",
      type: "Technical Interview",
      status: "Cancelled",
      interviewer: "You",
    },
  ];

  const filteredInterviews =
    filter === "All"
      ? interviews
      : interviews.filter((item) => item.status === filter);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">

        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
            RECRUITER
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Interviews
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Schedule and manage candidate interviews.
          </p>
        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Upcoming */}
          <div className="bg-white rounded-2xl border border-slate-200
            shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Upcoming
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              3
            </h2>

            <p className="text-xs text-blue-600 mt-2">
              Scheduled interviews
            </p>

          </div>


          {/* Today */}
          <div className="bg-white rounded-2xl border border-slate-200
            shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Today
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              1
            </h2>

            <p className="text-xs text-green-600 mt-2">
              Interview scheduled
            </p>

          </div>


          {/* Completed */}
          <div className="bg-white rounded-2xl border border-slate-200
            shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Completed
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              8
            </h2>

            <p className="text-xs text-slate-500 mt-2">
              This month
            </p>

          </div>


          {/* Cancelled */}
          <div className="bg-white rounded-2xl border border-slate-200
            shadow-sm p-6">

            <p className="text-sm font-medium text-slate-500">
              Cancelled
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              2
            </h2>

            <p className="text-xs text-red-500 mt-2">
              This month
            </p>

          </div>

        </section>


        {/* ================= INTERVIEWS ================= */}
        <section className="bg-white rounded-2xl border border-slate-200
          shadow-sm">

          {/* Header */}
          <div className="px-6 md:px-8 py-5 border-b border-slate-200">

            <div className="flex flex-col md:flex-row
              md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Interview Schedule
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  View and manage your candidate interviews.
                </p>
              </div>


              {/* Filter */}
              <div className="flex flex-wrap gap-2">

                {["All", "Upcoming", "Completed", "Cancelled"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold
                        transition
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

          </div>


          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden p-4 space-y-4">

            {filteredInterviews.map((interview) => (

              <div
                key={interview.id}
                className="border border-slate-200 rounded-xl p-4"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-11 h-11 rounded-full
                    bg-blue-100 text-blue-700
                    flex items-center justify-center
                    font-bold"
                  >
                    {interview.candidate.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {interview.candidate}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {interview.position}
                    </p>
                  </div>

                </div>


                <div className="mt-4 space-y-2 text-sm">

                  <p className="text-slate-600">
                    📅 {interview.date}
                  </p>

                  <p className="text-slate-600">
                    🕐 {interview.time}
                  </p>

                  <p className="text-slate-600">
                    💻 {interview.type}
                  </p>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      interview.status === "Upcoming"
                        ? "bg-blue-50 text-blue-700"
                        : interview.status === "Completed"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {interview.status}
                  </span>

                  <button
                    className="text-sm font-semibold text-blue-600
                    hover:text-blue-700"
                  >
                    View
                  </button>

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
                    Candidate
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Position
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Date & Time
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Interview Type
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

                {filteredInterviews.map((interview) => (

                  <tr
                    key={interview.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Candidate */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-10 h-10 rounded-full
                          bg-blue-100 text-blue-700
                          flex items-center justify-center
                          font-bold"
                        >
                          {interview.candidate.charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {interview.candidate}
                          </p>

                          <p className="text-xs text-slate-500">
                            {interview.interviewer}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Position */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-700">
                        {interview.position}
                      </span>

                    </td>


                    {/* Date */}
                    <td className="px-6 py-5">

                      <p className="text-sm font-medium text-slate-800">
                        {interview.date}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {interview.time}
                      </p>

                    </td>


                    {/* Type */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-600">
                        {interview.type}
                      </span>

                    </td>


                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full
                        text-xs font-semibold
                        ${
                          interview.status === "Upcoming"
                            ? "bg-blue-50 text-blue-700"
                            : interview.status === "Completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {interview.status}
                      </span>

                    </td>


                    {/* Action */}
                    <td className="px-6 py-5">

                      <button
                        className="px-4 py-2 rounded-lg
                        border border-slate-300
                        text-sm font-semibold text-slate-700
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


          {/* Empty State */}
          {filteredInterviews.length === 0 && (
            <div className="py-16 text-center">

              <div className="text-4xl mb-3">
                📅
              </div>

              <h3 className="font-semibold text-slate-900">
                No interviews found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                There are no interviews with this status.
              </p>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default Interviews;