import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const applicants = [
    {
      name: "Aman Sharma",
      role: "React Developer",
      match: 97,
    },
    {
      name: "Priya Singh",
      role: "Full Stack Developer",
      match: 92,
    },
    {
      name: "Rahul Kumar",
      role: "Node.js Developer",
      match: 87,
    },
    {
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
      <aside className="hidden md:flex w-64 bg-slate-950 text-white flex-col fixed left-0 top-0 bottom-0">

        {/* Brand */}
        <div className="px-6 py-7 border-b border-slate-800">
          <h2 className="text-xl font-bold">
            AI<span className="text-blue-500">Powered</span>Job
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          {/* Dashboard */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg bg-blue-600 text-white font-medium text-left"
          >
            <span>▦</span>
            Dashboard
          </button>

          {/* Post Job */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg text-slate-300
            hover:bg-slate-800 hover:text-white transition text-left"
          >
            <span>＋</span>
            Post a Job
          </button>

          {/* Manage Jobs */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg text-slate-300
            hover:bg-slate-800 hover:text-white transition text-left"
          >
            <span>▤</span>
            Manage Jobs
          </button>

          {/* Applicants */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg text-slate-300
            hover:bg-slate-800 hover:text-white transition text-left"
          >
            <span>♙</span>
            Applicants
          </button>

          {/* Interviews */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg text-slate-300
            hover:bg-slate-800 hover:text-white transition text-left"
          >
            <span>◷</span>
            Interviews
          </button>

          {/* Company Profile */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-lg text-slate-300
            hover:bg-slate-800 hover:text-white transition text-left"
          >
            <span>◯</span>
            Company Profile
          </button>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2
            px-4 py-3 rounded-lg
            bg-slate-800 text-slate-200
            hover:bg-red-600 hover:text-white transition"
          >
            ⇥ Logout
          </button>
        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="w-full md:ml-64">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200
          px-6 md:px-10 py-5">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
                RECRUITER DASHBOARD
              </p>

              <h1 className="text-2xl md:text-3xl font-bold
                text-slate-900 mt-1">
                Welcome, {user.name || "Recruiter"} 👋
              </h1>
            </div>

            <div className="flex items-center gap-3">

              {/* Post Job */}
              <button
                className="hidden sm:block px-5 py-3 rounded-lg
                bg-blue-600 text-white font-semibold
                hover:bg-blue-700 transition shadow-sm"
              >
                + Post a job
              </button>

              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-full
                bg-blue-600 text-white
                flex items-center justify-center
                font-bold text-lg"
              >
                {(user.name || "R").charAt(0).toUpperCase()}
              </div>

            </div>

          </div>

        </header>


        {/* ================= CONTENT ================= */}
        <div className="p-6 md:p-10">


          {/* ================= METRICS ================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Active Jobs */}
            <div
              className="bg-white rounded-2xl border border-slate-200
              p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Active Jobs
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    12
                  </h2>

                  <p className="text-sm text-green-600 font-medium mt-2">
                    +3 this month
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl
                  bg-blue-50 text-blue-600
                  flex items-center justify-center text-xl">
                  💼
                </div>

              </div>
            </div>


            {/* Applicants */}
            <div
              className="bg-white rounded-2xl border border-slate-200
              p-6 shadow-sm hover:shadow-md transition"
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

                <div className="w-11 h-11 rounded-xl
                  bg-purple-50 text-purple-600
                  flex items-center justify-center text-xl">
                  ♙
                </div>

              </div>
            </div>


            {/* Shortlisted */}
            <div
              className="bg-white rounded-2xl border border-slate-200
              p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Shortlisted
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    42
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    17% of applicants
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl
                  bg-green-50 text-green-600
                  flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>
            </div>


            {/* Interviews */}
            <div
              className="bg-white rounded-2xl border border-slate-200
              p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Interviews
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-3">
                    18
                  </h2>

                  <p className="text-sm text-blue-600 font-medium mt-2">
                    6 upcoming
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl
                  bg-orange-50 text-orange-600
                  flex items-center justify-center text-xl">
                  ◷
                </div>

              </div>
            </div>

          </section>


          {/* ================= LOWER GRID ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">


            {/* Recent Applicants */}
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
                    Recent applicants
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest candidates who applied
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

                {applicants.map((applicant) => (

                  <div
                    key={applicant.name}
                    className="px-6 py-5 flex items-center
                    gap-4 hover:bg-slate-50 transition"
                  >

                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-xl
                      bg-blue-50 text-blue-600
                      flex items-center justify-center
                      font-bold shrink-0"
                    >
                      {applicant.name.charAt(0)}
                    </div>


                    {/* Information */}
                    <div className="flex-1 min-w-0">

                      <h4 className="font-semibold text-slate-900">
                        {applicant.name}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {applicant.role}
                      </p>

                    </div>


                    {/* Match */}
                    <div className="text-right">

                      <div className="text-lg font-bold text-green-600">
                        {applicant.match}%
                      </div>

                      <div className="text-xs text-slate-400">
                        Match
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* Hiring Overview */}
            <div
              className="bg-white rounded-2xl
              border border-slate-200 shadow-sm p-6"
            >

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Hiring overview
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Applications this week
                </p>
              </div>


              {/* Chart */}
              <div className="h-56 mt-8 flex items-end
                justify-between gap-3">

                {hiringData.map((height, index) => (

                  <div
                    key={index}
                    className="flex-1 h-full flex flex-col
                    justify-end items-center gap-3"
                  >

                    <div
                      className="w-full max-w-8 rounded-t-md
                      bg-blue-600 hover:bg-blue-700
                      transition"
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

              <button
                className="bg-white border border-slate-200
                rounded-xl p-5 text-left
                hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">＋</div>

                <h4 className="font-semibold text-slate-900">
                  Post a Job
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Create a new job opening
                </p>
              </button>


              <button
                className="bg-white border border-slate-200
                rounded-xl p-5 text-left
                hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">♙</div>

                <h4 className="font-semibold text-slate-900">
                  View Applicants
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Review your candidates
                </p>
              </button>


              <button
                className="bg-white border border-slate-200
                rounded-xl p-5 text-left
                hover:border-blue-300 hover:shadow-sm transition"
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