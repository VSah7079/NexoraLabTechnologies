import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAPI } from "@/services/api";
import { HiCheckCircle, HiArrowRight, HiEye, HiEyeSlash } from "react-icons/hi2";
import Logo from "@/layouts/Navbar/Logo";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "candidate",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, getDashboardRoute } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardRoute(), { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardRoute]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim(),
        role: formData.role,
      });

      if (response.success) {
        setSuccess(true);
        setSuccessMessage(response.message || "Account registered successfully!");
        setUserEmail(formData.email);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Verification email sent successfully!");
      } else {
        setError(data.message || "Failed to resend verification email");
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto py-8 px-4"
    >
      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Top Glow Laser */}
        <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

        {success ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <HiCheckCircle />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Registration Successful
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              {successMessage || (
                <>
                  We've dispatched a secure verification link to{" "}
                  <span className="font-bold text-[#00D2FF]">{userEmail}</span>.
                </>
              )}
            </p>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-800 text-xs text-red-300">
                {error}
              </div>
            )}

            <div className="pt-4 space-y-3">
              <button
                onClick={handleResendVerification}
                className="w-full rounded-full border border-slate-700 bg-[#0a1128] py-3 text-xs font-bold text-slate-200 transition-all hover:border-[#00D2FF] cursor-pointer"
              >
                Resend Verification Email
              </button>
              <Link
                to="/login"
                className="block w-full rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all text-center hover:scale-105"
              >
                Proceed to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-5">
                <Logo size="lg" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                Join NexoraLab Technologies ecosystem
              </p>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-2xl bg-red-950/40 border border-red-800/80">
                <p className="text-xs text-red-300 font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Password *</label>
                  <div className="relative mt-1.5">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-4 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <HiEyeSlash size={16} /> : <HiEye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Confirm *</label>
                  <div className="relative mt-1.5">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-4 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <HiEyeSlash size={16} /> : <HiEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Account Type</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none cursor-pointer"
                >
                  <option value="candidate" className="bg-[#070e1e]">Candidate / Job Seeker</option>
                  <option value="recruiter" className="bg-[#070e1e]">Technical Recruiter</option>
                  <option value="company" className="bg-[#070e1e]">Enterprise / Company</option>
                  <option value="user" className="bg-[#070e1e]">Standard User</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Creating Account..." : "Create Enterprise Account"}
                <HiArrowRight />
              </button>
            </form>

            <p className="text-center text-slate-400 mt-6 text-xs font-normal">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00D2FF] hover:text-cyan-300 font-bold ml-1">
                Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Register;