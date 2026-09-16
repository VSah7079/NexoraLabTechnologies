import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiArrowDownTray,
  HiFunnel,
  HiEye,
  HiTrash,
  HiCheckCircle,
  HiClock,
  HiEnvelope,
  HiPhone,
  HiXMark,
  HiPlus,
  HiChatBubbleLeftEllipsis,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const submissionTabs = [
  { id: "all", label: "All Submissions" },
  { id: "quote", label: "Quote Requests" },
  { id: "contact", label: "Contact Messages" },
  { id: "meeting", label: "Meeting Bookings" },
  { id: "brochure", label: "Brochure Leads" },
  { id: "career", label: "Career Applications" },
];

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted / Closed" },
  { value: "archived", label: "Archived" },
];

const AdminSubmissions: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get("type") || "all";

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected Submission Modal Drawer
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await adminService.getSubmissions({
        type: activeType !== "all" ? activeType : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search.trim() || undefined,
      });
      if (res.success) {
        setSubmissions(res.submissions || []);
      }
    } catch {
      // Offline sample data
      setSubmissions([
        {
          _id: "sub_1",
          type: "quote",
          name: "Amitabh Verma",
          email: "amitabh.verma@fintechscale.io",
          phone: "9876543210",
          countryCode: "+91",
          company: "Fintech Scale Ltd",
          service: "Custom Software & Web Engineering",
          budget: "$15,000 – $35,000 / ₹4L – ₹10L",
          message: "We need a scalable React 19 / Node.js neo-banking client portal with real-time audit logs and KYC verification.",
          status: "new",
          createdAt: new Date().toISOString(),
          notes: [{ text: "Initial high-priority inquiry. Review scope with Vikram Sah.", author: "Admin", createdAt: new Date().toISOString() }],
        },
        {
          _id: "sub_2",
          type: "meeting",
          name: "Dr. Rajesh K.",
          email: "dr.rajesh@apollohealth.org",
          phone: "9812345678",
          countryCode: "+91",
          company: "Apollo Health Network",
          meetingDate: "2026-09-22",
          meetingTimeSlot: "03:30 PM IST",
          meetingTopic: "30-Min Engineering & Scope Discovery",
          meetingAgenda: "Discussing HIPAA-compliant Telemedicine video consultation app and EHR integration.",
          status: "contacted",
          createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        },
        {
          _id: "sub_3",
          type: "contact",
          name: "Sunita Kapoor",
          email: "sunita@edutech.in",
          phone: "9123456789",
          company: "EduTech Global",
          message: "Looking for dedicated full-stack agile pod for 6-month product sprint.",
          status: "in_review",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [activeType, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions();
  };

  const handleTabChange = (type: string) => {
    setSearchParams(type !== "all" ? { type } : {});
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await adminService.updateSubmissionStatus(id, newStatus);
      setSubmissions((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedSub && selectedSub._id === id) {
        setSelectedSub((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this submission record?")) return;
    try {
      await adminService.deleteSubmission(id);
      setSubmissions((prev) => prev.filter((item) => item._id !== id));
      if (selectedSub && selectedSub._id === id) setSelectedSub(null);
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedSub) return;
    setSavingNote(true);
    try {
      await adminService.addSubmissionNote(selectedSub._id, noteText);
      const newNote = {
        text: noteText.trim(),
        author: "Admin",
        createdAt: new Date().toISOString(),
      };
      const updatedNotes = [...(selectedSub.notes || []), newNote];
      setSelectedSub((prev: any) => ({ ...prev, notes: updatedNotes }));
      setSubmissions((prev) =>
        prev.map((item) => (item._id === selectedSub._id ? { ...item, notes: updatedNotes } : item))
      );
      setNoteText("");
    } catch (err: any) {
      alert("Failed to add note: " + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2.5 py-0.5 text-[10px] font-bold uppercase">New</span>;
      case "in_review":
        return <span className="rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 px-2.5 py-0.5 text-[10px] font-bold uppercase">In Review</span>;
      case "contacted":
        return <span className="rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 text-[10px] font-bold uppercase">Contacted</span>;
      case "converted":
        return <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold uppercase">Converted</span>;
      case "archived":
        return <span className="rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 px-2.5 py-0.5 text-[10px] font-bold uppercase">Archived</span>;
      default:
        return <span className="rounded-full bg-slate-500/10 text-slate-300 px-2.5 py-0.5 text-[10px] font-bold uppercase">{status}</span>;
    }
  };

  return (
    <AdminLayout
      title="Inbound Submissions & Leads Hub"
      subtitle="Track, filter, and manage all form submissions from website inquiries, quote requests, and meeting bookings."
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {submissionTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
                activeType === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full max-w-md">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client name, email, phone, company, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#070e1e] py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-[#00D2FF] focus:outline-none"
            />
          </form>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 text-xs">
              <HiFunnel className="text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#070e1e] px-3 py-2 text-xs text-slate-200 focus:border-[#00D2FF] focus:outline-none cursor-pointer"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0b132b]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <a
              href={adminService.getExportUrl(activeType !== "all" ? activeType : undefined)}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:text-white cursor-pointer"
            >
              <HiArrowDownTray className="text-cyan-400" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>

        {/* Table of Submissions */}
        <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03]">
                <tr>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Client Details</th>
                  <th className="py-3.5 px-4">Subject / Service / Date</th>
                  <th className="py-3.5 px-4">Budget / Info</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#00D2FF] border-t-transparent" />
                      <p className="mt-2 text-xs">Loading submissions...</p>
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No submissions found matching criteria.
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4 font-bold capitalize text-cyan-300">
                        {sub.type}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{sub.name}</div>
                        <div className="text-[11px] text-slate-400">{sub.email}</div>
                        {sub.phone && <div className="text-[10px] text-slate-500">{sub.countryCode || "+91"} {sub.phone}</div>}
                        {sub.company && <div className="text-[10px] text-cyan-400 font-semibold">{sub.company}</div>}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        {sub.service || sub.meetingTopic || sub.roleApplied || sub.message || "—"}
                        {sub.meetingDate && (
                          <div className="text-[10px] text-emerald-400 font-mono">
                            📅 {sub.meetingDate} @ {sub.meetingTimeSlot}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[11px]">
                        {sub.budget || sub.experience || (sub.brochureVersion ? "Deck v2026" : "—")}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={sub.status || "new"}
                          onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                          className="rounded-xl border border-white/10 bg-[#070e1e] px-2 py-1 text-[11px] text-white focus:outline-none cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedSub(sub)}
                            className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[#00D2FF] hover:bg-cyan-500/20 cursor-pointer"
                            title="View Full Details"
                          >
                            <HiEye size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(sub._id)}
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 cursor-pointer"
                            title="Delete"
                          >
                            <HiTrash size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Drawer: Full Submission Details & Notes */}
        {selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#060b18] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-white capitalize">{selectedSub.type} Submission</span>
                    {getStatusBadge(selectedSub.status || "new")}
                  </div>
                  <p className="text-xs text-slate-400">ID: {selectedSub._id} • {new Date(selectedSub.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <HiXMark size={20} />
                </button>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-[#070e1e] p-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Full Name</span>
                  <span className="font-bold text-white text-sm">{selectedSub.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                  <a href={`mailto:${selectedSub.email}`} className="text-[#00D2FF] hover:underline font-semibold">
                    {selectedSub.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                  <a href={`tel:${selectedSub.phone}`} className="text-slate-200 font-mono">
                    {selectedSub.countryCode || "+91"} {selectedSub.phone || "—"}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Company / Organization</span>
                  <span className="text-slate-200 font-semibold">{selectedSub.company || "—"}</span>
                </div>
                {selectedSub.service && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Requested Service / Solution</span>
                    <span className="text-cyan-300 font-bold">{selectedSub.service}</span>
                  </div>
                )}
                {selectedSub.budget && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Budget</span>
                    <span className="text-emerald-300 font-bold">{selectedSub.budget}</span>
                  </div>
                )}
                {selectedSub.timeline && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Timeline Target</span>
                    <span className="text-amber-300 font-bold">{selectedSub.timeline}</span>
                  </div>
                )}
                {selectedSub.meetingDate && (
                  <div className="sm:col-span-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                    <span className="text-emerald-300 font-bold block">📅 Scheduled Meeting: {selectedSub.meetingDate} @ {selectedSub.meetingTimeSlot}</span>
                    <p className="text-slate-300 mt-1">Topic: {selectedSub.meetingTopic}</p>
                    {selectedSub.meetingAgenda && <p className="text-slate-400 mt-1">Agenda: {selectedSub.meetingAgenda}</p>}
                  </div>
                )}
              </div>

              {/* Message Payload */}
              {selectedSub.message && (
                <div className="rounded-2xl border border-white/5 bg-[#070e1e] p-4 text-xs space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Message / Requirements Brief:</span>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{selectedSub.message}</p>
                </div>
              )}

              {/* Internal Admin Team Notes */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <HiChatBubbleLeftEllipsis />
                  <span>Internal Team Notes & Next Steps</span>
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {(!selectedSub.notes || selectedSub.notes.length === 0) ? (
                    <p className="text-xs text-slate-500 italic">No notes added yet.</p>
                  ) : (
                    selectedSub.notes.map((n: any, idx: number) => (
                      <div key={idx} className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5 text-xs text-slate-300">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                          <span className="font-bold text-cyan-400">{n.author || "Admin"}</span>
                          <span>{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                        <p>{n.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an internal follow-up note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-[#070e1e] px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={savingNote || !noteText.trim()}
                    className="rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-4 py-2 text-xs font-bold hover:bg-cyan-500/30 disabled:opacity-50 cursor-pointer"
                  >
                    Add Note
                  </button>
                </form>
              </div>

              {/* Direct Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <a
                  href={`mailto:${selectedSub.email}?subject=NexoraLab%20Technologies%20Follow-up`}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105"
                >
                  <HiEnvelope />
                  <span>Send Direct Email</span>
                </a>

                {selectedSub.phone && (
                  <a
                    href={`https://wa.me/${(selectedSub.countryCode || "+91").replace(/\+/g, "")}${selectedSub.phone}?text=Hi%20${encodeURIComponent(selectedSub.name)}%2C%20thank%20you%20for%20contacting%20NexoraLab%20Technologies.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 px-5 py-2.5 text-xs font-bold hover:bg-emerald-600/30 transition"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSubmissions;
