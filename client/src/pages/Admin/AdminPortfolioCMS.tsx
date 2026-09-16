import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiPaintBrush,
  HiXMark,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const AdminPortfolioCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Full-Stack Web & AI",
    clientName: "",
    metrics: "+340% Conversions",
    description: "",
    imageUrl: "",
    liveUrl: "",
    tags: "React 19, FastAPI, AWS",
    isFeatured: true,
  });

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("portfolio");
      if (res.success && res.items && res.items.length > 0) {
        setItems(res.items);
      } else {
        setItems([
          {
            _id: "p_1",
            title: "FinTech Neo-Banking & Multi-Currency Wallet",
            category: "FinTech & Banking",
            clientName: "Global Wealth Corp",
            metrics: "+340% User Velocity",
            description: "Built high-concurrency wallet ledger with sub-50ms API response time and automated KYC.",
            imageUrl: "https://nexoralabtechnologies.in/Circlelogo.png",
            liveUrl: "https://nexoralabtechnologies.in/portfolio",
            tags: ["React 19", "Node.js", "PostgreSQL", "AWS"],
            isFeatured: true,
          },
          {
            _id: "p_2",
            title: "AI Talent Screening & Video Mock Interview Suite",
            category: "Artificial Intelligence",
            clientName: "Enterprise HR Pod",
            metrics: "94.8% ATS Precision",
            description: "Proprietary ATS parser processing over 50,000 resumes with real-time feedback rubrics.",
            imageUrl: "https://nexoralabtechnologies.in/Circlelogo.png",
            liveUrl: "https://nexoralabtechnologies.in/portfolio",
            tags: ["Gemini AI", "FastAPI", "Vector Search", "Docker"],
            isFeatured: true,
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
    fetchPortfolio();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Full-Stack Web & AI",
      clientName: "",
      metrics: "+340% Conversions",
      description: "",
      imageUrl: "",
      liveUrl: "",
      tags: "React 19, FastAPI, AWS",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "Full-Stack Web & AI",
      clientName: item.clientName || "",
      metrics: item.metrics || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      liveUrl: item.liveUrl || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
      isFeatured: !!item.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Title is required.");

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingItem) {
        await adminService.updateContent("portfolio", editingItem._id, payload);
        setItems((prev) =>
          prev.map((i) => (i._id === editingItem._id ? { ...i, ...payload } : i))
        );
      } else {
        const res = await adminService.createContent("portfolio", payload);
        if (res.item) {
          setItems((prev) => [res.item, ...prev]);
        } else {
          setItems((prev) => [{ _id: "port_" + Date.now(), ...payload }, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Error saving portfolio item: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;
    try {
      await adminService.deleteContent("portfolio", id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      alert("Error deleting case study: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Portfolio & Case Studies CMS"
      subtitle="Showcase client engineering breakthroughs, measurable metrics, and verified production systems."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Projects: <strong className="text-white">{items.length}</strong>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:scale-105 transition cursor-pointer"
          >
            <HiPlus size={16} />
            <span>Add Case Study</span>
          </button>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-white/10 bg-[#060b18]/85 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    {item.category}
                  </span>
                  {item.metrics && (
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-black text-cyan-300">
                      {item.metrics}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  {item.clientName && <p className="text-[11px] text-slate-400">Client: {item.clientName}</p>}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(Array.isArray(item.tags) ? item.tags : []).map((t: string, i: number) => (
                      <span key={i} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#00D2FF] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Case</span>
                    <HiArrowTopRightOnSquare size={12} />
                  </a>
                ) : <span className="text-[11px] text-slate-500">Internal IP</span>}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                    title="Edit Case Study"
                  >
                    <HiPencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Delete Case Study"
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
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#060b18] p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Case Study" : "Add New Case Study"}
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
                  <label className="block text-slate-300 font-bold mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. FinTech Neo-Banking Multi-Currency Wallet"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. AI & Cloud"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Client Name</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Global Wealth Corp"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Impact Metric Tag</label>
                  <input
                    type="text"
                    value={formData.metrics}
                    onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                    placeholder="e.g. +340% User Velocity / sub-50ms latency"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe engineering scope, challenge solved, and architecture..."
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tech Stack Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React 19, Node.js, PostgreSQL, AWS"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Live URL / Repository Link</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
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
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 font-bold text-white shadow-lg transition hover:scale-105 cursor-pointer"
                  >
                    Save Case Study
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
