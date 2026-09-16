import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiDocumentText,
  HiXMark,
  HiClock,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const insightCategories = [
  "Artificial Intelligence",
  "Cloud & DevOps",
  "Frontend Architecture",
  "Backend & Distributed Systems",
  "Tech Hiring & ATS Engineering",
];

const AdminInsightsCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Artificial Intelligence",
    excerpt: "",
    content: "",
    authorName: "Vikram Sah",
    readTime: "5 min read",
    tags: "GenAI, LLM, Vector Search",
    isActive: true,
  });

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("insight");
      if (res.success && res.items && res.items.length > 0) {
        setItems(res.items);
      } else {
        setItems([
          {
            _id: "ins_1",
            title: "Scaling Generative AI Agents on AWS with pgvector & Gemini",
            category: "Artificial Intelligence",
            excerpt: "A deep dive into sub-100ms vector search architectures and enterprise retrieval augmented generation.",
            author: { name: "Vikram Sah", role: "Founder & Principal Architect" },
            readTime: "7 min read",
            tags: ["GenAI", "AWS", "FastAPI"],
            isActive: true,
            createdAt: new Date().toISOString(),
          },
          {
            _id: "ins_2",
            title: "React 19 vs Next.js: Modern Frontend Benchmarks 2026",
            category: "Frontend Architecture",
            excerpt: "Comparing server actions, bundle sizes, and hydration latency across enterprise production apps.",
            author: { name: "Engineering Team", role: "Frontend Pod" },
            readTime: "5 min read",
            tags: ["React 19", "Next.js", "Performance"],
            isActive: true,
            createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          },
        ]);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Artificial Intelligence",
      excerpt: "",
      content: "",
      authorName: "Vikram Sah",
      readTime: "5 min read",
      tags: "GenAI, LLM, Vector Search",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "Artificial Intelligence",
      excerpt: item.excerpt || "",
      content: item.content || "",
      authorName: item.author?.name || "Vikram Sah",
      readTime: item.readTime || "5 min read",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Title is required.");

    const payload = {
      title: formData.title,
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      author: { name: formData.authorName },
      readTime: formData.readTime,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("insight", editingItem._id, payload);
        setItems((prev) =>
          prev.map((i) => (i._id === editingItem._id ? { ...i, ...payload } : i))
        );
      } else {
        const res = await adminService.createContent("insight", payload);
        if (res.item) {
          setItems((prev) => [res.item, ...prev]);
        } else {
          setItems((prev) => [{ _id: "ins_" + Date.now(), ...payload, createdAt: new Date().toISOString() }, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Error saving article: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await adminService.deleteContent("insight", id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      alert("Error deleting article: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Engineering Insights & Blogs CMS"
      subtitle="Publish technical whitepapers, architectural deep-dives, and engineering thought leadership."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Articles: <strong className="text-white">{items.length}</strong>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition cursor-pointer"
          >
            <HiPlus size={16} />
            <span>Write New Article</span>
          </button>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-white/10 bg-[#060b18]/85 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 text-[10px] font-bold text-blue-300">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <HiClock />
                    <span>{item.readTime || "5 min read"}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{item.excerpt}</p>

                <div className="text-[11px] text-slate-400 font-medium">
                  By <span className="text-white font-bold">{item.author?.name || "NexoraLab Author"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${item.isActive ? "text-emerald-400" : "text-slate-500"}`}>
                  {item.isActive ? "Published Live" : "Draft"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                    title="Edit Article"
                  >
                    <HiPencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Delete Article"
                  >
                    <HiTrash size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#060b18] p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Article" : "Write New Technical Article"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <HiXMark size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Article Headline *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Scaling Generative AI Agents on AWS with pgvector"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500"
                    >
                      {insightCategories.map((c) => (
                        <option key={c} value={c} className="bg-[#0b132b]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Author Name</label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="Vikram Sah"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Excerpt / Brief Preview *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short engaging summary shown in blog card listings..."
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Article Body Content</label>
                  <textarea
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your technical article body..."
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Reading Time Estimate</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Tags (Comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="GenAI, Architecture, AWS"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-bold text-slate-300 hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-2.5 font-bold text-white shadow-lg transition hover:scale-105 cursor-pointer"
                  >
                    Publish Article
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

export default AdminInsightsCMS;
