import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiArrowRight, HiArrowLeft, HiMicrophone } from "react-icons/hi2";

const Interview = () => {
  const [mode, setMode] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = {
    technical: [
      "Explain how React 19 concurrent rendering works under high load and how Server Components differ from client hydration.",
      "How do you architect distributed microservices with zero downtime and idempotency across async message queues?",
      "Describe your approach to database indexing and query optimization on a 50-million row PostgreSQL database.",
    ],
    hr: [
      "Walk us through your engineering leadership approach and how you manage high-stakes milestone deadlines.",
      "Why is NexoraLab Technologies the ideal ecosystem for your next career trajectory?",
      "Describe a technical decision where you had to push back against executive leadership with data.",
    ],
    behavioral: [
      "Describe an incident where a production outage occurred on your watch and how you orchestrated the post-mortem.",
      "How do you mentor junior developers to write clean, type-safe, and self-documenting code?",
      "How do you balance aggressive product shipping velocity with long-term engineering debt mitigation?",
    ],
  };

  const handleStart = () => {
    if (mode) {
      setStarted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <SEO
        title="AI Mock Interview Prep | Practice Technical Questions - NexoraLab"
        description="Prepare for technical, behavioral, and system design interviews with our real-time interactive AI mock interviewer and get detailed feedback."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>REAL-TIME INTERVIEW SIMULATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Mock Technical{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Interview Studio
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Simulate realistic hiring rounds with dynamic question generators, live feedback, and response scoring.
        </p>
      </div>

      {!started ? (
        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
          <p className="text-xs sm:text-sm font-semibold text-slate-300 text-center">
            Select an interview discipline:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "technical", label: "Technical & Arch", icon: "💻" },
              { id: "hr", label: "Executive / HR", icon: "👔" },
              { id: "behavioral", label: "Leadership & Scenarios", icon: "🧠" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`p-5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  mode === item.id
                    ? "border-[#00D2FF] bg-[#0b132b] shadow-lg shadow-cyan-500/20 scale-105"
                    : "border-slate-800 bg-[#0a1128]/70 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="font-bold text-sm text-white">{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleStart}
            disabled={!mode}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-all duration-300 ${
              mode
                ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <span>Begin Mock Session</span>
            <HiArrowRight />
          </button>
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Question {currentQuestion + 1} of {questions[mode as keyof typeof questions]?.length}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#070e1b] px-3 py-1 text-xs font-bold text-cyan-400 capitalize">
              <HiMicrophone className="text-xs" /> {mode} Round
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/95 p-6">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {questions[mode as keyof typeof questions]?.[currentQuestion]}
            </h3>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Your Structured Technical Response *
            </label>
            <textarea
              rows={5}
              placeholder="Structure your answer with STAR methodology (Situation, Task, Action, Result) or technical architecture points..."
              className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold transition-all ${
                currentQuestion === 0
                  ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                  : "border border-slate-700 bg-[#0a1128] text-slate-200 hover:border-[#00D2FF]"
              }`}
            >
              <HiArrowLeft /> Previous Question
            </button>
            <button
              onClick={() => {
                if (currentQuestion < (questions[mode as keyof typeof questions]?.length || 0) - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  setStarted(false);
                  setCurrentQuestion(0);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>
                {currentQuestion < (questions[mode as keyof typeof questions]?.length || 0) - 1
                  ? "Next Question"
                  : "Submit & Complete Mock"}
              </span>
              <HiArrowRight />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Interview;