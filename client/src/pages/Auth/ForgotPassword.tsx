import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiEnvelope, HiArrowRight, HiCheckCircle, HiExclamationCircle } from "react-icons/hi2";
import Logo from "@/layouts/Navbar/Logo";
import { authAPI } from "@/services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authAPI.forgotPassword(email.trim().toLowerCase());
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.message || "Failed to send reset link. Please check the email address.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send reset link. Please verify your email and try again.");
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
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Reset Password</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Enter your email and we&apos;ll send you a password recovery link
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
            <HiExclamationCircle className="text-base text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Email Address *</label>
              <div className="relative mt-1.5">
                <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-colors"
                  required
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
                  <span>Dispatching Email...</span>
                </span>
              ) : (
                <>
                  <span>Send Password Reset Link</span>
                  <HiArrowRight />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <HiCheckCircle className="text-5xl text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Reset Link Dispatched</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              We&apos;ve sent password reset instructions to <strong className="text-cyan-400">{email}</strong>.
            </p>
            <p className="text-[11px] text-slate-400">
              Please check your inbox (and spam folder). The link is valid for 1 hour.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setError("");
              }}
              className="mt-4 text-xs text-cyan-400 hover:text-cyan-300 font-bold"
            >
              ← Try another email address
            </button>
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

export default ForgotPassword;