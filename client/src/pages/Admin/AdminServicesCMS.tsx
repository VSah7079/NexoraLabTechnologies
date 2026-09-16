import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiCheckCircle,
  HiXMark,
  HiCommandLine,
  HiSparkles,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const serviceCategories = [
  "Software Development",
  "Cloud & DevOps",
  "AI & Data Intelligence",
  "Salesforce Solutions",
  "Design & Experience",
  "Digital Marketing",
];

const AdminServicesCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit / Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Software Development",
    description: "",
    badge: "",
    isFeatured: false,
    isActive: true,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("service");
      if (res.success && res.items && res.items.length > 0) {
        setItems(res.items);
      } else {
        // Sample default service list if none created yet
        setItems([
          {
            _id: "s1",
            title: "Custom Software Engineering",
            category: "Software Development",
            description: "High-performance full-stack web and enterprise portals built with React 19, Next.js, and Node.js.",
            badge: "Enterprise",
            isFeatured: true,
            isActive: true,
          },
          {
            _id: "s2",
            title: "Cloud DevOps & CI/CD Automation",
            category: "Cloud & DevOps",
            description: "AWS, GCP, Terraform IaC, Docker and Kubernetes autoscaling infrastructure with 99.9% uptime SLA.",
            badge: "AWS Certified",
            isFeatured: true,
            isActive: true,
          },
          {
            _id: "s3",
            title: "Generative AI Solutions & Custom LLMs",
            category: "AI & Data Intelligence",
            description: "Enterprise fine-tuning, RAG vector search with pgvector/Milvus, and autonomous task agents.",
            badge: "Gemini AI",
            isFeatured: true,
            isActive: true,
          },
        ]);
      }
    } catch {
      // Fallback
      setItems([
        {
          _id: "s1",
          title: "Custom Software Engineering",
          category: "Software Development",
          description: "High-performance full-stack web and enterprise portals built with React 19, Next.js, and Node.js.",
          badge: "Enterprise",
          isFeatured: true,
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

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Software Development",
      description: "",
      badge: "",
      isFeatured: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "Software Development",
      description: item.description || "",
      badge: item.badge || "",
      isFeatured: !!item.isFeatured,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Title is required.");

    try {
      if (editingItem) {
        await adminService.updateContent("service", editingItem._id, formData);
        setItems((prev) =>
          prev.map((i) => (i._id === editingItem._id ? { ...i, ...formData } : i))
        );
      } else {
        const res = await adminService.createContent("service", formData);
        if (res.item) {
          setItems((prev) => [res.item, ...prev]);
        } else {
          setItems((prev) => [{ _id: "s_" + Date.now(), ...formData }, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Error saving service: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await adminService.deleteContent("service", id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      alert("Error deleting service: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Services & Divisions CMS"
      subtitle="Create, update, or remove software development capabilities and service divisions shown on the website."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Services: <strong className="text-white">{items.length}</strong>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition cursor-pointer"
          >
            <HiPlus size={16} />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-white/10 bg-[#060b18]/85 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white pt-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className={`text-[11px] font-bold flex items-center gap-1 ${item.isActive ? "text-emerald-400" : "text-slate-500"}`}>
                  <span className={`h-2 w-2 rounded-full ${item.isActive ? "bg-emerald-400" : "bg-slate-500"}`} />
                  {item.isActive ? "Active on Site" : "Hidden"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                    title="Edit Service"
                  >
                    <HiPencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Delete Service"
                  >
                    <HiTrash size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#060b18] p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Service" : "Add New Service"}
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
                  <label className="block text-slate-300 font-bold mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Custom React 19 & Next.js Portals"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-[#00D2FF]"
                  >
                    {serviceCategories.map((c) => (
                      <option key={c} value={c} className="bg-[#0b132b]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe engineering scope, tech stack, and deliverable..."
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Popular, AWS Certified, 24/7 SLA"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded accent-cyan-400"
                    />
                    <span>Active & Visible on Site</span>
                  </label>

                  <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded accent-cyan-400"
                    />
                    <span>Featured Badge</span>
                  </label>
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
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 font-bold text-white shadow-lg transition hover:scale-105 cursor-pointer"
                  >
                    Save Service
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
