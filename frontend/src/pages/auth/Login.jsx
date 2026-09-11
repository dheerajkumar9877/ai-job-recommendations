import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(form.email, form.password);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const role = data.user?.role;

      if (role === "candidate") {
        navigate("/candidate/dashboard");
      } else if (role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        setError("Invalid user role.");
      }
    } catch (err) {
      
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

      {/* Login Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-8 py-9">

        {/* Brand */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900">
            AI<span className="text-blue-600">Powered</span>Job
          </h2>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">
            WELCOME BACK
          </p>

          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Find your next opportunity.
          </h1>

          <p className="mt-3 text-slate-500">
            Sign in to continue to your personalized job workspace.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              text-slate-900 outline-none transition
              placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              text-slate-900 outline-none transition
              placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg
            bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition
            disabled:bg-blue-300 disabled:cursor-not-allowed
            shadow-sm"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <div className="flex justify-end mt-2">

        {/* Forgot */}
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

        {/* Register */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;