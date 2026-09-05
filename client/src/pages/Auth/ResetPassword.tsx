import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { HiLockClosed, HiCheckCircle, HiExclamationCircle, HiArrowRight } from "react-icons/hi2";
import Logo from "@/layouts/Navbar/Logo";
import { authAPI } from "@/services/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Reset token is missing or invalid. Please request a new password reset link.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await authAPI.resetPassword({ token, password });
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.message || "Failed to reset password. The link may have expired.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please request a new reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto py-8"
    >
      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-5">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Set New Password</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Enter and confirm your new secure password
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
            <HiExclamationCircle className="text-base text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {!token && !submitted && (
          <div className="text-center py-4 space-y-3">
            <p className="text-xs sm:text-sm text-amber-300">
              No reset token detected in URL. Please click the link received in your email or request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] hover:text-cyan-300"
            >
              <span>Go to Forgot Password</span>
              <HiArrowRight className="text-xs" />
            </Link>
          </div>
        )}

        {token && !submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">New Password (min 6 characters) *</label>
              <div className="relative mt-1.5">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Confirm New Password *</label>
              <div className="relative mt-1.5">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Updating Password...</span>
                </span>
              ) : (
                <>
                  <span>Update Password</span>
                  <HiArrowRight />
                </>
              )}
            </button>
          </form>
        ) : null}

        {submitted && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <HiCheckCircle className="text-5xl text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Password Updated!</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Your password has been securely reset. You can now sign in with your new credentials.
            </p>
            <Link
              to="/login"
              className="inline-block w-full rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all text-center hover:scale-105"
            >
              Sign In to Account
            </Link>
          </div>
        )}

        <p className="text-center text-slate-400 mt-6 text-xs">
          Remember your credentials?{" "}
          <Link to="/login" className="text-[#00D2FF] hover:text-cyan-300 font-bold ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ResetPassword;