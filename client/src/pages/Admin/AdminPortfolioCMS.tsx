import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiPaintBrush,
  HiXMark,
  HiMagnifyingGlass,
  HiArrowTopRightOnSquare,
  HiBuildingOffice2,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";
import ImageUploadField from "@/components/admin/ImageUploadField";

const portfolioCategories = [
  "FinTech & Payments",
  "HealthTech & Telemedicine",
  "Logistics & Route AI",
  "Enterprise ERP & SaaS",
  "E-Commerce & Retail",
  "EdTech & Talent Platforms",
];

const AdminPortfolioCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "FinTech & Payments",
    clientName: "",
    metrics: "",
    imageUrl: "",
    liveUrl: "",
    description: "",
    tagsStr: "",
    order: 0,
    isActive: true,
  });

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("portfolio");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "port_1",
          title: "FinTech Multi-Currency Remittance Platform",
          subtitle: "Processing $40M+ in international peer-to-peer transfers with sub-second settlement",
          category: "FinTech & Payments",
          clientName: "Global Pay Inc.",
          metrics: "$40M+ Volume • 99.99% Uptime",
          liveUrl: "https://nexoralabtechnologies.in/portfolio",
          description: "Built a PCI-DSS compliant fintech mobile & web ecosystem with biometric authentication, automated FX conversion, and fraud detection.",
          tags: ["React Native", "Node.js Microservices", "PostgreSQL", "AWS KMS", "Stripe"],
          order: 1,
          isActive: true,
        },
        {
          _id: "port_2",
          title: "Telehealth AI Consultation & EHR Suite",
          subtitle: "HIPAA-compliant telemedicine platform serving 250,000+ patients annually",
          category: "HealthTech & Telemedicine",
          clientName: "MediPulse Health",
          metrics: "250K+ Patients • Sub-100ms Video",
          liveUrl: "https://nexoralabtechnologies.in/portfolio",
          description: "Architected an end-to-end encrypted video consultation platform with automated medical record transcription and prescription dispatch.",
          tags: ["Next.js 15", "WebRTC", "FastAPI", "AWS HIPAA VPC", "TailwindCSS"],
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      category: portfolioCategories[0],
      clientName: "",
      metrics: "",
      imageUrl: "",
      liveUrl: "",
      description: "",
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
      category: item.category || portfolioCategories[0],
      clientName: item.clientName || item.client || "",
      metrics: item.metrics || "",
      imageUrl: item.imageUrl || item.image || "",
      liveUrl: item.liveUrl || "",
      description: item.description || "",
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
      clientName: formData.clientName.trim(),
      metrics: formData.metrics.trim(),
      imageUrl: formData.imageUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      description: formData.description.trim(),
      tags,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("portfolio", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("portfolio", payload);
      }
      setIsModalOpen(false);
      fetchPortfolio();
    } catch (err: any) {
      alert(err.message || "Failed to save portfolio item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      await adminService.deleteContent("portfolio", id);
      fetchPortfolio();
    } catch (err: any) {
      alert(err.message || "Failed to delete item");
    }
  };

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Portfolio & Case Studies CMS"
      subtitle="Publish client success stories, technical architectures, and verified ROI metrics."
      badge="Portfolio Studio"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Add New Case Study</span>
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
              placeholder="Search case studies..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#060c1c]/90 text-center space-y-2">
            <p className="text-sm font-bold text-white">No case studies found.</p>
            <p className="text-xs text-slate-400">Click "Add New Case Study" to configure one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className={`rounded-3xl border p-5 backdrop-blur-xl transition space-y-4 flex flex-col justify-between ${
                  item.isActive !== false
                    ? "border-white/10 bg-[#060c1c]/90 hover:border-violet-500/40"
                    : "border-white/5 bg-[#060c1c]/40 opacity-60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">
                      {item.category}
                    </span>
                    {(item.clientName || item.client) && (
                      <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                        <HiBuildingOffice2 className="text-cyan-400" />
                        <span>{item.clientName || item.client}</span>
                      </span>
                    )}
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

                  {item.metrics && (
                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-2 text-xs font-bold text-cyan-300">
                      ⚡ {item.metrics}
                    </div>
                  )}

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{item.description}</p>

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-violet-300 hover:text-violet-200 transition"
                    >
                      <span>Live Case Study</span>
                      <HiArrowTopRightOnSquare />
                    </a>
                  )}

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
                    <span>{item.isActive !== false ? "Active" : "Draft"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-violet-500/20 text-slate-300 hover:text-violet-300 transition"
                      title="Edit Item"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Item"
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
                  {editingItem ? "Edit Case Study" : "Add New Case Study"}
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
                  <label className="text-xs font-bold text-slate-300">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. FinTech Multi-Currency Remittance Platform"
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
                      {portfolioCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Client Name</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Global Pay Inc."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">ROI / Performance Metric</label>
                    <input
                      type="text"
                      value={formData.metrics}
                      onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                      placeholder="e.g. $40M+ Volume • 99.99% Uptime"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Live URL</label>
                    <input
                      type="text"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Subtitle / Impact</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Processing $40M+ in international peer-to-peer transfers"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <ImageUploadField
                  label="Case Study / Project Mockup Image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  placeholder="Paste direct image URL or upload project screenshot..."
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Case Study Details</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Describe architectural challenges solved and outcomes..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Tech Stack Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tagsStr}
                    onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                    placeholder="React Native, Node.js, PostgreSQL, AWS KMS"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
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
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500" />
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-bold text-white transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Case Study" : "Publish Case Study"}
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

export default AdminPortfolioCMS;
