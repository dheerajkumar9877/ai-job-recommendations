import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

function RecruiterDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">AI<span>Powered</span>Job</div>
        <nav>
          <a className="selected">Dashboard</a>
          <a>Post a Job</a>
          <a>Manage Jobs</a>
          <a>Applicants</a>
          <a>Interviews</a>
          <a>Company Profile</a>
        </nav>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">RECRUITER DASHBOARD</p>
            <h1>Welcome, {user.name || "Recruiter"} 👋</h1>
          </div>
          <button className="primary-btn small">+ Post a job</button>
        </header>

        <section className="metric-grid">
          <div className="metric"><span>Active Jobs</span><strong>12</strong><small>+3 this month</small></div>
          <div className="metric"><span>Total Applicants</span><strong>248</strong><small>+18% this month</small></div>
          <div className="metric"><span>Shortlisted</span><strong>42</strong><small>17% of applicants</small></div>
          <div className="metric"><span>Interviews</span><strong>18</strong><small>6 upcoming</small></div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-title"><h3>Recent applicants</h3><button>View all</button></div>
            {["Aman Sharma", "Priya Singh", "Rahul Kumar", "Neha Verma"].map((name, i) => (
              <div className="job-row" key={name}>
                <div className="job-icon">{name.charAt(0)}</div>
                <div><strong>{name}</strong><span>{["React Developer", "Full Stack Developer", "Node.js Developer", "UI Developer"][i]}</span></div>
                <b>{97 - i * 5}% match</b>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-title"><h3>Hiring overview</h3></div>
            <div className="bar-chart">
              {[45, 68, 54, 82, 64, 91, 76].map((height, i) => (
                <div className="bar-wrap" key={i}>
                  <div className="bar" style={{height: `${height}%`}} />
                  <span>{["M","T","W","T","F","S","S"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RecruiterDashboard;