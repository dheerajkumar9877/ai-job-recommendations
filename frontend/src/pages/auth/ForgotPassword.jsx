import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // STEP 1 - Send OTP
  const handleSendCode = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await forgotPassword(form.email);

      setMessage("Verification code sent to your email.");
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 - Verify OTP
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      // IMPORTANT: backend expects email + otp
      await verifyResetCode(form.email, form.otp);

      setMessage("Code verified successfully.");
      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 - Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Backend updatePassword expects email + password
      await resetPassword(
        form.email,
        form.password
      );

      setMessage("Password changed successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-8 py-9">

        {/* Brand */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            AI<span className="text-blue-600">Powered</span>Job
          </h2>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">
                PASSWORD RESET
              </p>

              <h1 className="text-4xl font-bold text-slate-900">
                Forgot your password?
              </h1>

              <p className="mt-3 text-slate-500">
                Enter your email and we'll send you a
                verification code.
              </p>
            </div>

            <form
              onSubmit={handleSendCode}
              className="space-y-5"
            >
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
                  text-slate-900 outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue-600 text-white
                font-semibold hover:bg-blue-700 transition
                disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Sending..."
                  : "Send verification code"}
              </button>
            </form>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">
                VERIFY EMAIL
              </p>

              <h1 className="text-4xl font-bold text-slate-900">
                Enter verification code.
              </h1>

              <p className="mt-3 text-slate-500">
                We sent a verification code to{" "}
                <span className="font-medium text-slate-700">
                  {form.email}
                </span>
              </p>
            </div>

            <form
              onSubmit={handleVerifyCode}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Verification code
                </label>

                <input
                  name="otp"
                  type="text"
                  placeholder="Enter 4-digit code"
                  value={form.otp}
                  onChange={handleChange}
                  maxLength={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300
                  text-slate-900 outline-none tracking-[0.4em]
                  placeholder:text-slate-400 placeholder:tracking-normal
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue-600 text-white
                font-semibold hover:bg-blue-700 transition
                disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify code"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setForm({
                  ...form,
                  otp: "",
                });
                setError("");
                setMessage("");
              }}
              className="w-full mt-3 py-3 text-sm font-medium
              text-slate-500 hover:text-blue-600"
            >
              Change email
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">
                NEW PASSWORD
              </p>

              <h1 className="text-4xl font-bold text-slate-900">
                Create a new password.
              </h1>

              <p className="mt-3 text-slate-500">
                Choose a strong password for your account.
              </p>
            </div>

            <form
              onSubmit={handleResetPassword}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  New password
                </label>

                <input
                  name="password"
                  type="password"
                  placeholder="Create a new password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300
                  text-slate-900 outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Confirm password
                </label>

                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300
                  text-slate-900 outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue-600 text-white
                font-semibold hover:bg-blue-700 transition
                disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Changing password..."
                  : "Reset password"}
              </button>
            </form>
          </>
        )}

        {/* Back to Login */}
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

export default ForgotPassword;