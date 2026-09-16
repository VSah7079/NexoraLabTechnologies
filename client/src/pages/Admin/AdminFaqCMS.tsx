import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiQuestionMarkCircle,
  HiXMark,
  HiMagnifyingGlass,
  HiChevronDown,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const faqCategories = [
  "Engineering & Tech",
  "Project Management",
  "Support & SLAs",
  "AI & Data Intelligence",
  "Pricing & Engagement Models",
];

const AdminFaqCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "Engineering & Tech",
    order: 0,
    isActive: true,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("faqs");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "faq_1",
          question: "What software engineering tech stacks does NexoraLab specialize in?",
          answer: "We specialize in React 19, Next.js 15, TypeScript, Node.js, Python FastAPI, Go (Golang), PostgreSQL, MongoDB, AWS Cloud Native, Docker, Kubernetes, Flutter, and React Native for mobile applications.",
          category: "Engineering & Tech",
          order: 1,
          isActive: true,
        },
        {
          _id: "faq_2",
          question: "How do you handle project timelines, sprints, and delivery?",
          answer: "We follow structured Agile / Scrum sprints with bi-weekly milestone demos, dedicated Slack / Teams communication channels, daily standups, and transparent Jira/GitHub project boards.",
          category: "Project Management",
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      question: "",
      answer: "",
      category: faqCategories[0],
      order: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      question: item.question || item.title || "",
      answer: item.answer || item.description || item.content || "",
      category: item.category || faqCategories[0],
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    setSaving(true);
    const payload = {
      title: formData.question.trim(),
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      description: formData.answer.trim(),
      category: formData.category,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("faqs", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("faqs", payload);
      }
      setIsModalOpen(false);
      fetchFaqs();
    } catch (err: any) {
      alert(err.message || "Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await adminService.deleteContent("faqs", id);
      fetchFaqs();
    } catch (err: any) {
      alert(err.message || "Failed to delete FAQ");
    }
  };

  const filteredItems = items.filter((item) => {
    const q = item.question || item.title || "";
    const a = item.answer || item.description || "";
    const matchesSearch =
      q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout
      title="Website FAQs CMS"
      subtitle="Create, organize, and publish frequently asked questions shown on the public site."
      badge="Knowledge Base"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Add New FAQ</span>
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
              placeholder="Search questions or answers..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#040814] px-3.5 py-2.5 text-xs font-bold text-slate-300 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {faqCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQs List */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#060c1c]/90 text-center space-y-2">
            <p className="text-sm font-bold text-white">No FAQs found.</p>
            <p className="text-xs text-slate-400">Click "Add New FAQ" to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, idx) => (
              <div
                key={item._id || item.id || idx}
                className={`rounded-2xl border p-5 backdrop-blur-xl transition space-y-3 ${
                  item.isActive !== false
                    ? "border-white/10 bg-[#060c1c]/90 hover:border-emerald-500/40"
                    : "border-white/5 bg-[#060c1c]/40 opacity-60"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Order: #{item.order || idx + 1}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mr-2">
                      <span className={`h-2 w-2 rounded-full ${item.isActive !== false ? "bg-emerald-400" : "bg-slate-500"}`} />
                      <span>{item.isActive !== false ? "Active" : "Draft"}</span>
                    </div>

                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition"
                      title="Edit FAQ"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete FAQ"
                    >
                      <HiTrash size={15} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    Q: {item.question || item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3 border-l-2 border-emerald-500/40">
                    {item.answer || item.description || item.content}
                  </p>
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
                  {editingItem ? "Edit FAQ" : "Add New FAQ"}
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
                  <label className="text-xs font-bold text-slate-300">Question</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="e.g. What software engineering tech stacks does NexoraLab specialize in?"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#040814] px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      {faqCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Detailed Answer</label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    rows={4}
                    placeholder="Provide a comprehensive answer for clients..."
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-slate-200">Active / Published</span>
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
                    {saving ? "Saving..." : editingItem ? "Update FAQ" : "Publish FAQ"}
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

export default AdminFaqCMS;
