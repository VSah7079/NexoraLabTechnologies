import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiShieldCheck, HiArrowRight } from "react-icons/hi2";
import Logo from "@/layouts/Navbar/Logo";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto py-8"
    >
      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Two-Factor Security</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
          Enter the 6-digit authentication code sent to your registered phone or email
        </p>

        <div className="my-8 flex justify-center gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="h-12 w-11 sm:w-12 text-center rounded-2xl border border-slate-700 bg-[#0a1128] text-lg font-black text-white focus:border-[#00D2FF] focus:outline-none"
            />
          ))}
        </div>

        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <HiShieldCheck className="text-lg" />
          <span>Verify & Continue</span>
        </button>

        <p className="mt-6 text-xs text-slate-400">
          Didn't receive the code?{" "}
          <button className="text-[#00D2FF] hover:text-cyan-300 font-bold ml-1">
            Resend OTP
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default VerifyOTP;