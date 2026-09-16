import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiRectangleGroup,
  HiXMark,
  HiMagnifyingGlass,
  HiSparkles,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";
import ImageUploadField from "@/components/admin/ImageUploadField";

const sectionCategories = [
  "Home Hero Banner",
  "About Us Overview",
  "CTA Banners",
  "Technology Partners",
  "Global Delivery Network",
];

const AdminSectionsCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    badge: "Enterprise Software & AI Agency",
    category: "Home Hero Banner",
    imageUrl: "",
    description: "",
    ctaText: "Schedule Discovery",
    ctaLink: "/meeting",
    secondaryCtaText: "Explore Products",
    secondaryCtaLink: "/products",
    order: 0,
    isActive: true,
  });

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("sections");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "sec_1",
          title: "Hero Section Banner",
          subtitle: "Innovate • Build • Elevate",
          badge: "Enterprise Software & AI Agency",
          category: "Home Hero Banner",
          description: "We engineer mission-critical web applications, enterprise SaaS platforms, native mobile experiences, and proprietary AI talent intelligence engines for visionary companies globally.",
          ctaText: "Schedule Engineering Discovery",
          ctaLink: "/meeting",
          secondaryCtaText: "Explore Turnkey Products",
          secondaryCtaLink: "/products",
          order: 1,
          isActive: true,
        },
        {
          _id: "sec_2",
          title: "About Company Narrative",
          subtitle: "Headquartered in Siwan, Bihar • Serving Clients Worldwide",
          badge: "Our Mission & Vision",
          category: "About Us Overview",
          description: "NexoraLab Technologies was founded with a singular conviction: to deliver Tier-1 software engineering, resilient cloud infrastructure, and state-of-the-art AI solutions with world-class craftsmanship and transparent execution.",
          ctaText: "Get in Touch",
          ctaLink: "/contact",
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      badge: "Enterprise Division",
      category: sectionCategories[0],
      imageUrl: "",
      description: "",
      ctaText: "Get Started",
      ctaLink: "/quote",
      secondaryCtaText: "",
      secondaryCtaLink: "",
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
      badge: item.badge || "",
      category: item.category || sectionCategories[0],
      imageUrl: item.imageUrl || item.image || "",
      description: item.description || item.content || "",
      ctaText: item.ctaText || "",
      ctaLink: item.ctaLink || "",
      secondaryCtaText: item.secondaryCtaText || "",
      secondaryCtaLink: item.secondaryCtaLink || "",
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      badge: formData.badge.trim(),
      category: formData.category,
      imageUrl: formData.imageUrl.trim(),
      description: formData.description.trim(),
      ctaText: formData.ctaText.trim(),
      ctaLink: formData.ctaLink.trim(),
      secondaryCtaText: formData.secondaryCtaText.trim(),
      secondaryCtaLink: formData.secondaryCtaLink.trim(),
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("sections", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("sections", payload);
      }
      setIsModalOpen(false);
      fetchSections();
    } catch (err: any) {
      alert(err.message || "Failed to save section");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section banner?")) return;
    try {
      await adminService.deleteContent("sections", id);
      fetchSections();
    } catch (err: any) {
      alert(err.message || "Failed to delete section");
    }
  };

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Hero & Site Banners CMS"
      subtitle="Customize home hero copy, company about story, call-to-action buttons, and trust copy across the site."
      badge="Site Studio"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(0,210,255,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Add Section Banner</span>
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
              placeholder="Search site sections..."
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
            <p className="text-sm font-bold text-white">No section banners found.</p>
            <p className="text-xs text-slate-400">Click "Add Section Banner" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className={`rounded-3xl border p-6 backdrop-blur-xl transition space-y-4 flex flex-col justify-between ${
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
                    <h3 className="text-lg font-black text-white font-['Outfit']">{item.title}</h3>
                    {item.subtitle && <p className="text-xs text-cyan-300 font-semibold mt-0.5">{item.subtitle}</p>}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  {/* CTAs preview */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {item.ctaText && (
                      <span className="text-[11px] font-bold text-black bg-cyan-400 px-3 py-1 rounded-xl">
                        Primary CTA: {item.ctaText} ({item.ctaLink || "#"})
                      </span>
                    )}
                    {item.secondaryCtaText && (
                      <span className="text-[11px] font-bold text-white bg-white/10 px-3 py-1 rounded-xl border border-white/10">
                        Secondary: {item.secondaryCtaText} ({item.secondaryCtaLink || "#"})
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className={`h-2 w-2 rounded-full ${item.isActive !== false ? "bg-emerald-400" : "bg-slate-500"}`} />
                    <span>{item.isActive !== false ? "Live on Site" : "Draft"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition"
                      title="Edit Section"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Section"
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
                  {editingItem ? "Edit Section Banner" : "Add Section Banner"}
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
                  <label className="text-xs font-bold text-slate-300">Section Headline</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Hero Section Banner"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Category Section</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#040814] px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      {sectionCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Enterprise Software & AI Agency"
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
                    placeholder="e.g. Innovate • Build • Elevate"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <ImageUploadField
                  label="Section Hero Graphic / Background Banner"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  placeholder="Paste direct image URL or upload section graphic..."
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Section Narrative / Copy</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Enter the main copy displayed in this section..."
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Primary CTA Text</label>
                    <input
                      type="text"
                      value={formData.ctaText}
                      onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                      placeholder="e.g. Schedule Discovery"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Primary CTA Link</label>
                    <input
                      type="text"
                      value={formData.ctaLink}
                      onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                      placeholder="e.g. /meeting or /quote"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={formData.secondaryCtaText}
                      onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                      placeholder="e.g. Explore Products"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Secondary CTA Link</label>
                    <input
                      type="text"
                      value={formData.secondaryCtaLink}
                      onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                      placeholder="e.g. /products"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-slate-200">Active on Website</span>
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
                    {saving ? "Saving..." : editingItem ? "Update Section" : "Publish Section"}
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

export default AdminSectionsCMS;
