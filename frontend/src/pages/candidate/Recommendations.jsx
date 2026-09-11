import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../auth/SideBar";

function Recommendations() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);

  // Temporary data
  // Later this will come from your AI recommendation API
  const recommendations = [
    {
      id: 1,
      title: "Frontend React Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Delhi, India",
      type: "Full Time",
      salary: "₹6 - ₹10 LPA",
      match: 95,
      skills: ["React", "JavaScript", "Tailwind CSS"],
      reason:
        "Strong match with your React and JavaScript skills.",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Innovate Technologies",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "₹8 - ₹14 LPA",
      match: 91,
      skills: ["React", "Node.js", "MySQL"],
      reason:
        "Your full-stack experience matches this role.",
    },
    {
      id: 3,
      title: "Node.js Developer",
      company: "CodeCraft Solutions",
      location: "Remote",
      type: "Remote",
      salary: "₹7 - ₹12 LPA",
      match: 88,
      skills: ["Node.js", "Express", "MySQL"],
      reason:
        "Recommended based on your backend skills.",
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Digital Works",
      location: "Mumbai, India",
      type: "Full Time",
      salary: "₹9 - ₹15 LPA",
      match: 84,
      skills: ["JavaScript", "Node.js", "REST API"],
      reason:
        "Good match for your software development profile.",
    },
    {
      id: 5,
      title: "Junior React Developer",
      company: "WebTech India",
      location: "Pune, India",
      type: "Full Time",
      salary: "₹5 - ₹8 LPA",
      match: 81,
      skills: ["React", "CSS", "JavaScript"],
      reason:
        "Matches your frontend development interests.",
    },
    {
      id: 6,
      title: "Backend Developer",
      company: "Cloud Systems",
      location: "Hyderabad, India",
      type: "Full Time",
      salary: "₹7 - ₹13 LPA",
      match: 78,
      skills: ["Node.js", "Express", "SQL"],
      reason:
        "Your backend experience fits this position.",
    },
  ];

  // ================= SAVE JOB =================
  const toggleSave = (id) => {
    setSavedJobs((prevSavedJobs) => {
      if (prevSavedJobs.includes(id)) {
        return prevSavedJobs.filter((jobId) => jobId !== id);
      }

      return [...prevSavedJobs, id];
    });
  };

  // ================= AVERAGE MATCH =================
  const averageMatch = Math.round(
    recommendations.reduce(
      (total, job) => total + job.match,
      0
    ) / recommendations.length
  );

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
              AI POWERED
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Recommended Jobs
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Jobs selected based on your skills, profile and interests.
            </p>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">

          {/* ================= AI SUMMARY ================= */}
          <section className="bg-slate-900 rounded-2xl p-5 sm:p-6 md:p-8 text-white mb-8 relative overflow-hidden">

            {/* Decoration */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />

            <div className="relative">

              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold tracking-wider">
                ✦ AI MATCHING
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4">
                We found jobs that match your profile.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                Our recommendation system analyzes your skills,
                experience and preferences to find relevant
                opportunities.
              </p>

              {/* AI Stats */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 mt-7">

                <div>
                  <strong className="block text-2xl font-bold">
                    {recommendations.length}
                  </strong>

                  <span className="text-sm text-slate-400">
                    Recommended jobs
                  </span>
                </div>

                <div>
                  <strong className="block text-2xl font-bold">
                    {averageMatch}%
                  </strong>

                  <span className="text-sm text-slate-400">
                    Average match
                  </span>
                </div>

                <div>
                  <strong className="block text-2xl font-bold">
                    {savedJobs.length}
                  </strong>

                  <span className="text-sm text-slate-400">
                    Saved jobs
                  </span>
                </div>

              </div>

            </div>

          </section>

          {/* ================= PROFILE MATCH ================= */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Your profile match
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  92% Complete
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Complete your profile to improve AI recommendations.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/candidate/profile")
                }
                className="w-full md:w-auto px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Complete Profile
              </button>

            </div>

            {/* Progress */}
            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span className="text-xs font-medium text-slate-500">
                  Profile strength
                </span>

                <span className="text-xs font-bold text-blue-600">
                  92%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: "92%" }}
                />

              </div>

            </div>

          </section>

          {/* ================= JOB LIST ================= */}
          <section>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Top Matches
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Best opportunities for your profile.
                </p>

              </div>

              <span className="hidden sm:block text-sm text-slate-400">
                {recommendations.length} opportunities
              </span>

            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {recommendations.map((job) => (

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

                    {/* Match Score */}
                    <div className="text-right shrink-0">

                      <p className="text-2xl font-bold text-green-600">
                        {job.match}%
                      </p>

                      <p className="text-xs text-slate-400">
                        match
                      </p>

                    </div>

                  </div>

                  {/* ================= MATCH BAR ================= */}
                  <div className="mt-4">

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${job.match}%`,
                        }}
                      />

                    </div>

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

                  {/* ================= AI REASON ================= */}
                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">

                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      WHY THIS JOB?
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {job.reason}
                    </p>

                  </div>

                  {/* ================= ACTIONS ================= */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 pt-5 border-t border-slate-100">

                    {/* Save */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleSave(job.id)
                      }
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-lg border text-sm font-semibold transition ${
                        savedJobs.includes(job.id)
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {savedJobs.includes(job.id)
                        ? "★ Saved"
                        : "☆ Save"}
                    </button>

                    {/* View Job */}
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

          </section>

        </main>

      </div>

    </div>
  );
}

export default Recommendations;
