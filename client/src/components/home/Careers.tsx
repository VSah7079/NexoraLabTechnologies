import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/common/SEO";
import { 
  HiBriefcase, 
  HiMapPin,
  HiClock, 
  HiArrowRight,
  HiUsers,
  HiRocketLaunch,
  HiHeart,
  HiLightBulb,
  HiChartBar,
  HiCheckCircle,
  HiEnvelope,
  HiPhone
} from "react-icons/hi2";

const openPositions = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Siwan, Bihar (Remote)",
    type: "Full-Time",
    experience: "5+ Years",
    description: "We're looking for an experienced Full Stack Developer to lead our development team and build scalable web applications.",
    responsibilities: [
      "Design and develop scalable web applications",
      "Lead technical architecture decisions",
      "Mentor junior developers",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Participate in code reviews"
    ],
    requirements: [
      "5+ years of experience in Full Stack Development",
      "Expertise in React, Next.js, Node.js, TypeScript",
      "Experience with MongoDB, PostgreSQL, AWS",
      "Strong understanding of system design",
      "Excellent communication skills",
      "Bachelor's degree in Computer Science or related field"
    ],
    perks: [
      "Competitive Salary",
      "Flexible Work Hours",
      "Remote Work Option",
      "Learning & Development Budget",
      "Health Insurance",
      "Annual Performance Bonus"
    ]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Siwan, Bihar (Remote)",
    type: "Full-Time",
    experience: "3+ Years",
    description: "We're seeking a creative UI/UX Designer to craft beautiful and intuitive user experiences for our clients.",
    responsibilities: [
      "Create user-centered designs",
      "Conduct user research and usability testing",
      "Design wireframes, prototypes, and mockups",
      "Collaborate with developers and product managers",
      "Maintain design systems",
      "Present design concepts to stakeholders"
    ],
    requirements: [
      "3+ years of experience in UI/UX Design",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Strong portfolio demonstrating design skills",
      "Understanding of responsive design principles",
      "Experience with user research methods",
      "Excellent visual design skills"
    ],
    perks: [
      "Competitive Salary",
      "Creative Environment",
      "Flexible Work Hours",
      "Professional Development",
      "Health Insurance",
      "Design Tools Budget"
    ]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Siwan, Bihar (Remote)",
    type: "Full-Time",
    experience: "4+ Years",
    description: "Join our team as a DevOps Engineer to build and maintain our cloud infrastructure and CI/CD pipelines.",
    responsibilities: [
      "Design and maintain cloud infrastructure",
      "Build and optimize CI/CD pipelines",
      "Implement monitoring and alerting systems",
      "Ensure security best practices",
      "Automate deployment processes",
      "Troubleshoot production issues"
    ],
    requirements: [
      "4+ years of DevOps experience",
      "Expertise in AWS, Docker, Kubernetes",
      "Experience with CI/CD tools (GitHub Actions, Jenkins)",
      "Knowledge of infrastructure as code (Terraform)",
      "Strong scripting skills (Python, Bash)",
      "Understanding of security best practices"
    ],
    perks: [
      "Competitive Salary",
      "Remote Work",
      "Flexible Hours",
      "Cloud Certification Budget",
      "Health Insurance",
      "Annual Performance Bonus"
    ]
  },
  {
    id: 4,
    title: "Business Analyst",
    department: "Business",
    location: "Siwan, Bihar (On-site)",
    type: "Full-Time",
    experience: "2+ Years",
    description: "We're looking for a Business Analyst to bridge the gap between our clients and development team.",
    responsibilities: [
      "Gather and analyze business requirements",
      "Create functional specifications",
      "Facilitate communication between stakeholders",
      "Conduct market research and analysis",
      "Assist in project planning",
      "Monitor project progress"
    ],
    requirements: [
      "2+ years of experience as a Business Analyst",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation skills",
      "Experience with Agile methodologies",
      "Knowledge of business process modeling",
      "Bachelor's degree in Business or related field"
    ],
    perks: [
      "Competitive Salary",
      "Growth Opportunities",
      "Training Programs",
      "Performance Bonuses",
      "Health Insurance",
      "Work-Life Balance"
    ]
  },
  {
    id: 5,
    title: "React Native Developer",
    department: "Engineering",
    location: "Siwan, Bihar (Remote)",
    type: "Full-Time",
    experience: "3+ Years",
    description: "Join our team to build cross-platform mobile applications using React Native.",
    responsibilities: [
      "Develop cross-platform mobile applications",
      "Write clean, maintainable code",
      "Optimize app performance",
      "Collaborate with UI/UX designers",
      "Implement mobile app features",
      "Publish apps to App Store and Play Store"
    ],
    requirements: [
      "3+ years of React Native experience",
      "Knowledge of JavaScript/TypeScript",
      "Experience with state management (Redux)",
      "Understanding of mobile app design patterns",
      "Experience with Firebase or similar",
      "Published apps on App Store/Play Store"
    ],
    perks: [
      "Competitive Salary",
      "Remote Work",
      "Flexible Hours",
      "Learning Budget",
      "Health Insurance",
      "Annual Bonus"
    ]
  },
  {
    id: 6,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Siwan, Bihar (On-site)",
    type: "Full-Time",
    experience: "2+ Years",
    description: "We're looking for a Digital Marketing Specialist to help grow our brand and drive engagement.",
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage social media accounts",
      "Create engaging content",
      "Analyze marketing metrics",
      "Run paid advertising campaigns",
      "Build brand awareness"
    ],
    requirements: [
      "2+ years of Digital Marketing experience",
      "Experience with SEO, SEM, and social media",
      "Strong content creation skills",
      "Analytical mindset",
      "Knowledge of marketing tools (Google Analytics)",
      "Excellent communication skills"
    ],
    perks: [
      "Competitive Salary",
      "Creative Environment",
      "Training Programs",
      "Performance Bonuses",
      "Health Insurance",
      "Work-Life Balance"
    ]
  }
];

const Careers = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/careers";
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const departments = ["all", ...new Set(openPositions.map(job => job.department.toLowerCase()))];

  const filteredJobs = activeTab === "all" 
    ? openPositions 
    : openPositions.filter(job => job.department.toLowerCase() === activeTab);

  const selectedJobData = openPositions.find(job => job.id === selectedJob);

  return (
    <section className="relative overflow-hidden bg-transparent min-h-screen py-16 md:py-20 lg:py-28 transition-colors duration-300">
      {isStandalone && (
        <SEO
          title="Join Our Team | Careers at NexoraLab Technologies"
          description="Build the future of digital software and AI platforms. Explore job openings, remote work options, and career opportunities at NexoraLab Technologies."
        />
      )}
      {/* Background Effects - Removed to show NetworkBackground */}

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-cyan-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Join Our Team
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Build Your
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Career With Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed"
          >
            Join a team of passionate innovators building the future of technology.
            We're looking for talented individuals who want to make an impact.
          </motion.p>
        </div>

        {/* Why Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {[
            { icon: <HiRocketLaunch />, label: "Innovative Projects", color: "from-cyan-400 to-blue-500" },
            { icon: <HiUsers />, label: "Great Team Culture", color: "from-blue-500 to-violet-500" },
            { icon: <HiHeart />, label: "Work-Life Balance", color: "from-violet-500 to-purple-500" },
            { icon: <HiLightBulb />, label: "Learning & Growth", color: "from-purple-500 to-cyan-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="rounded-2xl border border-white/20 bg-white/10 p-5 md:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/20 hover:shadow-[0_10px_40px_rgba(34,211,238,.15)]"
            >
              <div className={`text-3xl md:text-4xl bg-linear-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.icon}
              </div>
              <h3 className="mt-3 text-sm md:text-base font-bold text-gray-900">{item.label}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Open Positions */}
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Open Positions
              <span className="ml-2 text-sm text-cyan-600">({filteredJobs.length})</span>
            </h2>
            
            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveTab(dept)}
                  className={`
                    rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300
                    ${activeTab === dept
                      ? "bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
                      : "border border-white/20 bg-white/10 text-gray-600 backdrop-blur-sm hover:border-cyan-400/50 hover:bg-white/20 hover:text-cyan-600"
                    }
                  `}
                >
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards - Enhanced Glass Effect */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ 
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 md:p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/20 hover:shadow-[0_15px_50px_rgba(34,211,238,.15)]"
              >
                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Shimmer Border Effect */}
                <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-sm text-cyan-500 font-medium">{job.department}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-500/20">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <HiMapPin className="text-cyan-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <HiClock className="text-cyan-500" />
                      {job.experience}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.requirements.slice(0, 3).map((req) => (
                      <span 
                        key={req} 
                        className="rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-sm px-2.5 py-1 text-[10px] text-cyan-700 font-medium"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="text-[10px] text-cyan-500 font-medium bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        +{job.requirements.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-xs text-cyan-500 font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      Apply Now
                    </span>
                    <button
                      onClick={() => {
                        setSelectedJob(job.id);
                        setShowApplicationForm(true);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,.2)] group-hover:rotate-12"
                    >
                      <HiArrowRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && selectedJobData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
            >
              <button
                onClick={() => setShowApplicationForm(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedJobData.title}</h2>
              <p className="mt-1 text-sm text-cyan-500">{selectedJobData.department}</p>

              <form className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">LinkedIn Profile</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us why you're interested in this role..."
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Resume / CV</label>
                  <div className="mt-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/10 backdrop-blur-sm p-6 hover:border-cyan-400/50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📄</div>
                      <p className="text-sm text-gray-500">Drop your resume here or click to browse</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Company Culture */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
              Our Culture
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Built on Innovation & Trust
              </span>
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {[
                {
                  icon: "🚀",
                  title: "Innovation First",
                  desc: "We encourage creative thinking and innovative solutions.",
                  color: "from-cyan-400 to-blue-500"
                },
                {
                  icon: "🤝",
                  title: "Collaborative Culture",
                  desc: "Teamwork and open communication drive our success.",
                  color: "from-blue-500 to-violet-500"
                },
                {
                  icon: "📈",
                  title: "Continuous Growth",
                  desc: "Learning and development opportunities for everyone.",
                  color: "from-violet-500 to-cyan-400"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/20 hover:shadow-[0_10px_40px_rgba(34,211,238,.1)]"
                >
                  <div className={`text-4xl bg-linear-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-3xl border border-white/20 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 backdrop-blur-xl p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Don't See a Role That Fits?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:careers@nexoralabtechnologies.in"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,.3)]"
              >
                <HiEnvelope className="text-lg" />
                careers@nexoralabtech.in
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white/20"
              >
                <HiPhone className="text-lg" />
                +91 98765 43210
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;