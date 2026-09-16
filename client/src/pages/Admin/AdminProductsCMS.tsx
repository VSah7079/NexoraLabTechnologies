import React, { useState, useEffect } from "react";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiDevicePhoneMobile,
  HiXMark,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const productCategories = [
  "On-Demand & Delivery Apps",
  "Booking and Service Platforms",
  "E-Commerce & Marketplace",
  "Education & Entertainment",
  "Healthcare & Wellness",
  "Social & Media Apps",
];

const AdminProductsCMS: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "On-Demand & Delivery Apps",
    emoji: "🍔",
    description: "",
    badge: "",
    liveUrl: "",
    isActive: true,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContent("product");
      if (res.success && res.items && res.items.length > 0) {
        setItems(res.items);
      } else {
        setItems([
          {
            _id: "p1",
            title: "Multi-Restaurant Food Delivery App",
            category: "On-Demand & Delivery Apps",
            emoji: "🍔",
            description: "Customer App, Restaurant Dashboard, Driver GPS app, and Super Admin panel with live payouts.",
            badge: "Turnkey",
            liveUrl: "https://nexoralabtechnologies.in/products",
            isActive: true,
          },
          {
            _id: "p2",
            title: "Multi-Vendor E-Commerce Marketplace",
            category: "E-Commerce & Marketplace",
            emoji: "🛒",
            description: "Multi-seller vendor portal, automated commission splitting, barcode inventory, and mobile PWA.",
            badge: "Popular",
            liveUrl: "https://nexoralabtechnologies.in/products",
            isActive: true,
          },
          {
            _id: "p3",
            title: "Telehealth & Clinic Appointment App",
            category: "Healthcare & Wellness",
            emoji: "🩺",
            description: "HIPAA compliant HD video consultations, token queue manager, and e-prescription generator.",
            badge: "Enterprise",
            liveUrl: "https://nexoralabtechnologies.in/products",
            isActive: true,
          },
        ]);
      }
    } catch {
      setItems([
        {
          _id: "p1",
          title: "Multi-Restaurant Food Delivery App",
          category: "On-Demand & Delivery Apps",
          emoji: "🍔",
          description: "Customer App, Restaurant Dashboard, Driver GPS app, and Super Admin panel.",
          badge: "Turnkey",
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "On-Demand & Delivery Apps",
      emoji: "🍔",
      description: "",
      badge: "",
      liveUrl: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "On-Demand & Delivery Apps",
      emoji: item.emoji || "🍔",
      description: item.description || "",
      badge: item.badge || "",
      liveUrl: item.liveUrl || "",
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Title is required.");

    try {
      if (editingItem) {
        await adminService.updateContent("product", editingItem._id, formData);
        setItems((prev) =>
          prev.map((i) => (i._id === editingItem._id ? { ...i, ...formData } : i))
        );
      } else {
        const res = await adminService.createContent("product", formData);
        if (res.item) {
          setItems((prev) => [res.item, ...prev]);
        } else {
          setItems((prev) => [{ _id: "p_" + Date.now(), ...formData }, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Error saving product: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await adminService.deleteContent("product", id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Turnkey Products CMS"
      subtitle="Manage ready-to-deploy digital products, mobile app source codes, and marketplace solutions."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Turnkey Products: <strong className="text-white">{items.length}</strong>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-500/20 hover:scale-105 transition cursor-pointer"
          >
            <HiPlus size={16} />
            <span>Add Turnkey Product</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-white/10 bg-[#060b18]/85 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.emoji || "📦"}</span>
                  <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white pt-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className={`text-[11px] font-bold flex items-center gap-1 ${item.isActive ? "text-emerald-400" : "text-slate-500"}`}>
                  <span className={`h-2 w-2 rounded-full ${item.isActive ? "bg-emerald-400" : "bg-slate-500"}`} />
                  {item.isActive ? "Published" : "Draft / Hidden"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
                    title="Edit Product"
                  >
                    <HiPencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Delete Product"
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
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#060b18] p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <HiXMark size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-1">
                    <label className="block text-slate-300 font-bold mb-1">Emoji</label>
                    <input
                      type="text"
                      value={formData.emoji}
                      onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                      placeholder="🍔"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-center text-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-slate-300 font-bold mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Courier & Parcel Delivery Platform"
                      className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500"
                  >
                    {productCategories.map((c) => (
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
                    placeholder="Describe turnkey features, modules, and platform apps..."
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Live Demo / Product URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://demo.nexoralab.in/app"
                    className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded accent-purple-400"
                    />
                    <span>Active & Visible in Turnkey Catalog</span>
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
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2.5 font-bold text-white shadow-lg transition hover:scale-105 cursor-pointer"
                  >
                    Save Product
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

export default AdminProductsCMS;
