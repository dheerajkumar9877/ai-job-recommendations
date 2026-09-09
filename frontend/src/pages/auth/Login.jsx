import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(form);

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user?.role;
      if (role === "candidate") navigate("/candidate/dashboard");
      else if (role === "recruiter") navigate("/recruiter/dashboard");
      else setError("Invalid user role.");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">AI<span>Powered</span>Job</div>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Find your next opportunity.</h1>
        <p className="muted">Sign in to continue to your personalized job workspace.</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <div className="error">{error}</div>}

          <button className="primary-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>

      <div className="auth-side">
        <div className="side-content">
          <div className="mini-badge">AI-POWERED RECRUITMENT</div>
          <h2>Connect skills with the right opportunities.</h2>
          <p>
            Candidates discover relevant jobs. Recruiters discover qualified
            talent. One platform for the complete hiring journey.
          </p>
          <div className="stats">
            <div><strong>AI</strong><span>Smart matching</span></div>
            <div><strong>2+</strong><span>User roles</span></div>
            <div><strong>24/7</strong><span>Job discovery</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;