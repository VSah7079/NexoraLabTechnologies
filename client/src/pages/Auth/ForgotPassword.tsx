import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Reset password for:", email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500 mt-2">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-gray-900">Check Your Email</h3>
            <p className="text-gray-500 mt-2">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-cyan-600 hover:text-cyan-700 font-medium"
            >
              ← Try again with different email
            </button>
          </div>
        )}

        <p className="text-center text-gray-500 mt-6 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-cyan-600 hover:text-cyan-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;