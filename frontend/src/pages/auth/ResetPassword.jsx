import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    code: searchParams.get("code") || "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(
        form.email,
        form.code,
        form.password
      );

      setSuccess("Password reset successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

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
            RESET PASSWORD
          </p>

          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Create a new password.
          </h1>

          <p className="mt-3 text-slate-500">
            Enter your email, OTP and your new password.
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

          {/* OTP */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              OTP
            </label>

            <input
              name="code"
              type="text"
              maxLength="4"
              placeholder="Enter 4-digit OTP"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              text-slate-900 outline-none transition
              placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              New Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Create a new password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300
              text-slate-900 outline-none transition
              placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Confirm Password
            </label>

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
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

          {/* Success */}
          {success && (
            <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
              {success}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg
            bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition
            disabled:bg-blue-300 disabled:cursor-not-allowed
            shadow-sm"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Remember your password?{" "}
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

export default ResetPassword;