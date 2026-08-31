import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiCheckCircle, HiXCircle, HiEnvelope } from "react-icons/hi2";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Please request a new verification email.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10">
        {status === 'loading' && (
          <div className="text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900">Verifying Your Email</h2>
            <p className="text-gray-500 mt-2">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HiCheckCircle className="text-6xl text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
            <p className="text-gray-500 mt-2">{message}</p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40"
            >
              Login to Your Account
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HiXCircle className="text-6xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
            <p className="text-gray-500 mt-2">{message}</p>
            <div className="mt-6 space-y-3">
              <Link
                to="/register"
                className="block w-full rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
              >
                Back to Registration
              </Link>
              <Link
                to="/login"
                className="block w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40"
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
