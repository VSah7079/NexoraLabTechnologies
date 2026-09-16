import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiBookOpen,
  HiXMark,
  HiMagnifyingGlass,
  HiArrowTopRightOnSquare,
  HiDocumentArrowDown,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";
import ImageUploadField from "@/components/admin/ImageUploadField";

const resourceCategories = [
  "Guides & Engineering Blogs",
  "Interactive AI Tools",
  "Cloud & IaC Blueprints",
  "Security & Compliance Standards",
  "Corporate Decks & Downloads",
];

const AdminResourcesCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: resourceCategories[0],
    description: "",
    badge: "Engineering Hub",
    imageUrl: "",
    link: "/insights",
    linkLabel: "Explore Resource",
    highlightsStr: "",
    techTagsStr: "",
    order: 0,
    isActive: true,
  });

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("resources");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "res_1",
          title: "Startup MVP Launchpad Guide (30-Day Blueprint)",
          subtitle: "Step-by-step roadmap to build, test, and ship scalable digital products in 30 days",
          category: "Guides & Engineering Blogs",
          badge: "Startup Guide",
          link: "/quote",
          linkLabel: "Plan Your Startup MVP",
          description: "A proven startup execution framework covering product scoping, technical stack selection, agile sprint cadence, and cost-effective cloud setup.",
          highlights: ["30-Day Sprint Calendar", "Tech Stack Decision Tree", "CI/CD Setup on $50/mo", "User Feedback Loops"],
          techTags: ["MVP Strategy", "Agile", "Flutter", "Supabase"],
          order: 1,
          isActive: true,
        },
        {
          _id: "res_2",
          title: "Monolith to Microservices Scaling Architecture",
          subtitle: "Monolith-to-microservices migration patterns, Kubernetes Helm, and API gateways",
          category: "Cloud & IaC Blueprints",
          badge: "Architecture IaC",
          link: "/services",
          linkLabel: "View Cloud Blueprints",
          description: "Comprehensive migration patterns to break monolithic legacy backends into domain-driven microservices with zero downtime and distributed tracing.",
          highlights: ["Database De-Coupling Playbook", "Event-Driven Sagas with Kafka", "Canary Deployment Templates"],
          techTags: ["Kubernetes", "Microservices", "Kafka", "AWS EKS"],
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      category: resourceCategories[0],
      description: "",
      badge: "Engineering Hub",
      imageUrl: "",
      link: "/insights",
      linkLabel: "Explore Resource",
      highlightsStr: "Next.js 16 Deep-Dive, Kafka Microservices, Sub-50ms API Latency",
      techTagsStr: "Next.js, Microservices, Cloud, AI",
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
      category: item.category || resourceCategories[0],
      description: item.description || "",
      badge: item.badge || "Resource",
      imageUrl: item.imageUrl || "",
      link: item.link || item.liveUrl || "/resources",
      linkLabel: item.linkLabel || "Explore Resource",
      highlightsStr: Array.isArray(item.highlights) ? item.highlights.join(", ") : "",
      techTagsStr: Array.isArray(item.techTags) ? item.techTags.join(", ") : (Array.isArray(item.tags) ? item.tags.join(", ") : ""),
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    const highlights = formData.highlightsStr
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    const techTags = formData.techTagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category,
      description: formData.description.trim(),
      badge: formData.badge.trim(),
      imageUrl: formData.imageUrl.trim(),
      link: formData.link.trim(),
      linkLabel: formData.linkLabel.trim(),
      highlights,
      techTags,
      tags: techTags,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("resources", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("resources", payload);
      }
      setIsModalOpen(false);
      fetchResources();
    } catch (err: any) {
      alert(err.message || "Failed to save resource");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      await adminService.deleteContent("resources", id);
      fetchResources();
    } catch (err: any) {
      alert(err.message || "Failed to delete resource");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout
      title="Developer Resources & Guides CMS"
      subtitle="Publish whitepapers, downloadable corporate decks, architecture blueprints, and developer tools."
      badge="Knowledge Hub"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(0,210,255,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Add New Resource</span>
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
              placeholder="Search resources & guides..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#040814] px-3.5 py-2.5 text-xs font-bold text-slate-300 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Resource Categories</option>
              {resourceCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#060c1c]/90 text-center space-y-2">
            <p className="text-sm font-bold text-white">No resources found.</p>
            <p className="text-xs text-slate-400">Click "Add New Resource" to publish one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className={`rounded-3xl border p-5 backdrop-blur-xl transition space-y-4 flex flex-col justify-between ${
                  item.isActive !== false
                    ? "border-white/10 bg-[#060c1c]/90 hover:border-cyan-500/40"
                    : "border-white/5 bg-[#060c1c]/40 opacity-60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white font-['Outfit']">{item.title}</h3>
                    {item.subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{item.subtitle}</p>}
                  </div>

                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-28 w-full object-cover rounded-2xl border border-white/10"
                    />
                  )}

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{item.description}</p>

                  {/* Highlights */}
                  {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-white/5">
                      {item.highlights.slice(0, 3).map((h: string, idx: number) => (
                        <p key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="text-cyan-400">✦</span>
                          <span className="truncate">{h}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 hover:text-cyan-200 transition"
                    >
                      <span>{item.linkLabel || "Explore Resource"}</span>
                      <HiArrowTopRightOnSquare />
                    </a>
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
                      className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition"
                      title="Edit Resource"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Resource"
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
                  {editingItem ? "Edit Resource" : "Add New Developer Resource"}
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
                  <label className="text-xs font-bold text-slate-300">Resource Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Startup MVP Launchpad Guide (30-Day Blueprint)"
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
                      {resourceCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Badge</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Startup Guide, IaC Blueprint"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Step-by-step roadmap to build and ship products"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Image Upload Component */}
                <ImageUploadField
                  label="Resource Cover Image / Graphic"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  placeholder="https://... or upload graphic"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Target Link URL</label>
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="e.g. /insights or /brochure"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Link Button Label</label>
                    <input
                      type="text"
                      value={formData.linkLabel}
                      onChange={(e) => setFormData({ ...formData, linkLabel: e.target.value })}
                      placeholder="e.g. Download Guide, Plan MVP"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Describe what developers and founders gain from this resource..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Key Highlights (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.highlightsStr}
                    onChange={(e) => setFormData({ ...formData, highlightsStr: e.target.value })}
                    placeholder="30-Day Sprint Calendar, Tech Stack Matrix, CI/CD Blueprints"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Tech Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.techTagsStr}
                    onChange={(e) => setFormData({ ...formData, techTagsStr: e.target.value })}
                    placeholder="MVP Strategy, Agile, Flutter, Supabase"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-slate-200">Active on Portal</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500" />
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-xs font-bold text-white transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Resource" : "Publish Resource"}
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

export default AdminResourcesCMS;
