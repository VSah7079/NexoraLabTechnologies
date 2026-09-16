import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiChatBubbleBottomCenterText,
  HiXMark,
  HiMagnifyingGlass,
  HiStar,
  HiUser,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";
import ImageUploadField from "@/components/admin/ImageUploadField";

const AdminTestimonialsCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    role: "",
    company: "",
    description: "",
    rating: 5,
    avatarUrl: "",
    order: 0,
    isActive: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("testimonials");
      if (res.success && res.items) {
        setItems(res.items);
      }
    } catch {
      setItems([
        {
          _id: "t1",
          title: "Remarkable SaaS Development & Delivery",
          clientName: "Rahul Mehta",
          role: "Chief Technology Officer",
          company: "FinVantage Global",
          description: "NexoraLab Technologies engineered our multi-currency payments gateway ahead of schedule. Their engineering precision, zero-downtime microservices design, and rapid turnaround exceeded our expectations.",
          rating: 5,
          order: 1,
          isActive: true,
        },
        {
          _id: "t2",
          title: "Transformative AI ATS & Hiring Speed",
          clientName: "Sarah Jenkins",
          role: "Head of Talent Acquisition",
          company: "Apex Recruiters USA",
          description: "The AI resume parser and smart matching suite built by NexoraLab reduced our applicant screening cycle from 4 days to less than 15 minutes. Pure engineering genius!",
          rating: 5,
          order: 2,
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      clientName: "",
      role: "",
      company: "",
      description: "",
      rating: 5,
      avatarUrl: "",
      order: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      clientName: item.clientName || "",
      role: item.role || "",
      company: item.company || "",
      description: item.description || item.content || "",
      rating: item.rating || 5,
      avatarUrl: item.avatarUrl || "",
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.description.trim()) return;

    setSaving(true);
    const payload = {
      title: formData.title.trim() || `Review from ${formData.clientName}`,
      clientName: formData.clientName.trim(),
      role: formData.role.trim(),
      company: formData.company.trim(),
      description: formData.description.trim(),
      rating: Number(formData.rating),
      avatarUrl: formData.avatarUrl.trim(),
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    try {
      if (editingItem) {
        await adminService.updateContent("testimonials", editingItem._id || editingItem.id, payload);
      } else {
        await adminService.createContent("testimonials", payload);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      alert(err.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await adminService.deleteContent("testimonials", id);
      fetchTestimonials();
    } catch (err: any) {
      alert(err.message || "Failed to delete review");
    }
  };

  const filteredItems = items.filter((item) =>
    item.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Client Testimonials & Reviews CMS"
      subtitle="Manage verified client testimonials, ratings, and quotes displayed across the website."
      badge="Social Proof"
      actionButton={
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HiPlus size={16} />
          <span>Add New Testimonial</span>
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
              placeholder="Search reviews by client or company..."
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
            <p className="text-sm font-bold text-white">No testimonials found.</p>
            <p className="text-xs text-slate-400">Click "Add New Testimonial" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className={`rounded-3xl border p-5 backdrop-blur-xl transition space-y-4 flex flex-col justify-between ${
                  item.isActive !== false
                    ? "border-white/10 bg-[#060c1c]/90 hover:border-pink-500/40"
                    : "border-white/5 bg-[#060c1c]/40 opacity-60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 text-sm">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <HiStar key={i} />
                      ))}
                    </div>
                    <span className="text-[10px] text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20">
                      Verified Client
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white font-['Outfit']">{item.title}</h3>
                    <p className="text-xs text-slate-300 italic mt-1 leading-relaxed">
                      "{item.description || item.content}"
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2.5">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.clientName}
                        className="h-9 w-9 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-bold text-white text-xs">
                        {item.clientName ? item.clientName.charAt(0) : "C"}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-white">{item.clientName}</p>
                      <p className="text-[10px] text-slate-400">
                        {item.role} {item.company ? `• ${item.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className={`h-2 w-2 rounded-full ${item.isActive !== false ? "bg-emerald-400" : "bg-slate-500"}`} />
                    <span>{item.isActive !== false ? "Active" : "Draft"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-pink-500/20 text-slate-300 hover:text-pink-300 transition"
                      title="Edit Review"
                    >
                      <HiPencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Review"
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
                  {editingItem ? "Edit Testimonial" : "Add Client Testimonial"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
                >
                  <HiXMark size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Client Name</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Rahul Mehta"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Star Rating (1 to 5)</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full rounded-2xl border border-white/10 bg-[#040814] px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Client Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Chief Technology Officer"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. FinVantage Global"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <ImageUploadField
                  label="Client Avatar / Headshot Image"
                  value={formData.avatarUrl}
                  onChange={(url) => setFormData({ ...formData, avatarUrl: url })}
                  placeholder="Paste avatar URL or upload client photo..."
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Headline / Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Remarkable SaaS Development & Delivery"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Review Text / Quote</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Enter what the client said about NexoraLab..."
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
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500" />
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-xs font-bold text-white transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingItem ? "Update Testimonial" : "Publish Testimonial"}
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

export default AdminTestimonialsCMS;
