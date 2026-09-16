import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiCalendarDays,
  HiDocumentArrowDown,
  HiBriefcase,
  HiArrowDownTray,
  HiSparkles,
  HiTrash,
  HiXMark,
  HiPhone,
  HiPlus,
  HiClock,
  HiShieldCheck,
  HiBuildingOffice2,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const typeTabs = [
  { key: "all", label: "All Leads", icon: HiChatBubbleLeftRight },
  { key: "quote", label: "Quotes", icon: HiSparkles },
  { key: "contact", label: "Contact", icon: HiEnvelope },
  { key: "meeting", label: "Meetings", icon: HiCalendarDays },
  { key: "brochure", label: "Brochures", icon: HiDocumentArrowDown },
  { key: "career", label: "Careers", icon: HiBriefcase },
];

const statusOptions = [
  { key: "all", label: "All Statuses" },
  { key: "new", label: "New Leads", color: "cyan" },
  { key: "in_review", label: "In Review", color: "blue" },
  { key: "contacted", label: "Contacted", color: "amber" },
  { key: "converted", label: "Converted", color: "emerald" },
  { key: "archived", label: "Archived", color: "slate" },
];

const priorityOptions = ["low", "medium", "high", "urgent"];

const AdminSubmissions: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type") || "all";
  const currentStatus = searchParams.get("status") || "all";

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getSubmissions({
        type: currentType !== "all" ? currentType : undefined,
        status: currentStatus !== "all" ? currentStatus : undefined,
        search: searchQuery || undefined,
      });
      if (res.success) {
        setSubmissions(res.submissions || []);
      }
    } catch {
      // Sample fallback data if buffering
      setSubmissions([
        {
          _id: "s1",
          type: "quote",
          name: "Vikram Malhotra",
          email: "vikram@techcorp.io",
          phone: "9876543210",
          countryCode: "+91",
          company: "TechCorp Logistics",
          service: "Enterprise Cloud ERP & SaaS",
          budget: "$15,000 – $35,000",
          timeline: "2 to 3 Months",
          message: "We need a robust multi-tenant inventory and route optimization dashboard built on Next.js 15 and PostgreSQL.",
          status: "new",
          priority: "high",
          notes: [{ text: "High intent lead. Budget matches enterprise tier.", author: "Admin", createdAt: new Date() }],
          createdAt: new Date().toISOString(),
        },
        {
          _id: "s2",
          type: "meeting",
          name: "Dr. Ananya Ray",
          email: "ananya@medipulse.health",
          phone: "9812345678",
          countryCode: "+91",
          company: "MediPulse HealthTech",
          meetingTopic: "Telehealth AI Video Consultation Platform",
          meetingDate: "2026-09-22",
          meetingTimeSlot: "11:30 AM IST",
          meetingAgenda: "Review WebRTC compliance and AWS HIPAA cloud architecture scope.",
          status: "contacted",
          priority: "urgent",
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentType, currentStatus, searchQuery]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedSub) return;
    setUpdatingStatus(true);
    try {
      await adminService.updateSubmissionStatus(selectedSub._id || selectedSub.id, newStatus);
      setSelectedSub({ ...selectedSub, status: newStatus });
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!selectedSub) return;
    try {
      await adminService.updateSubmissionStatus(selectedSub._id || selectedSub.id, selectedSub.status, newPriority);
      setSelectedSub({ ...selectedSub, priority: newPriority });
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || "Failed to update priority");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub || !noteText.trim()) return;
    setAddingNote(true);
    try {
      const res = await adminService.addSubmissionNote(selectedSub._id || selectedSub.id, noteText.trim());
      if (res.success && res.data) {
        setSelectedSub(res.data);
        setNoteText("");
        fetchSubmissions();
      }
    } catch (err: any) {
      alert(err.message || "Failed to add note");
    } finally {
      setAddingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      await adminService.deleteSubmission(id);
      if (selectedSub && (selectedSub._id === id || selectedSub.id === id)) {
        setSelectedSub(null);
      }
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || "Failed to delete submission");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 text-[10px] font-bold">
            New Lead
          </span>
        );
      case "contacted":
        return (
          <span className="rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 text-[10px] font-bold">
            Contacted
          </span>
        );
      case "converted":
        return (
          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold">
            Converted
          </span>
        );
      case "in_review":
        return (
          <span className="rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-300 px-2.5 py-0.5 text-[10px] font-bold">
            In Review
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-slate-500/15 border border-slate-500/40 text-slate-300 px-2.5 py-0.5 text-[10px] font-bold">
            {status}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <span className="text-[10px] font-extrabold text-red-400 uppercase tracking-wider">● Urgent</span>;
      case "high":
        return <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">● High</span>;
      case "low":
        return <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">● Low</span>;
      default:
        return <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">● Medium</span>;
    }
  };

  return (
    <AdminLayout
      title="Inbound Leads & Submissions Hub"
      subtitle="Complete management, fast client communication, team notes, and status tracking for all inbound inquiries."
      badge="Lead Engine"
      actionButton={
        <a
          href={adminService.getExportUrl(currentType !== "all" ? currentType : undefined)}
          download
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition active:scale-95 shadow-sm"
        >
          <HiArrowDownTray className="text-cyan-400" />
          <span>Export CSV</span>
        </a>
      }
    >
      <div className="space-y-6">
        {/* Filter Navigation Bar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#060c1c]/90 p-4 sm:p-5 backdrop-blur-xl">
          {/* Top Row: Type Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-white/10">
            {typeTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentType === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("type", tab.key);
                    setSearchParams(params);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Search & Status Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <HiMagnifyingGlass size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, phone, company..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-slate-400 mr-1 hidden lg:inline">Status:</span>
              {statusOptions.map((st) => (
                <button
                  key={st.key}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("status", st.key);
                    setSearchParams(params);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    currentStatus === st.key
                      ? "bg-white/15 text-white border border-white/30"
                      : "text-slate-400 hover:text-white bg-white/[0.03]"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions List / Table */}
        <div className="rounded-3xl border border-white/10 bg-[#060c1c]/90 overflow-hidden backdrop-blur-xl shadow-xl">
          {loading ? (
            <div className="p-12 text-center space-y-3">
              <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <p className="text-xs text-slate-400 font-medium">Fetching inbound submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <p className="text-sm font-bold text-white">No submissions matching criteria.</p>
              <p className="text-xs text-slate-400">Try adjusting your search query or filter tags.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-4 px-4 sm:px-6">Contact / Client</th>
                    <th className="py-4 px-4">Type & Subject</th>
                    <th className="py-4 px-4 hidden md:table-cell">Budget / Date</th>
                    <th className="py-4 px-4">Priority & Status</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {submissions.map((sub) => (
                    <tr
                      key={sub._id || sub.id}
                      onClick={() => setSelectedSub(sub)}
                      className={`hover:bg-white/[0.04] transition cursor-pointer ${
                        selectedSub?._id === sub._id ? "bg-cyan-500/10" : ""
                      }`}
                    >
                      {/* Name & Contact */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="space-y-0.5">
                          <p className="font-bold text-white text-sm">{sub.name}</p>
                          <p className="text-slate-400 text-[11px]">{sub.email}</p>
                          {sub.phone && (
                            <p className="text-slate-500 text-[10px]">
                              {sub.countryCode || "+91"} {sub.phone}
                            </p>
                          )}
                          {sub.company && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 mt-1">
                              <HiBuildingOffice2 className="text-[11px]" />
                              <span>{sub.company}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Type & Subject */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                            {sub.type}
                          </span>
                          <p className="text-slate-200 font-semibold line-clamp-1">
                            {sub.service || sub.meetingTopic || sub.roleApplied || sub.message || "General Inquiry"}
                          </p>
                          <p className="text-slate-500 text-[10px] flex items-center gap-1">
                            <HiClock />
                            <span>{new Date(sub.createdAt).toLocaleString()}</span>
                          </p>
                        </div>
                      </td>

                      {/* Budget / Date */}
                      <td className="py-4 px-4 hidden md:table-cell">
                        <div className="space-y-0.5">
                          {sub.budget && <p className="font-bold text-emerald-300">{sub.budget}</p>}
                          {sub.timeline && <p className="text-slate-400 text-[11px]">Timeline: {sub.timeline}</p>}
                          {sub.meetingDate && (
                            <p className="text-blue-300 font-semibold">
                              📅 {sub.meetingDate} @ {sub.meetingTimeSlot}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Priority & Status */}
                      <td className="py-4 px-4">
                        <div className="space-y-1.5">
                          <div>{getStatusBadge(sub.status || "new")}</div>
                          <div>{getPriorityBadge(sub.priority || "medium")}</div>
                        </div>
                      </td>

                      {/* Direct Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {sub.phone && (
                            <a
                              href={`https://wa.me/${(sub.countryCode || "+91").replace(/\+/g, "")}${sub.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(sub.name)},%20thank%20you%20for%20contacting%20NexoraLab%20Technologies.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 transition"
                              title="Chat on WhatsApp"
                            >
                              <FaWhatsapp size={14} />
                            </a>
                          )}
                          <a
                            href={`mailto:${sub.email}?subject=Regarding%20your%20inquiry%20with%20NexoraLab%20Technologies`}
                            className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 transition"
                            title="Compose Email"
                          >
                            <HiEnvelope size={14} />
                          </a>
                          <button
                            onClick={() => handleDelete(sub._id || sub.id)}
                            className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                            title="Delete Lead"
                          >
                            <HiTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Lead Detail Modal / Drawer */}
        {selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#060c1c] p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-cyan-500/20 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                      {selectedSub.type}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(selectedSub.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mt-1">
                    {selectedSub.name}
                  </h2>
                  {selectedSub.company && (
                    <p className="text-xs text-cyan-400 font-semibold">{selectedSub.company}</p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedSub(null)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
                >
                  <HiXMark size={20} />
                </button>
              </div>

              {/* Status & Priority Switcher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Lead Status
                  </label>
                  <select
                    value={selectedSub.status || "new"}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updatingStatus}
                    className="w-full rounded-xl border border-white/10 bg-[#040814] px-3 py-2 text-xs font-bold text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="new">New Lead</option>
                    <option value="in_review">In Review</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted Client</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Priority Flag
                  </label>
                  <select
                    value={selectedSub.priority || "medium"}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#040814] px-3 py-2 text-xs font-bold text-white focus:border-cyan-400 focus:outline-none capitalize"
                  >
                    {priorityOptions.map((p) => (
                      <option key={p} value={p}>
                        {p} Priority
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information & Direct Actions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-slate-500">Email: </span>
                    <a href={`mailto:${selectedSub.email}`} className="text-cyan-400 hover:underline font-semibold">
                      {selectedSub.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone: </span>
                    <span className="font-semibold text-slate-200">
                      {selectedSub.countryCode || "+91"} {selectedSub.phone || "N/A"}
                    </span>
                  </div>
                  {selectedSub.budget && (
                    <div>
                      <span className="text-slate-500">Budget Range: </span>
                      <span className="font-bold text-emerald-300">{selectedSub.budget}</span>
                    </div>
                  )}
                  {selectedSub.timeline && (
                    <div>
                      <span className="text-slate-500">Target Timeline: </span>
                      <span className="text-slate-200">{selectedSub.timeline}</span>
                    </div>
                  )}
                  {selectedSub.meetingDate && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500">Scheduled Call: </span>
                      <span className="font-bold text-blue-300">
                        {selectedSub.meetingDate} @ {selectedSub.meetingTimeSlot}
                      </span>
                    </div>
                  )}
                  {selectedSub.resumeUrl && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500">Resume / CV: </span>
                      <a
                        href={selectedSub.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 underline font-semibold"
                      >
                        View Candidate Resume
                      </a>
                    </div>
                  )}
                </div>

                {/* 1-Click Fast Communication Action Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {selectedSub.phone && (
                    <a
                      href={`https://wa.me/${(selectedSub.countryCode || "+91").replace(/\+/g, "")}${selectedSub.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedSub.name)},%20thank%20you%20for%20contacting%20NexoraLab%20Technologies.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 px-4 py-2 text-xs font-bold text-emerald-300 transition"
                    >
                      <FaWhatsapp className="text-base" />
                      <span>WhatsApp Client</span>
                    </a>
                  )}
                  <a
                    href={`mailto:${selectedSub.email}?subject=Regarding%20your%20inquiry%20with%20NexoraLab%20Technologies`}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 hover:bg-cyan-500/25 px-4 py-2 text-xs font-bold text-cyan-300 transition"
                  >
                    <HiEnvelope className="text-base" />
                    <span>Send Email</span>
                  </a>
                  {selectedSub.phone && (
                    <a
                      href={`tel:${selectedSub.phone}`}
                      className="flex items-center gap-2 rounded-xl bg-blue-500/15 border border-blue-500/30 hover:bg-blue-500/25 px-4 py-2 text-xs font-bold text-blue-300 transition"
                    >
                      <HiPhone className="text-base" />
                      <span>Call Number</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Message Payload */}
              {(selectedSub.message || selectedSub.meetingAgenda) && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Inquiry Message</h3>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedSub.message || selectedSub.meetingAgenda}
                  </div>
                </div>
              )}

              {/* Internal Team Notes */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Internal Team Notes ({selectedSub.notes?.length || 0})
                </h3>

                {selectedSub.notes && selectedSub.notes.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedSub.notes.map((n: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold text-cyan-300">{n.author || "Admin"}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-200">{n.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add team progress note..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={addingNote || !noteText.trim()}
                    className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 text-xs font-bold transition disabled:opacity-50"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSubmissions;
