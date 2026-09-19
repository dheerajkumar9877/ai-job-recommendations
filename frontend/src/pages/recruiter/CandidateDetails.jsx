import React from "react";
import { useNavigate } from "react-router-dom";
import RecruiterSideBar from "../auth/RecruiterSideBar";

function CandidateDetails() {
  const navigate = useNavigate();

  // Temporary candidate data
  // Later this will come from your backend using candidate ID
  const candidate = {
    name: "Aman Sharma",
    email: "aman@gmail.com",
    phone: "+91 98765 43210",
    location: "Delhi, India",
    role: "React Developer",
    experience: "2 Years",
    match: 97,
    status: "Shortlisted",
    skills: [
      "React.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
    ],
    education: "B.Tech in Computer Science",
    university: "ABC University",
    summary:
      "Frontend developer with 2 years of experience building modern and responsive web applications using React.js and JavaScript.",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <RecruiterSideBar></RecruiterSideBar>
      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-lg border border-slate-300
            flex items-center justify-center
            text-slate-600 hover:bg-slate-100 transition"
          >
            ←
          </button>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
              CANDIDATE
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Candidate Details
            </h1>
          </div>

        </div>

      </header>


      {/* ================= CONTENT ================= */}
      <main className="p-6 md:p-10 max-w-6xl mx-auto">

        {/* ================= PROFILE CARD ================= */}
        <section className="bg-white rounded-2xl border border-slate-200
          shadow-sm p-6 md:p-8 mb-6">

          <div className="flex flex-col md:flex-row
            md:items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-2xl
                bg-blue-100 text-blue-700
                flex items-center justify-center
                text-3xl font-bold"
              >
                {candidate.name.charAt(0)}
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {candidate.name}
                </h2>

                <p className="text-slate-500 mt-1">
                  {candidate.role}
                </p>

                <div className="flex flex-wrap gap-3 mt-3">

                  <span className="text-sm text-slate-500">
                    📍 {candidate.location}
                  </span>

                  <span className="text-sm text-slate-500">
                    💼 {candidate.experience}
                  </span>

                </div>

              </div>

            </div>


            {/* Actions */}
            <div className="flex flex-wrap gap-3">

              <button
                className="px-5 py-2.5 rounded-lg
                border border-slate-300
                text-slate-700 font-semibold
                hover:bg-slate-100 transition"
              >
                Download Resume
              </button>

              <button
                className="px-5 py-2.5 rounded-lg
                bg-blue-600 text-white font-semibold
                hover:bg-blue-700 transition"
              >
                Contact Candidate
              </button>

            </div>

          </div>

        </section>


        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">


            {/* About */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900 mb-4">
                About Candidate
              </h3>

              <p className="text-slate-600 leading-7">
                {candidate.summary}
              </p>

            </section>


            {/* Skills */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {candidate.skills.map((skill) => (

                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg
                    bg-blue-50 text-blue-700
                    border border-blue-100
                    text-sm font-medium"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </section>


            {/* Education */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Education
              </h3>

              <div className="flex gap-4">

                <div
                  className="w-11 h-11 rounded-lg
                  bg-slate-100 flex items-center
                  justify-center text-xl"
                >
                  🎓
                </div>

                <div>

                  <h4 className="font-semibold text-slate-900">
                    {candidate.education}
                  </h4>

                  <p className="text-sm text-slate-500 mt-1">
                    {candidate.university}
                  </p>

                </div>

              </div>

            </section>


            {/* Application */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Application
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="p-4 rounded-xl bg-slate-50">

                  <p className="text-sm text-slate-500">
                    Applied Position
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {candidate.role}
                  </p>

                </div>


                <div className="p-4 rounded-xl bg-slate-50">

                  <p className="text-sm text-slate-500">
                    Application Status
                  </p>

                  <span
                    className="inline-flex mt-2
                    px-3 py-1 rounded-full
                    bg-green-50 text-green-700
                    border border-green-200
                    text-xs font-semibold"
                  >
                    {candidate.status}
                  </span>

                </div>

              </div>

            </section>

          </div>


          {/* ================= RIGHT ================= */}
          <div className="space-y-6">


            {/* AI Match */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900">
                AI Match Score
              </h3>

              <div className="flex items-center justify-center py-7">

                <div
                  className="w-36 h-36 rounded-full
                  border-[12px] border-blue-100
                  flex flex-col items-center justify-center"
                >

                  <span className="text-4xl font-bold text-blue-600">
                    {candidate.match}%
                  </span>

                  <span className="text-xs text-slate-500 mt-1">
                    Match
                  </span>

                </div>

              </div>

              <p className="text-sm text-slate-500 text-center">
                Strong match based on skills, experience and job
                requirements.
              </p>

            </section>


            {/* Contact */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Contact Information
              </h3>

              <div className="space-y-4">

                <div>

                  <p className="text-xs text-slate-400 uppercase font-semibold">
                    Email
                  </p>

                  <p className="text-sm text-slate-700 mt-1 break-all">
                    {candidate.email}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-400 uppercase font-semibold">
                    Phone
                  </p>

                  <p className="text-sm text-slate-700 mt-1">
                    {candidate.phone}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-400 uppercase font-semibold">
                    Location
                  </p>

                  <p className="text-sm text-slate-700 mt-1">
                    {candidate.location}
                  </p>

                </div>

              </div>

            </section>


            {/* Recruiter Actions */}
            <section
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Application Actions
              </h3>

              <div className="space-y-3">

                <button
                  className="w-full py-3 rounded-lg
                  bg-green-600 text-white
                  font-semibold hover:bg-green-700 transition"
                >
                  ✓ Shortlist Candidate
                </button>

                <button
                  className="w-full py-3 rounded-lg
                  bg-blue-600 text-white
                  font-semibold hover:bg-blue-700 transition"
                >
                  ◷ Schedule Interview
                </button>

                <button
                  className="w-full py-3 rounded-lg
                  border border-red-200
                  text-red-600 font-semibold
                  hover:bg-red-50 transition"
                >
                  Reject Application
                </button>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CandidateDetails;