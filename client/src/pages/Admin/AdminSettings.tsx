import React, { useState, useEffect } from "react";
import {
  HiCheckCircle,
  HiCog6Tooth,
  HiKey,
  HiMapPin,
  HiEnvelope,
  HiPhone,
  HiShare,
  HiChartBar,
} from "react-icons/hi2";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    companyName: "NexoraLab Technologies",
    tagline: "Innovate • Build • Elevate",
    contactEmail: "nexoralabtechnologies@gmail.com",
    contactPhone: "+91 70798 84369",
    whatsappNumber: "+917079884369",
    hqAddress: "Siwan, Bihar 841226, India",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/135297535/",
      instagram: "https://www.instagram.com/nexoralabtechnology/",
      facebook: "https://www.facebook.com/profile.php?id=61592465423073",
      youtube: "https://www.youtube.com/@NexoraLabTechnologies",
      twitter: "https://x.com/nexoralab",
      github: "https://github.com/NexoraLab",
    },
    stats: {
      uptimeSLA: "99.9%",
      productionSystems: "40+",
      aiResumesProcessed: "50K+",
      supportAvailability: "24/7",
    },
    adminPasskey: "NexoraAdmin@2026",
    quickPin: "707988",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [adminProfile, setAdminProfile] = useState({
    username: "admin",
    email: "admin@nexoralab.in",
    name: "NexoraLab Principal Admin",
    newPassword: "",
    confirmPassword: "",
  });
  const [credSaving, setCredSaving] = useState(false);
  const [credSuccess, setCredSuccess] = useState(false);
  const [credError, setCredError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const [settingsRes, profileRes] = await Promise.allSettled([
          adminService.getSettings(),
          adminService.getProfile(),
        ]);
        if (settingsRes.status === "fulfilled" && settingsRes.value?.success && settingsRes.value.settings) {
          setSettings((prev: any) => ({ ...prev, ...settingsRes.value.settings }));
        }
        if (profileRes.status === "fulfilled" && profileRes.value?.success && profileRes.value.admin) {
          setAdminProfile((prev) => ({
            ...prev,
            username: profileRes.value.admin.username || "admin",
            email: profileRes.value.admin.email || "admin@nexoralab.in",
            name: profileRes.value.admin.name || "NexoraLab Principal Admin",
          }));
        }
      } catch (err) {
        console.warn("Using local settings state:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError("");
    setCredSuccess(false);

    if (adminProfile.newPassword && adminProfile.newPassword !== adminProfile.confirmPassword) {
      setCredError("New password and confirm password do not match!");
      return;
    }

    setCredSaving(true);
    try {
      await adminService.updateCredentials({
        username: adminProfile.username,
        email: adminProfile.email,
        name: adminProfile.name,
        newPassword: adminProfile.newPassword || undefined,
      });
      setCredSuccess(true);
      setAdminProfile((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
      setTimeout(() => setCredSuccess(false), 4000);
    } catch (err: any) {
      setCredError(err.message || "Failed to update admin credentials");
    } finally {
      setCredSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await adminService.updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Site & Global Settings"
      subtitle="Directly modify website contact numbers, headquarters address, social media links, home stats, and security keys."
    >
      <div className="max-w-4xl space-y-8">
        {/* Section 0: Admin Login ID & Password Manager */}
        <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-[#060b18]/95 to-[#0b142c]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00D2FF] flex items-center gap-2">
              <HiKey className="text-lg" />
              <span>Admin Login Credentials (MongoDB Database)</span>
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium">● Stored & Protected in Database</span>
          </div>

          {credSuccess && (
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-300">
              <HiCheckCircle className="text-base" />
              <span>Admin Login ID and Password updated successfully in the database!</span>
            </div>
          )}

          {credError && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              {credError}
            </div>
          )}

          <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Admin Username / ID</label>
                <input
                  type="text"
                  value={adminProfile.username}
                  onChange={(e) => setAdminProfile({ ...adminProfile, username: e.target.value })}
                  placeholder="admin"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Admin Email Address</label>
                <input
                  type="email"
                  value={adminProfile.email}
                  onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                  placeholder="admin@nexoralab.in"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">New Password (Leave blank to keep unchanged)</label>
                <input
                  type="password"
                  value={adminProfile.newPassword}
                  onChange={(e) => setAdminProfile({ ...adminProfile, newPassword: e.target.value })}
                  placeholder="Enter new password (min 6 chars)..."
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={adminProfile.confirmPassword}
                  onChange={(e) => setAdminProfile({ ...adminProfile, confirmPassword: e.target.value })}
                  placeholder="Confirm new password..."
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={credSaving}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <HiCheckCircle size={15} />
                <span>{credSaving ? "Updating Database..." : "Save Admin ID & Password"}</span>
              </button>
            </div>
          </form>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-300">
            <HiCheckCircle className="text-base" />
            <span>Site & Global Settings have been updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Section 1: Contact Information */}
          <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-white/10 pb-3">
              <HiEnvelope />
              <span>Headquarters & Contact Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName || ""}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline || ""}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Official Business Email</label>
                <input
                  type="email"
                  value={settings.contactEmail || ""}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Primary Phone Number</label>
                <input
                  type="text"
                  value={settings.contactPhone || ""}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">Headquarters Address</label>
                <input
                  type="text"
                  value={settings.hqAddress || ""}
                  onChange={(e) => setSettings({ ...settings, hqAddress: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Social Media Links */}
          <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2 border-b border-white/10 pb-3">
              <HiShare />
              <span>Official Social Media Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={settings.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Instagram Profile</label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">YouTube Channel</label>
                <input
                  type="text"
                  value={settings.socialLinks?.youtube || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">GitHub Organization</label>
                <input
                  type="text"
                  value={settings.socialLinks?.github || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Key Proof Statistics */}
          <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2 border-b border-white/10 pb-3">
              <HiChartBar />
              <span>Key Business Proof Stats (Shown on Home / About)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Uptime SLA</label>
                <input
                  type="text"
                  value={settings.stats?.uptimeSLA || "99.9%"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, uptimeSLA: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500 font-bold text-center"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Production Systems</label>
                <input
                  type="text"
                  value={settings.stats?.productionSystems || "40+"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, productionSystems: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500 font-bold text-center"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">AI Resumes Scored</label>
                <input
                  type="text"
                  value={settings.stats?.aiResumesProcessed || "50K+"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, aiResumesProcessed: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500 font-bold text-center"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Support Cadence</label>
                <input
                  type="text"
                  value={settings.stats?.supportAvailability || "24/7"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, supportAvailability: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-emerald-500 font-bold text-center"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Admin Passkey & Security */}
          <div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00D2FF] flex items-center gap-2 border-b border-cyan-500/20 pb-3">
              <HiKey />
              <span>Admin Security Passkey</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Master Admin Passkey</label>
                <input
                  type="text"
                  value={settings.adminPasskey || "NexoraAdmin@2026"}
                  onChange={(e) => setSettings({ ...settings, adminPasskey: e.target.value })}
                  placeholder="NexoraAdmin@2026"
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-[#00D2FF] font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Quick 6-Digit PIN</label>
                <input
                  type="text"
                  value={settings.quickPin || "707988"}
                  onChange={(e) => setSettings({ ...settings, quickPin: e.target.value })}
                  placeholder="707988"
                  className="w-full rounded-xl border border-white/10 bg-[#070e1e] p-3 text-white focus:outline-none focus:border-[#00D2FF] font-mono text-xs text-center"
                />
              </div>
            </div>
          </div>

          {/* Save Button Bar */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.35)] transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <HiCheckCircle size={16} />
              <span>{saving ? "Saving Changes..." : "Save All Site Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
