import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiEnvelope, HiLockClosed, HiArrowRight, HiEye, HiEyeSlash } from "react-icons/hi2";
import Logo from "@/layouts/Navbar/Logo";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, getDashboardRoute } = useAuth();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDashboardRoute(), { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardRoute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ email: email.trim().toLowerCase(), password });
      
      if (response.success) {
        toast.success(`Welcome back, ${response.user?.name || "User"}!`, {
          theme: "dark",
          autoClose: 2500,
        });

        const userRole = response.user.role;
        switch (userRole) {
          case 'admin':
          case 'super-admin':
            navigate('/admin/dashboard');
            break;
          case 'recruiter':
            navigate('/recruiter/dashboard');
            break;
          case 'company':
            navigate('/company/dashboard');
            break;
          case 'candidate':
          case 'user':
          default:
            navigate('/candidate/dashboard');
            break;
        }
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto pt-36 sm:pt-40 md:pt-44 pb-20 px-4"
    >
      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Glow Beam */}
        <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Sign in to access your enterprise dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-800/80">
            <p className="text-xs text-red-300 font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300">Email Address *</label>
            <div className="relative mt-1.5">
              <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-all font-normal"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Password *</label>
            <div className="relative mt-1.5">
              <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-all font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-700 bg-[#0a1128] text-cyan-500 focus:ring-0" />
              <span>Remember session</span>
            </label>
            <Link to="/forgot-password" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Authenticating..." : "Sign In to Workspace"}
            <HiArrowRight />
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-xs font-normal">
          Don't have an enterprise account?{" "}
          <Link to="/register" className="text-[#00D2FF] hover:text-cyan-300 font-bold ml-1">
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;