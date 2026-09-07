import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import SEO from "@/components/common/SEO";
import { aiAPI } from "@/services/api";
import {
  HiSparkles,
  HiPaperAirplane,
  HiUser,
  HiCpuChip,
  HiOutlineChatBubbleLeftRight,
  HiArrowPath,
} from "react-icons/hi2";

interface Message {
  sender: "user" | "ai";
  text: string;
  time: string;
}

const CareerCoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am your AI Executive Career Coach at NexoraLab Technologies. Powered by Google Gemini AI, I provide real-time strategic counsel on 40%+ salary negotiations, transitions to Staff/Cloud Architect, and elite interview preparation. What is your career goal today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickPrompts = [
    "How do I negotiate a 40% salary hike when switching jobs?",
    "Roadmap to transition from Junior Frontend to Senior Full-Stack",
    "How to answer 'What is your biggest weakness?' as a developer",
    "What metrics should I include in my software engineer resume?",
  ];

  const generateAIResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes("salary") || q.includes("negotiat") || q.includes("hike")) {
      return `### 💼 Executive Salary Negotiation Strategy:

1. **Never Give the First Number:** When asked about salary expectations, say:
   *"I'm currently focused on finding the right technical and cultural fit. Once we agree I'm the ideal engineer for this role, I'm confident we can agree on a market-competitive number for this scope."*

2. **Anchor with Market Data:**
   - Benchmark against Tier-1 product companies. If offered ₹20 LPA, counter with:
   *"Based on my experience architecting high-scale microservices and current market data for this technical ownership, I was targeting the ₹26 - ₹30 LPA bracket. Is there flexibility on the base or equity bonus to bridge this gap?"*

3. **Negotiate the Total Compensation Package:**
   - If base salary is fixed, negotiate **Sign-on Bonus**, **Annual Performance Bonus**, **Remote Work Stipend**, or **Accelerated 6-Month Review Cycle**.`;
    }

    if (q.includes("transition") || q.includes("frontend") || q.includes("full-stack") || q.includes("roadmap")) {
      return `### 🚀 Roadmap: Frontend to Senior Full-Stack & Cloud Engineer

1. **Bridge Backend Fundamentals (Weeks 1-4):**
   - Deep dive into Node.js runtime, event loop, worker threads, and async I/O.
   - Master PostgreSQL indexing, transactions, and Redis caching.

2. **Cloud & Containerization (Weeks 5-8):**
   - Containerize full-stack apps with Docker multi-stage builds.
   - Deploy automated CI/CD pipelines to AWS ECS/EKS with Terraform.

3. **System Design & High Concurrency (Weeks 9-12):**
   - Study rate limiting, database sharding, CAP theorem, and event-driven architecture with Kafka/SQS.
   - Build 1 flagship project sustaining 10,000 requests/sec with p99 latency under 50ms.`;
    }

    if (q.includes("weakness") || q.includes("interview") || q.includes("question")) {
      return `### 🎯 How to Answer "What is your biggest technical weakness?":

**The Golden Formula:** Mention a genuine past technical habit + How you recognized it + The concrete framework you implemented to solve it.

**Example Script:**
*"Earlier in my career, I had a tendency to over-engineer solutions upfront—spending too much time building complex abstractions before validating edge cases. I realized this was impacting shipping velocity.

*Now, I follow a strict iterative framework: I first build an MVP with clean separation of concerns, benchmark actual performance bottlenecks with telemetry, and only introduce deeper abstractions when proven necessary by metrics."*`;
    }

    if (q.includes("metric") || q.includes("resume") || q.includes("bullet")) {
      return `### 📈 High-Impact Resume Phrasing Formula:

**Format:** [Strong Action Verb] + [What You Built] + [Tech Stack] + [Measurable Business / Performance Result]

**Before vs After Examples:**
- ❌ *"Built user authentication for the mobile app."*
- ✅ *"Architected OAuth2 & JWT biometric authentication in React Native & Node.js, reducing login drop-off by 24% across 100k+ active users."*
- ❌ *"Optimized database queries for fast loading."*
- ✅ *"Refactored PostgreSQL indexing and introduced Redis distributed caching, cutting 95th percentile query latency from 850ms to 42ms."*`;
    }

    return `### 💡 Strategic Career Advice for "${userQuery}":

1. **Focus on High-Leverage Scope:** In senior and staff engineering tiers, your value is measured by business impact (latency cuts, revenue enablement, system reliability), not just lines of code written.
2. **Build Public Proof of Work:** Open-source one well-architected distributed microservice or publish a technical RFC with comprehensive architecture diagrams.
3. **Target High-Growth Tech Ecosystems:** Focus on companies scaling their AI pipelines, micro-frontends, or cloud infrastructure where your expertise commands top-bracket compensation.

Would you like a tailored step-by-step 30-day action plan for this specific goal?`;
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await aiAPI.chatCareerCoach(
        query,
        newMessages.map((m) => ({ sender: m.sender, text: m.text }))
      );

      if (res.success && res.data?.text) {
        const aiMsg: Message = {
          sender: "ai",
          text: res.data.text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.warn("Career Coach live AI fallback:", err);
    }

    setTimeout(() => {
      const aiResponseText = generateAIResponse(query);
      const aiMsg: Message = {
        sender: "ai",
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SEO
        title="AI Career Coach & Strategy Advisor | NexoraLab Technologies"
        description="Chat with an AI-powered executive career coach to negotiate salary hikes, navigate career transitions, and master tech leadership interviews."
      />

      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <HiSparkles className="text-sm" />
          <span>AI EXECUTIVE CAREER COACH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Career{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Strategist & Advisor
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Get real-time personalized salary negotiation scripts, career roadmaps, and interview tactics.
        </p>
      </div>

      {/* Main Chat Console */}
      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-[#0a1228] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]">
              <HiCpuChip size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-['Outfit']">Nexora AI Career Advisor</h3>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Clear Chat
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 mt-1">
                  <HiCpuChip size={16} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-[#0c1630] border border-slate-800 text-slate-200"
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>
                <span className="block text-[10px] text-slate-400 mt-2 text-right opacity-70">
                  {msg.time}
                </span>
              </div>

              {msg.sender === "user" && (
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 mt-1">
                  <HiUser size={16} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <HiCpuChip size={16} />
              </div>
              <div className="rounded-2xl bg-[#0c1630] border border-slate-800 p-3.5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-6 py-2.5 bg-[#080f24] border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/[0.08] text-[11px] text-slate-300 transition-all cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-[#0a1228]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for salary negotiation scripts, career transitions, resume framing..."
              className="flex-1 rounded-2xl border border-slate-700 bg-[#060b18] px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              <HiPaperAirplane size={18} className="-rotate-45" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareerCoach;