import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiBriefcase,
  HiXMark,
  HiMagnifyingGlass,
  HiMapPin,
  HiClock,
  HiCurrencyDollar,
  HiAcademicCap,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const careerDepartments = [
  "Engineering",
  "AI & Data",
  "Design & Creative",
  "Product & Business",
  "Cloud & DevOps",
];

const AdminCareersCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    location: "Siwan, Bihar / Remote",
    jobType: "Full-Time",
    experience: "3+ Years",
    salary: "₹18 - ₹32 LPA",
    description: "",
    tagsStr: "React 19, Next.js 16, TypeScript, Node.js",
    responsibilitiesStr: "",
    requirementsStr: "",
    perksStr: "Top-tier compensation, 100% Remote flexibility, Health Insurance",
    order: 0,
    isActive: true,
  });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("careers");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "car_1",
          title: "Lead Full-Stack Architect (React 19 & Node.js)",
          department: "Engineering",
          location: "Siwan, Bihar / Remote",
          jobType: "Full-Time",
          experience: "5+ Years",
          salary: "₹18 - ₹32 LPA",
          tags: ["React 19", "Next.js 16", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
          description: "Direct technical architecture, code standards, and microservices design across high-concurrency client web applications.",
          responsibilities: [
            "Architect and scale modular full-stack web applications sustaining high concurrent throughput.",
            "Lead technical design reviews, database indexing strategies, and API contracts.",
            "Mentor developers and ensure strict type-safe TypeScript standards.",
          ],
          requirements: [
            "5+ years building high-scale React, Next.js, and Node.js systems.",
            "Deep mastery of PostgreSQL, Redis caching, Docker containerization, and AWS.",
          ],
          perks: ["Top-tier compensation + Annual Bonus", "100% Remote flexibility", "Full Health Insurance"],
          order: 1,
          isActive: true,
        },
        {
          _id: "car_2",
          title: "Senior AI & LLM Systems Engineer",
          department: "AI & Data",
          location: "Siwan, Bihar / Remote",
          jobType: "Full-Time",
          experience: "3+ Years",
          salary: "₹16 - ₹28 LPA",
          tags: ["Python", "FastAPI", "OpenAI / Claude API", "pgvector", "Pinecone"],
          description: "Engineer state-of-the-art semantic parsers, autonomous ATS scoring engines, and enterprise RAG pipelines.",
          responsibilities: [
            "Develop low-latency Python/FastAPI microservices for document OCR and semantic parsing.",
            "Engineer vector search pipelines with hybrid BM25 + cosine similarity indexing.",
          ],
          requirements: [
            "3+ years experience with Python, FastAPI, and generative AI architectures.",
            "Hands-on expertise with vector databases (Pinecone, pgvector, Milvus).",
          ],
          perks: ["High-performance GPU cloud clusters", "Proprietary AI research publishing"],
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      department: careerDepartments[0],
      location: "Siwan, Bihar / Remote",
      jobType: "Full-Time",
      experience: "3+ Years",
      salary: "Competitive / Market Standard",
      description: "",
      tagsStr: "React 19, TypeScript, Cloud",
      responsibilitiesStr: "Lead sprint milestones, build scalable modules",
      requirementsStr: "Strong problem solving, solid communication",
      perksStr: "Remote flexibility, health benefits, annual bonuses",
      order: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      department: item.department || item.category || careerDepartments[0],
      location: item.location || "Siwan, Bihar / Remote",
      jobType: item.jobType || item.type || "Full-Time",
      experience: item.experience || "3+ Years",
      salary: item.salary || "",
      description: item.description || "",
      tagsStr: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      responsibilitiesStr: Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : "",
      requirementsStr: Array.isArray(item.requirements) ? item.requirements.join("\n") : "",
      perksStr: Array.isArray(item.perks) ? item.perks.join("\n") : "",
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    const tags = formData.tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const responsibilities = formData.responsibilitiesStr
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const requirements = formData.requirementsStr
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const perks = formData.perksStr
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      category: formData.department,
      department: formData.department,
      location: formData.location.trim(),
      jobType: formData.jobType.trim(),
      experience: formData.experience.trim(),
      salary: formData.salary.trim(),
      description: formData.description.trim(),
      tags,
      responsibilities,
      requirements,
      perks,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("careers", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("careers", payload);
      }
      setIsModalOpen(false);
      fetchCareers();
    } catch (err: any) {
      alert(err.message || "Failed to save job position");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      await adminService.deleteContent("careers", id);
      fetchCareers();
    } catch (err: any) {
      alert(err.message || "Failed to delete job");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "all" || item.department === selectedDept || item.category === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <AdminLayout
      title="Careers & Job Openings CMS"
      subtitle="Publish, edit, and manage engineering job openings, salary ranges, and hiring criteria on the careers portal."
      badge="Talent Hub"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Post New Job Opening</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#060c1c]/90 p-4 sm:p-5 backdrop-blur-xl">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <HiMagnifyingGlass size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search open positions..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#040814] px-3.5 py-2.5 text-xs font-bold text-slate-300 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Departments</option>
              {careerDepartments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Positions Grid */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#060c1c]/90 text-center space-y-2">
            <p className="text-sm font-bold text-white">No job openings found.</p>
            <p className="text-xs text-slate-400">Click "Post New Job Opening" to add a position.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className={`rounded-3xl border p-6 backdrop-blur-xl transition space-y-4 flex flex-col justify-between ${
                  item.isActive !== false
                    ? "border-white/10 bg-[#060c1c]/90 hover:border-emerald-500/40"
                    : "border-white/5 bg-[#060c1c]/40 opacity-60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {item.department || item.category || "Engineering"}
                    </span>
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {item.jobType || "Full-Time"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white font-['Outfit']">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <HiMapPin className="text-cyan-400" />
                        <span>{item.location || "Siwan, Bihar / Remote"}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <HiAcademicCap className="text-amber-400" />
                        <span>{item.experience || "3+ Years"}</span>
                      </span>
                      {item.salary && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-emerald-300 flex items-center gap-0.5">
                            <HiCurrencyDollar />
                            <span>{item.salary}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className={`h-2 w-2 rounded-full ${item.isActive !== false ? "bg-emerald-400" : "bg-slate-500"}`} />
                    <span>{item.isActive !== false ? "Active Hiring" : "Closed / Draft"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition"
                      title="Edit Position"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Position"
                    >
                      <HiTrash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#060c1c] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-black text-white font-['Outfit']">
                  {editingItem ? "Edit Job Position" : "Post New Job Opening"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
                >
                  <HiXMark size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Job Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Lead Full-Stack Architect (React 19 & Node.js)"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#040814] px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      {careerDepartments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Employment Type</label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#040814] px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract / Sprint">Contract / Sprint</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Siwan, Bihar / Remote"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Experience</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g. 5+ Years"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Salary / CTC</label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="e.g. ₹18 - ₹32 LPA"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Role Overview</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Describe role impact, team focus, and mission..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Tech Stack Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tagsStr}
                    onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                    placeholder="React 19, TypeScript, PostgreSQL, Docker"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Key Responsibilities (One per line)
                  </label>
                  <textarea
                    value={formData.responsibilitiesStr}
                    onChange={(e) => setFormData({ ...formData, responsibilitiesStr: e.target.value })}
                    rows={3}
                    placeholder="Architect modular full-stack web applications&#10;Lead technical design reviews"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Qualifications & Requirements (One per line)
                  </label>
                  <textarea
                    value={formData.requirementsStr}
                    onChange={(e) => setFormData({ ...formData, requirementsStr: e.target.value })}
                    rows={3}
                    placeholder="5+ years production experience&#10;Deep mastery of PostgreSQL & Redis"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-slate-200">Active Hiring Status</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-xs font-bold text-white transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Position" : "Publish Job Opening"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCareersCMS;
