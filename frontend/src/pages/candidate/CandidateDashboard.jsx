import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

function CandidateDashboard() {
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
          <a>Find Jobs</a>
          <a>Recommendations</a>
          <a>Applications</a>
          <a>Saved Jobs</a>
          <a>Profile</a>
        </nav>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">CANDIDATE DASHBOARD</p>
            <h1>Hello, {user.name || "Candidate"} 👋</h1>
          </div>
          <div className="avatar">{(user.name || "C").charAt(0).toUpperCase()}</div>
        </header>

        <section className="hero-card">
          <div>
            <div className="mini-badge">AI MATCHING</div>
            <h2>Your next opportunity is waiting.</h2>
            <p>Complete your profile to receive better job recommendations.</p>
            <button className="primary-btn small">Complete profile</button>
          </div>
          <div className="match-circle">92%<span>profile<br/>complete</span></div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-title">
              <h3>Recommended for you</h3><button>View all</button>
            </div>
            {["Frontend React Developer", "Full Stack Developer", "Node.js Developer"].map((job, i) => (
              <div className="job-row" key={job}>
                <div className="job-icon">{["R", "F", "N"][i]}</div>
                <div><strong>{job}</strong><span>Tech company · Remote</span></div>
                <b>{95 - i * 6}%</b>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-title"><h3>Application status</h3></div>
            <div className="status-number">8</div>
            <p className="muted">Total applications</p>
            <div className="progress"><span style={{width: "62%"}} /></div>
            <p className="muted">5 under review · 2 shortlisted · 1 interview</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CandidateDashboard;