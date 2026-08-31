import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const Interview = () => {
  const [mode, setMode] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = {
    technical: [
      "What is the difference between == and === in JavaScript?",
      "Explain the concept of closures in JavaScript.",
      "What is the virtual DOM in React?",
    ],
    hr: [
      "Tell me about yourself.",
      "Why do you want to work with us?",
      "Where do you see yourself in 5 years?",
    ],
    behavioral: [
      "Tell me about a time you faced a challenge at work.",
      "How do you handle conflicts with team members?",
      "Describe a situation where you showed leadership.",
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
      className="max-w-4xl mx-auto py-10"
    >
      <SEO
        title="AI Mock Interview Prep | Practice Technical Questions - NexoraLab"
        description="Prepare for technical, behavioral, and system design interviews with our real-time interactive AI mock interviewer and get detailed feedback."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">AI Mock Interview</h1>
      <p className="text-gray-500 text-center mt-2">
        Practice with AI-powered mock interviews
      </p>

      {!started ? (
        <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
          <p className="text-sm text-gray-600 text-center">Select interview type:</p>
          <div className="grid grid-cols-3 gap-4">
            {["technical", "hr", "behavioral"].map((type) => (
              <button
                key={type}
                onClick={() => setMode(type)}
                className={`py-3 rounded-xl font-medium transition-all duration-300 ${
                  mode === type
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
                    : "border border-gray-300 text-gray-700 hover:border-cyan-400 hover:bg-cyan-50"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={handleStart}
            disabled={!mode}
            className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
              mode
                ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions[mode as keyof typeof questions]?.length}
            </span>
            <span className="text-sm text-cyan-600 font-medium">{mode} Interview</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-lg text-gray-900">
              {questions[mode as keyof typeof questions]?.[currentQuestion]}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <textarea
              rows={4}
              placeholder="Type your answer here..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className={`rounded-xl px-6 py-2.5 text-sm font-medium ${
                  currentQuestion === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
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
                className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                {currentQuestion < (questions[mode as keyof typeof questions]?.length || 0) - 1
                  ? "Next Question"
                  : "Finish Interview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Interview;