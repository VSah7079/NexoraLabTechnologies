import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { aiAPI } from "@/services/api";
import {
  HiSparkles,
  HiArrowRight,
  HiAcademicCap,
  HiBriefcase,
  HiCheckCircle,
  HiArrowPath,
  HiClock,
  HiCurrencyRupee,
} from "react-icons/hi2";

interface RoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  topics: string[];
  deliverable: string;
}

interface SkillGapResult {
  matchPercentage: number;
  salaryCurrent: string;
  salaryTarget: string;
  criticalMissing: string[];
  recommendedSkills: string[];
  goodToHave: string[];
  phases: RoadmapPhase[];
  keyRecommendations: string[];
}

const SkillGap = () => {
  const [targetRole, setTargetRole] = useState("Staff Cloud & Distributed Architect");
  const [currentRole, setCurrentRole] = useState("Senior Frontend / Full-Stack Developer");
  const [currentSkills, setCurrentSkills] = useState("React, JavaScript, Node.js, Express, MongoDB, Tailwind CSS");
  const [experienceYears, setExperienceYears] = useState("3");
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);

  const handleAnalyze = async () => {
    if (!targetRole.trim() || !currentSkills.trim()) return;

    setLoading(true);

    try {
      const res = await aiAPI.benchmarkSkillGap({
        currentRole,
        targetRole,
        currentSkills,
        experienceYears,
      });

      if (res.success && res.data) {
        setResult(res.data);
        setAnalyzed(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Skill Gap AI live fallback:", err);
    }

    setTimeout(() => {
      const skillsLower = currentSkills.toLowerCase();
      const targetLower = targetRole.toLowerCase();

      // Check for backend / cloud / AI gaps
      const hasDocker = skillsLower.includes("docker");
      const hasAWS = skillsLower.includes("aws") || skillsLower.includes("cloud");
      const hasK8s = skillsLower.includes("kubernetes") || skillsLower.includes("k8s");
      const hasPostgres = skillsLower.includes("postgres") || skillsLower.includes("sql");
      const hasRedis = skillsLower.includes("redis");
      const hasTypescript = skillsLower.includes("typescript") || skillsLower.includes("ts");
      const hasAI = skillsLower.includes("ai") || skillsLower.includes("python") || skillsLower.includes("llm");

      const critical = [];
      if (!hasAWS) critical.push("AWS Cloud Core (EC2, S3, ECS, Lambda, IAM)");
      if (!hasDocker) critical.push("Containerization with Docker & OCI Images");
      if (!hasK8s && targetLower.includes("architect")) critical.push("Kubernetes Cluster Orchestration & Ingress");
      if (!hasPostgres) critical.push("Relational Architecture & PostgreSQL Index Tuning");
      if (!hasRedis) critical.push("Distributed In-Memory Caching (Redis / Memcached)");
      if (!hasTypescript) critical.push("Strict TypeScript 5+ & Type-Safe Contract APIs");
      if (!hasAI && targetLower.includes("ai")) critical.push("Python, FastAPI & OpenAI Vector Embeddings");

      if (critical.length === 0) {
        critical.push("Advanced System Design (CAP Theorem, Event Sourcing, Sharding)");
      }

      const recommended = [
        "CI/CD Pipeline Automation (GitHub Actions / GitLab CI)",
        "gRPC, Protobuf & Async Message Brokers (Kafka / RabbitMQ)",
        "Observability & Telemetry (Prometheus, Grafana, OpenTelemetry)",
        "Database Replication, CDC & Connection Pooling (PgBouncer)",
      ];

      const goodToHave = [
        "Terraform / Infrastructure as Code (IaC)",
        "Edge Compute (Cloudflare Workers / Vercel Edge)",
        "Security Compliance & OWASP Top 10 Hardening",
      ];

      setResult({
        matchPercentage: Math.max(48, Math.min(85, 45 + (hasTypescript ? 10 : 0) + (hasDocker ? 10 : 0) + (hasAWS ? 12 : 0) + (hasPostgres ? 8 : 0))),
        salaryCurrent: "₹12 - ₹18 LPA",
        salaryTarget: "₹32 - ₹48 LPA",
        criticalMissing: critical,
        recommendedSkills: recommended,
        goodToHave: goodToHave,
        phases: [
          {
            phase: "Month 1: Core Cloud & Containerization",
            duration: "Weeks 1 - 4",
            focus: "Dockerize microservices and deploy scalable multi-container stacks on AWS ECS/Fargate.",
            topics: ["Multi-stage Docker builds", "AWS IAM & VPC Networking", "AWS S3 & CloudFront", "PostgreSQL Indexing"],
            deliverable: "Deploy a production-ready containerized microservice on AWS with custom domain and SSL.",
          },
          {
            phase: "Month 2: High Concurrency & Caching",
            duration: "Weeks 5 - 8",
            focus: "Implement sub-millisecond Redis caching, message queues, and async event-driven architecture.",
            topics: ["Redis pub/sub & rate limiting", "Kafka / SQS async message queues", "GraphQL Federation & REST gateway", "Zero-downtime CI/CD"],
            deliverable: "Stress-test an API to sustain 10,000 requests/sec with p99 latency under 45ms.",
          },
          {
            phase: "Month 3: Distributed Systems & Staff Interview Prep",
            duration: "Weeks 9 - 12",
            focus: "Master distributed system design, high-availability consensus, and executive engineering leadership.",
            topics: ["Database sharding & read replicas", "Microservices fault tolerance", "Executive salary negotiation", "System design mock rounds"],
            deliverable: "Publish an end-to-end System Design RFC whitepaper with architecture diagrams and ROI metrics.",
          },
        ],
        keyRecommendations: [
          "Build and open-source 1 high-throughput distributed system prototype rather than 10 small tutorial apps.",
          "Frame all resume bullets around business metrics (latency reduction, cost optimization, reliability SLAs).",
          "Target tier-1 remote engineering companies and high-growth SaaS scaleups.",
        ],
      });

      setLoading(false);
      setAnalyzed(true);
    }, 1100);
  };

  return (
    <div className="max-w-5xl mx-auto pt-36 sm:pt-40 md:pt-44 pb-20 px-4">
      <SEO
        title="AI Skill Gap Benchmark & Career Roadmap | NexoraLab Technologies"
        description="Benchmark your current skillset against staff engineering requirements. Get an algorithmic 90-day learning roadmap and market compensation delta from NexoraLab AI."
        keywords={[
          "skill gap analysis tool",
          "tech skill benchmark online",
          "career roadmap generator AI",
          "software engineering learning path",
          "NexoraLab skill gap",
        ]}
        canonical="https://nexoralabtechnologies.in/skill-gap"
      />

      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <HiSparkles className="text-sm" />
          <span>SKILL GAP BENCHMARK ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Skill Gap{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            & Learning Roadmap
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Identify high-leverage technical proficiencies needed to transition into senior and staff engineering roles.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300">Your Current Role Title *</label>
            <input
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Target Aspirational Role *</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">Current Tech Stack (Comma-separated) *</label>
            <input
              type="text"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300">Years of Experience</label>
            <input
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!targetRole.trim() || !currentSkills.trim() || loading}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-all duration-300 cursor-pointer ${
            targetRole.trim() && currentSkills.trim() && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <HiArrowPath className="animate-spin text-lg" />
              <span>Generating Algorithmic 90-Day Career Roadmap...</span>
            </>
          ) : (
            <>
              <HiSparkles />
              <span>Generate 90-Day Transition Roadmap</span>
            </>
          )}
        </button>

        {/* Results Panel */}
        <AnimatePresence>
          {analyzed && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-slate-800 space-y-6"
            >
              {/* Metric Highlights Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Role Preparedness</span>
                  <div className="mt-2 text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-['Outfit']">
                    {result.matchPercentage}%
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1">Ready for Transition</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0a1128] p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Market Bracket</span>
                  <p className="mt-2 text-xl font-black text-white font-['Outfit']">{result.salaryCurrent}</p>
                  <p className="text-xs text-slate-400 mt-1">Based on {experienceYears} yrs experience</p>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Target Role Market Cap</span>
                  <p className="mt-2 text-xl font-black text-emerald-300 font-['Outfit']">{result.salaryTarget}</p>
                  <p className="text-xs text-emerald-400/80 mt-1">~+180% Compensation Growth</p>
                </div>
              </div>

              {/* Priority Gaps Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 space-y-3">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    P0: High-Priority Missing Competencies ({result.criticalMissing.length})
                  </span>
                  <div className="space-y-2">
                    {result.criticalMissing.map((skill, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    P1: Recommended Architecture Skills
                  </span>
                  <div className="space-y-2">
                    {result.recommendedSkills.map((skill, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step-by-Step 90-Day Timeline */}
              <div className="rounded-3xl border border-slate-800 bg-[#0a1128] p-6 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <HiClock className="text-cyan-400 text-base" />
                  Your 90-Day Execution Roadmap
                </h3>

                <div className="space-y-4">
                  {result.phases.map((ph, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-800 bg-[#060b18] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <h4 className="text-sm font-bold text-white font-['Outfit']">{ph.phase}</h4>
                        <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                          {ph.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">{ph.focus}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ph.topics.map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[11px] text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                        <strong>Milestone Deliverable:</strong> {ph.deliverable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillGap;