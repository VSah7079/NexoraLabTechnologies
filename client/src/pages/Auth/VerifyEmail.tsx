import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import Logo from "@/layouts/Navbar/Logo";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid or expired verification link.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network connection error. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto pt-36 sm:pt-40 md:pt-44 pb-20 px-4"
    >
      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        {status === 'loading' && (
          <div className="text-center space-y-4">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#00D2FF] border-t-transparent mx-auto"></div>
            <h2 className="text-2xl font-black text-white font-['Outfit']">Verifying Account</h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">Validating your email token with security servers...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <HiCheckCircle className="text-6xl text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black text-white font-['Outfit']">Email Verified!</h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">{message}</p>
            <Link
              to="/login"
              className="mt-4 inline-flex items-center justify-center w-full rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
            >
              Sign In to Your Workspace
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <HiXCircle className="text-6xl text-rose-500" />
            </div>
            <h2 className="text-2xl font-black text-white font-['Outfit']">Verification Failed</h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">{message}</p>
            <div className="pt-2 space-y-2.5">
              <Link
                to="/register"
                className="block w-full rounded-full border border-slate-700 bg-[#0a1128] py-3 text-xs font-bold text-slate-200 transition-all hover:border-[#00D2FF]"
              >
                Back to Registration
              </Link>
              <Link
                to="/login"
                className="block w-full rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-3 text-xs font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 text-center"
              >
                Go to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VerifyEmail;
