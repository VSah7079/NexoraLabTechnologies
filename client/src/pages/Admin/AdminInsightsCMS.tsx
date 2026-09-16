import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiDocumentText,
  HiXMark,
  HiMagnifyingGlass,
  HiUser,
  HiClock,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";
import ImageUploadField from "@/components/admin/ImageUploadField";

const insightCategories = [
  "Web Engineering",
  "Artificial Intelligence",
  "Cloud & DevOps",
  "Mobile Architecture",
  "Cybersecurity & RBAC",
  "Enterprise Strategy",
];

const AdminInsightsCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Web Engineering",
    authorName: "Vivek Kumar",
    authorRole: "Principal Solutions Architect",
    readTime: "6 min read",
    imageUrl: "",
    description: "",
    content: "",
    tagsStr: "",
    order: 0,
    isActive: true,
  });

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("insights");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "in_1",
          title: "Building High-Performance Next.js 15 Web Applications in 2026",
          subtitle: "Server Components, Turbopack, and partial prerendering strategies for modern engineering teams",
          category: "Web Engineering",
          author: { name: "Vivek Kumar", role: "Principal Architect" },
          readTime: "6 min read",
          description: "A deep architectural dive into maximizing Core Web Vitals, structuring micro-frontends, and deploying globally distributed Next.js 15 systems.",
          tags: ["Next.js 15", "React 19", "Performance", "SaaS Architecture"],
          order: 1,
          isActive: true,
        },
        {
          _id: "in_2",
          title: "Architecting Private RAG & Multi-Agent Workflows for Enterprise",
          subtitle: "How to deploy autonomous AI agents without leaking proprietary intellectual property",
          category: "Artificial Intelligence",
          author: { name: "AI Research Pod", role: "NexoraLab AI Labs" },
          readTime: "8 min read",
          description: "Examining vector embeddings, hybrid semantic retrieval, guardrails, and deterministic routing for enterprise LLM applications.",
          tags: ["AI ATS", "FastAPI", "Vector Embeddings", "pgvector"],
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      category: insightCategories[0],
      authorName: "Vivek Kumar",
      authorRole: "Principal Solutions Architect",
      readTime: "5 min read",
      imageUrl: "",
      description: "",
      content: "",
      tagsStr: "",
      order: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      subtitle: item.subtitle || "",
      category: item.category || insightCategories[0],
      authorName: item.author?.name || item.authorName || "Vivek Kumar",
      authorRole: item.author?.role || item.authorRole || "Principal Solutions Architect",
      readTime: item.readTime || "5 min read",
      imageUrl: item.imageUrl || "",
      description: item.description || item.summary || "",
      content: item.content || "",
      tagsStr: Array.isArray(item.tags) ? item.tags.join(", ") : "",
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

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category,
      author: {
        name: formData.authorName.trim(),
        role: formData.authorRole.trim(),
      },
      readTime: formData.readTime.trim(),
      imageUrl: formData.imageUrl.trim(),
      description: formData.description.trim(),
      content: formData.content.trim(),
      tags,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("insights", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("insights", payload);
      }
      setIsModalOpen(false);
      fetchInsights();
    } catch (err: any) {
      alert(err.message || "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await adminService.deleteContent("insights", id);
      fetchInsights();
    } catch (err: any) {
      alert(err.message || "Failed to delete article");
    }
  };

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Engineering Insights & Blog CMS"
      subtitle="Publish technical whitepapers, architectural case studies, and engineering blog posts."
      badge="Publication Hub"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Write New Article</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#060c1c]/90 p-4 sm:p-5 backdrop-blur-xl">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <HiMagnifyingGlass size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search engineering articles..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#060c1c]/90 text-center space-y-2">
            <p className="text-sm font-bold text-white">No articles published yet.</p>
            <p className="text-xs text-slate-400">Click "Write New Article" to draft one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className={`rounded-3xl border p-5 backdrop-blur-xl transition space-y-4 flex flex-col justify-between ${
                  item.isActive !== false
                    ? "border-white/10 bg-[#060c1c]/90 hover:border-amber-500/40"
                    : "border-white/5 bg-[#060c1c]/40 opacity-60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <HiClock />
                      <span>{item.readTime || "5 min read"}</span>
                    </span>
                  </div>

                  {item.imageUrl && (
                    <div className="relative h-36 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-black text-white font-['Outfit']">{item.title}</h3>
                    {item.subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{item.subtitle}</p>}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <HiUser className="text-cyan-400" />
                    <span className="font-semibold">{item.author?.name || "NexoraLab Team"}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-[10px]">{item.author?.role || "Engineering"}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {item.description || item.content}
                  </p>

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className={`h-2 w-2 rounded-full ${item.isActive !== false ? "bg-emerald-400" : "bg-slate-500"}`} />
                    <span>{item.isActive !== false ? "Published" : "Draft"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 transition"
                      title="Edit Article"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Article"
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
                  {editingItem ? "Edit Article" : "Write Engineering Article"}
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
                  <label className="text-xs font-bold text-slate-300">Article Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Next.js 16 & React 19: Full-Stack Architecture in 2026"
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
                      {insightCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g. 6 min read"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Author Name</label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="e.g. Vivek Kumar"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Author Role</label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      placeholder="e.g. Principal Solutions Architect"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Subtitle / Hook</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Why modern full-stack dominates enterprise SaaS"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <ImageUploadField
                  label="Article Cover / Featured Graphic"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  placeholder="Paste direct image URL or upload article cover..."
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Executive Summary / Excerpt</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="A concise summary of the article..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Full Article Content (Markdown)</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    placeholder="Write or paste full article body in markdown..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tagsStr}
                    onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                    placeholder="Next.js, React, Architecture, Performance"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-slate-200">Publish to Live Website</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-bold text-white transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Article" : "Publish Article"}
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
