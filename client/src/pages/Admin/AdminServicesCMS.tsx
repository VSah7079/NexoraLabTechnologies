import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiCheckCircle,
  HiXMark,
  HiCommandLine,
  HiSparkles,
  HiMagnifyingGlass,
  HiTag,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

import ImageUploadField from "@/components/admin/ImageUploadField";

const serviceCategories = [
  "Custom Software Development",
  "Enterprise SaaS Platforms",
  "Mobile App Engineering",
  "AI & Autonomous Agent Systems",
  "Cloud DevOps & Architecture",
  "Salesforce & Enterprise CRM",
  "UI/UX Design Systems",
];

const AdminServicesCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Custom Software Development",
    description: "",
    badge: "",
    imageUrl: "",
    featuresStr: "",
    order: 0,
    isActive: true,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("services");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      // Fallback
      setItems([
        {
          _id: "s1",
          title: "Custom Software & Web Engineering",
          subtitle: "High-performance React, Next.js 15, Node.js & Go web ecosystems",
          category: "Custom Software Development",
          description: "We build battle-tested, high-throughput web applications with sub-second page loads, micro-frontend architecture, and enterprise security standards.",
          badge: "Core Division",
          features: ["Next.js 15 & React 19 SSR/SSG", "Scalable REST & GraphQL APIs", "Role-Based Access Control", "Real-time WebSocket Sync"],
          order: 1,
          isActive: true,
        },
        {
          _id: "s2",
          title: "Generative AI & Autonomous Agent Systems",
          subtitle: "Custom LLM fine-tuning, RAG neural pipelines, and AI copilot agents",
          category: "AI & Autonomous Agent Systems",
          description: "Empower your enterprise with private LLM deployment, multi-vector RAG search on proprietary documents, and autonomous task execution agents.",
          badge: "Flagship AI",
          features: ["LangChain & LlamaIndex RAG", "Vector Embeddings & Semantic Search", "Automated Agent Workflows", "Strict Zero-Data-Leakage"],
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      category: serviceCategories[0],
      description: "",
      badge: "Core Division",
      imageUrl: "",
      featuresStr: "",
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
      category: item.category || serviceCategories[0],
      description: item.description || "",
      badge: item.badge || "",
      imageUrl: item.imageUrl || "",
      featuresStr: Array.isArray(item.features) ? item.features.join(", ") : "",
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    const features = formData.featuresStr
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category,
      description: formData.description.trim(),
      badge: formData.badge.trim(),
      imageUrl: formData.imageUrl.trim(),
      features,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("services", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("services", payload);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      alert(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await adminService.deleteContent("services", id);
      fetchServices();
    } catch (err: any) {
      alert(err.message || "Failed to delete service");
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
      title="Services & Divisions CMS"
      subtitle="Create, edit, reorder, and publish engineering services displayed on the public website."
      badge="CMS Manager"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(0,210,255,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Add New Service</span>
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
              placeholder="Search services..."
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
              {serviceCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#060c1c]/90 text-center space-y-2">
            <p className="text-sm font-bold text-white">No services found.</p>
            <p className="text-xs text-slate-400">Click "Add New Service" to publish one.</p>
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

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{item.description}</p>

                  {/* Feature Pills */}
                  {Array.isArray(item.features) && item.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.features.map((f: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className={`h-2 w-2 rounded-full ${item.isActive !== false ? "bg-emerald-400" : "bg-slate-500"}`} />
                    <span>{item.isActive !== false ? "Active" : "Draft"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition"
                      title="Edit Service"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Service"
                    >
                      <HiTrash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#060c1c] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-black text-white font-['Outfit']">
                  {editingItem ? "Edit Service" : "Add New Engineering Service"}
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
                  <label className="text-xs font-bold text-slate-300">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Custom Software & Web Engineering"
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
                      {serviceCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Badge Label (Optional)</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Core Division, Flagship AI"
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
                    placeholder="e.g. High-performance React, Next.js 15, Node.js & Go web ecosystems"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Service Graphic / Icon Upload */}
                <ImageUploadField
                  label="Service Graphic / Mockup Image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  placeholder="https://... or upload image"
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Full Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Describe the architectural capabilities and value proposition..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Key Features / Tech Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.featuresStr}
                    onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                    placeholder="Next.js 15, Scalable REST APIs, WebSocket Data Sync"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-slate-200">Publish Status</span>
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Service" : "Publish Service"}
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

export default AdminServicesCMS;
