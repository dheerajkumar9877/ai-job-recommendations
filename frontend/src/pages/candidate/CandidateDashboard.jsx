import { useNavigate } from "react-router-dom";
import SideBar from "../auth/SideBar";

function CandidateDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const jobs = [
    {
      name: "Frontend React Developer",
      letter: "R",
      company: "Tech company",
      location: "Remote",
      match: 95,
    },
    {
      name: "Full Stack Developer",
      letter: "F",
      company: "Tech company",
      location: "Remote",
      match: 89,
    },
    {
      name: "Node.js Developer",
      letter: "N",
      company: "Tech company",
      location: "Remote",
      match: 83,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <SideBar></SideBar>
      {/* ================= MAIN ================= */}
      <main className="w-full md:ml-64">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
                CANDIDATE DASHBOARD
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                Hello, {user.name || "Candidate"} 👋
              </h1>
            </div>

            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-full bg-blue-600
              text-white flex items-center justify-center
              font-bold text-lg shadow-sm"
              onClick={() => navigate("/candidate/profile")}
            >
              {(user.name || "C").charAt(0).toUpperCase()}
            </div>

          </div>

        </header>


        {/* Content */}
        <div className="p-6 md:p-10">

          {/* ================= HERO ================= */}
          <section
            className="bg-slate-950 rounded-2xl p-7 md:p-10
            text-white relative overflow-hidden"
          >

            {/* Decorative circles */}
            <div
              className="absolute -top-24 -right-24
              w-72 h-72 rounded-full bg-blue-600/20 blur-3xl"
            />

            <div
              className="absolute -bottom-24 -left-24
              w-72 h-72 rounded-full bg-purple-600/20 blur-3xl"
            />

            <div className="relative flex flex-col md:flex-row
              items-start md:items-center justify-between gap-8">

              <div>

                <div
                  className="inline-flex px-3 py-1.5 rounded-full
                  bg-blue-500/10 border border-blue-400/20
                  text-blue-300 text-xs font-bold tracking-wider mb-5"
                >
                  AI MATCHING
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Your next opportunity
                  <br />
                  is waiting.
                </h2>

                <p className="mt-4 text-slate-300 max-w-xl">
                  Complete your profile to receive better job
                  recommendations based on your skills and experience.
                </p>

                <button
                  className="mt-6 px-5 py-3 rounded-lg
                  bg-blue-600 hover:bg-blue-700
                  text-white font-semibold transition shadow-lg"

                  onClick={() => navigate("/candidate/profile")}
                >
                  Complete profile
                </button>

              </div>


              {/* Profile percentage */}
              <div
                className="w-36 h-36 rounded-full
                border-8 border-blue-500/20
                flex items-center justify-center
                relative shrink-0"
              >

                <div className="text-center">

                  <div className="text-3xl font-bold">
                    92%
                  </div>

                  <div className="text-xs text-slate-400 mt-1">
                    profile
                    <br />
                    complete
                  </div>

                </div>

              </div>

            </div>
          </section>


          {/* ================= GRID ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* Recommended Jobs */}
            <div
              className="lg:col-span-2 bg-white rounded-2xl
              border border-slate-200 shadow-sm"
            >

              <div
                className="flex items-center justify-between
                px-6 py-5 border-b border-slate-200"
              >

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Recommended for you
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Jobs matched to your profile
                  </p>
                </div>

                <button
                  className="text-sm font-semibold text-blue-600
                  hover:text-blue-700"
                >
                  View all →
                </button>

              </div>


              <div className="divide-y divide-slate-100">

                {jobs.map((job) => (

                  <div
                    key={job.name}
                    className="px-6 py-5 flex items-center
                    gap-4 hover:bg-slate-50 transition"
                  >

                    {/* Job icon */}
                    <div
                      className="w-11 h-11 rounded-xl
                      bg-blue-50 text-blue-600
                      flex items-center justify-center
                      font-bold shrink-0"
                    >
                      {job.letter}
                    </div>


                    {/* Job details */}
                    <div className="flex-1 min-w-0">

                      <h4 className="font-semibold text-slate-900">
                        {job.name}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {job.company} · {job.location}
                      </p>

                    </div>


                    {/* Match */}
                    <div className="text-right">

                      <div className="text-lg font-bold text-green-600">
                        {job.match}%
                      </div>

                      <div className="text-xs text-slate-400">
                        Match
                      </div>

                    </div>

                  </div>

                ))}

              </div>
            </div>


            {/* Application Status */}
            <div
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <h3 className="text-lg font-bold text-slate-900">
                Application status
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your current applications
              </p>


              <div className="mt-8">

                <div className="text-5xl font-bold text-slate-900">
                  8
                </div>

                <p className="text-sm text-slate-500 mt-2">
                  Total applications
                </p>

              </div>


              {/* Progress */}
              <div className="mt-7">

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: "62%" }}
                  />

                </div>

              </div>


              <div className="mt-5 space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Under review
                  </span>

                  <span className="font-semibold text-slate-900">
                    5
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Shortlisted
                  </span>

                  <span className="font-semibold text-slate-900">
                    2
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Interview
                  </span>

                  <span className="font-semibold text-slate-900">
                    1
                  </span>
                </div>

              </div>

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}
          <section className="mt-6">

            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Quick actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <button
                onClick = {() => navigate("/candidate/jobs")}
                className="bg-white border border-slate-200
                rounded-xl p-5 text-left
                hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">⌕</div>

                <h4 
                  className="font-semibold text-slate-900"
                >
                  Find Jobs
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Explore available opportunities
                </p>
              </button>


              <button
              onClick={() => navigate('/candidate/recommendations')}
                className="bg-white border border-slate-200
                rounded-xl p-5 text-left
                hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">✦</div>

                <h4 className="font-semibold text-slate-900">
                  AI Recommendations
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  See jobs matched by AI
                </p>
              </button>


              <button
                className="bg-white border border-slate-200
                rounded-xl p-5 text-left
                hover:border-blue-300 hover:shadow-sm transition"
                onClick={() => navigate('/candidate/profile')}
              >
                <div className="text-2xl mb-3">◯</div>

                <h4 className="font-semibold text-slate-900">
                  Update Profile
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Improve your job matches
                </p>
              </button>

            </div>

          </section>

        </div>
      </main>

    </div>
  );
}

export default CandidateDashboard;