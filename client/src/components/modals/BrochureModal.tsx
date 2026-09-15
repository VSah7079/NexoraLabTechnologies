import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiUser, HiEnvelope, HiPhone, HiCheckCircle } from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const BrochureModal: React.FC = () => {
  const { isBrochureModalOpen, closeBrochureModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Full name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 8) {
      newErrors.phone = "Please enter a valid contact number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch {
      setErrors({ global: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeBrochureModal();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", countryCode: "+91", phone: "" });
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isBrochureModalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#070e1e] p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <HiXMark className="text-lg" />
            </button>

            {isSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4">
                  <HiCheckCircle className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">Brochure Sent!</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300">
                  We've emailed our comprehensive corporate capabilities brochure to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:brightness-110"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                    ✦ Corporate Profile
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">Request Company Brochure</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Download our complete services, case studies, technology stacks, and enterprise capabilities deck.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative flex items-center">
                      <HiUser className="absolute left-3 text-slate-400 text-sm pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={`w-full rounded-xl border bg-slate-900/80 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#00D2FF] ${
                          errors.name ? "border-rose-500" : "border-white/10"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Work Email *
                    </label>
                    <div className="relative flex items-center">
                      <HiEnvelope className="absolute left-3 text-slate-400 text-sm pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className={`w-full rounded-xl border bg-slate-900/80 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#00D2FF] ${
                          errors.email ? "border-rose-500" : "border-white/10"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Country
                      </label>
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 px-2 text-xs sm:text-sm text-white outline-none focus:border-[#00D2FF]"
                      >
                        <option value="+91">IN (+91)</option>
                        <option value="+1">US (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+971">UAE (+971)</option>
                        <option value="+65">SG (+65)</option>
                        <option value="+61">AU (+61)</option>
                        <option value="+49">DE (+49)</option>
                      </select>
                    </div>

                    <div className="col-span-7">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Phone *
                      </label>
                      <div className="relative flex items-center">
                        <HiPhone className="absolute left-3 text-slate-400 text-sm pointer-events-none" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Contact number"
                          className={`w-full rounded-xl border bg-slate-900/80 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#00D2FF] ${
                            errors.phone ? "border-rose-500" : "border-white/10"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending Brochure..." : "Download Brochure Now →"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureModal;
