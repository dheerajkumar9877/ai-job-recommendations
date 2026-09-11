import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
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
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

      {/* Register Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-8 py-9">

        {/* Brand */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            AI<span className="text-blue-600">Powered</span>Job
          </h2>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold tracking-widest text-blue-600 mb-2">
            GET STARTED
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Create your account.
          </h1>

          <p className="mt-3 text-slate-500">
            Choose how you want to use the platform.
          </p>
        </div>

        {/* Role Switch */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                role: "candidate",
              })
            }
            className={`w-1/2 py-3 rounded-lg text-sm font-semibold transition ${
              form.role === "candidate"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Candidate
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                role: "recruiter",
              })
            }
            className={`w-1/2 py-3 rounded-lg text-sm font-semibold transition ${
              form.role === "recruiter"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Recruiter
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Full name
            </label>

            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              outline-none text-slate-900
              placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

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
              outline-none text-slate-900
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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              outline-none text-slate-900
              placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white
            font-semibold hover:bg-blue-700 transition
            disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;