import { useNavigate } from "react-router-dom";
import RecruiterSideBar from "../auth/RecruiterSideBar";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const applicants = [
    {
      id: 1,
      name: "Aman Sharma",
      role: "React Developer",
      match: 97,
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "Full Stack Developer",
      match: 92,
    },
    {
      id: 3,
      name: "Rahul Kumar",
      role: "Node.js Developer",
      match: 87,
    },
    {
      id: 4,
      name: "Neha Verma",
      role: "UI Developer",
      match: 82,
    },
  ];

  const hiringData = [45, 68, 54, 82, 64, 91, 76];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* ================= SIDEBAR ================= */}
      <RecruiterSideBar />

      {/* ================= MAIN ================= */}
      <main className="w-full md:ml-64">
        {/* ================= TOPBAR ================= */}
        <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
                RECRUITER DASHBOARD
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                Welcome, {user.name || "Recruiter"} 👋
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* POST JOB */}
              <button
                onClick={() => navigate("/recruiter/post-job")}
                className="hidden sm:block px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                + Post a job
              </button>

              {/* PROFILE */}
              <button
                onClick={() => navigate("/recruiter/profile")}
                className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg hover:bg-blue-700 transition"
                title="Profile"
              >
                {(user.name || "R").charAt(0).toUpperCase()}
              </button>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="p-6 md:p-10">
          {/* ================= METRICS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* ACTIVE JOBS */}
            <button
              onClick={() => navigate("/recruiter/jobs")}
              className="text-left bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Active Jobs</p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    12
                  </h2>

                  <p className="text-sm text-green-600 font-medium mt-2">
                    +3 this month
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  💼
                </div>
              </div>
            </button>

            {/* APPLICANTS */}
            <button
              onClick={() => navigate("/recruiter/applicants")}
              className="text-left bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-purple-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Total Applicants
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    248
                  </h2>

                  <p className="text-sm text-green-600 font-medium mt-2">
                    +18% this month
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  ♙
                </div>
              </div>
            </button>

            {/* SHORTLISTED */}
            <button
              onClick={() => navigate("/recruiter/applicants?status=shortlisted")}
              className="text-left bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-green-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Shortlisted</p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    42
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    17% of applicants
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  ✓
                </div>
              </div>
            </button>

            {/* INTERVIEWS */}
            <button
              onClick={() => navigate("/recruiter/interviews")}
              className="text-left bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-orange-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">Interviews</p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    18
                  </h2>

                  <p className="text-sm text-blue-600 font-medium mt-2">
                    6 upcoming
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
                  ◷
                </div>
              </div>
            </button>
          </section>

          {/* ================= LOWER GRID ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* ================= RECENT APPLICANTS ================= */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Recent applicants
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest candidates who applied
                  </p>
                </div>

                <button
                  onClick={() => navigate("/recruiter/applicants")}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {applicants.map((applicant) => (
                  <button
                    key={applicant.id}
                    onClick={() =>
                      navigate(`/recruiter/applicants/${applicant.id}`)
                    }
                    className="w-full px-6 py-5 flex items-center gap-4 hover:bg-slate-50 transition text-left"
                  >
                    {/* AVATAR */}
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      {applicant.name.charAt(0).toUpperCase()}
                    </div>

                    {/* INFORMATION */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900">
                        {applicant.name}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {applicant.role}
                      </p>
                    </div>

                    {/* MATCH */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {applicant.match}%
                      </div>

                      <div className="text-xs text-slate-400">
                        Match
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ================= HIRING OVERVIEW ================= */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Hiring overview
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Applications this week
                </p>
              </div>

              {/* CHART */}
              <div className="h-56 mt-8 flex items-end justify-between gap-3">
                {hiringData.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                  >
                    <div
                      className="w-full max-w-8 rounded-t-md bg-blue-600 hover:bg-blue-700 transition"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <span className="text-xs font-medium text-slate-400">
                      {days[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="mt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Quick actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* POST JOB */}
              <button
                onClick={() => navigate("/recruiter/post-job")}
                className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">＋</div>

                <h4 className="font-semibold text-slate-900">
                  Post a Job
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Create a new job opening
                </p>
              </button>

              {/* VIEW APPLICANTS */}
              <button
                onClick={() => navigate("/recruiter/applicants")}
                className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-purple-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">♙</div>

                <h4 className="font-semibold text-slate-900">
                  View Applicants
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Review your candidates
                </p>
              </button>

              {/* INTERVIEWS */}
              <button
                onClick={() => navigate("/recruiter/interviews")}
                className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-orange-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">◷</div>

                <h4 className="font-semibold text-slate-900">
                  Schedule Interview
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Manage upcoming interviews
                </p>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;