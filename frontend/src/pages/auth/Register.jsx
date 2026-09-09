import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <div className="brand">AI<span>Powered</span>Job</div>
        <p className="eyebrow">GET STARTED</p>
        <h1>Create your account.</h1>
        <p className="muted">Choose how you want to use the platform.</p>

        <div className="role-switch">
          <button
            type="button"
            className={form.role === "candidate" ? "active" : ""}
            onClick={() => setForm({ ...form, role: "candidate" })}
          >
            Candidate
          </button>
          <button
            type="button"
            className={form.role === "recruiter" ? "active" : ""}
            onClick={() => setForm({ ...form, role: "recruiter" })}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <div className="error">{error}</div>}

          <button className="primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <div className="auth-side register-side">
        <div className="side-content">
          <div className="mini-badge">ONE PLATFORM</div>
          <h2>Build your career or your team.</h2>
          <p>
            A modern recruitment experience designed around skills, relevant
            opportunities, and faster hiring.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;