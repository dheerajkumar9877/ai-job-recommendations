import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../auth/SideBar";

function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary job data
  // Later this will come from your backend using the id
  const jobs = [
    {
      id: 1,
      title: "Frontend React Developer",
      company: "Tech Solutions Pvt Ltd",
      location: "Delhi, India",
      type: "Full Time",
      salary: "₹6 - ₹10 LPA",
      experience: "0 - 2 years",
      posted: "2 days ago",
      skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
      description:
        "We are looking for a passionate Frontend React Developer to build modern and responsive web applications. You will work closely with designers and backend developers to deliver high-quality products.",
      responsibilities: [
        "Build responsive web applications using React",
        "Develop reusable and maintainable components",
        "Work with REST APIs",
        "Collaborate with backend developers and designers",
        "Optimize applications for performance",
      ],
      requirements: [
        "Good knowledge of React.js",
        "Strong JavaScript fundamentals",
        "Understanding of HTML and CSS",
        "Experience with REST APIs",
        "Good problem-solving skills",
      ],
    },

    {
      id: 2,
      title: "Full Stack Developer",
      company: "Innovate Technologies",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "₹8 - ₹14 LPA",
      experience: "1 - 3 years",
      posted: "3 days ago",
      skills: ["React", "Node.js", "Express", "MySQL"],
      description:
        "Join our development team as a Full Stack Developer and work on scalable web applications using modern frontend and backend technologies.",
      responsibilities: [
        "Develop frontend applications using React",
        "Build RESTful APIs using Node.js and Express",
        "Design and manage MySQL databases",
        "Fix bugs and improve application performance",
        "Collaborate with the development team",
      ],
      requirements: [
        "Experience with React.js",
        "Knowledge of Node.js and Express.js",
        "Understanding of MySQL",
        "Knowledge of REST APIs",
        "Good communication skills",
      ],
    },
  ];

  const job = jobs.find((item) => item.id === Number(id));

  // ================= JOB NOT FOUND =================
  if (!job) {
    return (
      <div className="min-h-screen bg-slate-100">

        <SideBar />

        <div className="md:ml-64 min-h-screen flex items-center justify-center px-6">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center max-w-md w-full">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Job not found
            </h1>

            <p className="text-slate-500 mt-2">
              The job you're looking for doesn't exist or has been removed.
            </p>

            <button
              type="button"
              onClick={() => navigate("/candidate/jobs")}
              className="mt-6 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Back to Jobs
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <SideBar />

      {/* ================= PAGE CONTENT ================= */}
      <div className="md:ml-64 min-h-screen">

        {/* ================= HEADER ================= */}
        <header className="bg-white border-b border-slate-200">

          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-slate-500 hover:text-blue-600 transition"
            >
              ← Back to jobs
            </button>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">

          {/* ================= JOB HEADER ================= */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

              {/* Company + Job */}
              <div className="flex items-start gap-4 md:gap-5 min-w-0">

                {/* Company Logo */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold shrink-0">
                  {job.company.charAt(0)}
                </div>

                <div className="min-w-0">

                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {job.title}
                  </h1>

                  <p className="text-lg font-semibold text-blue-600 mt-2">
                    {job.company}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    📍 {job.location}
                  </p>

                </div>

              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/candidate/jobs/${job.id}/apply`)
                }
                className="w-full md:w-auto px-7 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Apply Now
              </button>

            </div>

            {/* ================= JOB INFORMATION ================= */}
            <div className="flex flex-wrap gap-3 mt-7 pt-6 border-t border-slate-100">

              <span className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm">
                💼 {job.type}
              </span>

              <span className="px-4 py-2 rounded-lg bg-green-50 text-green-700 text-sm">
                💰 {job.salary}
              </span>

              <span className="px-4 py-2 rounded-lg bg-purple-50 text-purple-700 text-sm">
                👤 {job.experience}
              </span>

              <span className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm">
                🕒 {job.posted}
              </span>

            </div>

          </section>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* ================= LEFT CONTENT ================= */}
            <div className="lg:col-span-2 space-y-6">

              {/* Description */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Job Description
                </h2>

                <p className="text-slate-600 leading-7">
                  {job.description}
                </p>

              </section>

              {/* Responsibilities */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

                <h2 className="text-xl font-bold text-slate-900 mb-5">
                  Responsibilities
                </h2>

                <div className="space-y-4">

                  {job.responsibilities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>

                      <p className="text-sm text-slate-600 leading-6">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </section>

              {/* Requirements */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

                <h2 className="text-xl font-bold text-slate-900 mb-5">
                  Requirements
                </h2>

                <div className="space-y-4">

                  {job.requirements.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>

                      <p className="text-sm text-slate-600 leading-6">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

              </section>

            </div>

            {/* ================= RIGHT CONTENT ================= */}
            <aside className="space-y-6">

              {/* Required Skills */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                <h2 className="text-lg font-bold text-slate-900">
                  Required Skills
                </h2>

                <div className="flex flex-wrap gap-2 mt-5">

                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </section>

              {/* About Company */}
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                <h2 className="text-lg font-bold text-slate-900">
                  About the Company
                </h2>

                <div className="flex items-center gap-3 mt-5">

                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                    {job.company.charAt(0)}
                  </div>

                  <div>

                    <p className="font-semibold text-slate-900">
                      {job.company}
                    </p>

                    <p className="text-xs text-slate-500">
                      Technology & Software
                    </p>

                  </div>

                </div>

                <p className="text-sm text-slate-500 leading-6 mt-5">
                  A growing technology company focused on building modern
                  digital products and providing innovative solutions.
                </p>

              </section>

              {/* Apply Card */}
              <section className="bg-slate-900 rounded-2xl p-6 text-white">

                <h2 className="text-lg font-bold">
                  Interested in this job?
                </h2>

                <p className="text-sm text-slate-400 mt-2">
                  Apply now and take the next step in your career.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/candidate/jobs/${job.id}/apply`)
                  }
                  className="w-full mt-5 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Apply Now
                </button>

              </section>

            </aside>

          </div>

        </main>

      </div>

    </div>
  );
}

export default JobDetails;
