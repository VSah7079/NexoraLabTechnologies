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
  HiShieldCheck,
  HiLockClosed,
  HiUser,
  HiSparkles,
} from "react-icons/hi2";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook, FaYoutube, FaXTwitter, FaGithub } from "react-icons/fa6";
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
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Admin Profile / Password State
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

        if (settingsRes.status === "fulfilled" && settingsRes.value?.success) {
          setSettings((prev: any) => ({
            ...prev,
            ...settingsRes.value.settings,
            socialLinks: { ...prev.socialLinks, ...(settingsRes.value.settings.socialLinks || {}) },
            stats: { ...prev.stats, ...(settingsRes.value.settings.stats || {}) },
          }));
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
        console.warn("Settings loading warning:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await adminService.updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError("");
    setCredSuccess(false);

    if (adminProfile.newPassword) {
      if (adminProfile.newPassword.length < 6) {
        setCredError("New password must be at least 6 characters long.");
        return;
      }
      if (adminProfile.newPassword !== adminProfile.confirmPassword) {
        setCredError("Passwords do not match. Please re-check.");
        return;
      }
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

  return (
    <AdminLayout
      title="Global Site & Security Settings"
      subtitle="Manage public company contact channels, verified SLA counters, social links, and admin access keys."
      badge="Configuration Hub"
    >
      <div className="space-y-8">
        {/* Success Banner */}
        {savedSuccess && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-300 flex items-center gap-2 shadow-lg animate-fade-in">
            <HiCheckCircle size={18} className="text-emerald-400 shrink-0" />
            <span>Site settings updated successfully across website & API server!</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Section 1: Company Profile & Contact Info */}
          <div className="rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400">
                <HiMapPin size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-['Outfit']">
                  Company Identity & Public Contact
                </h3>
                <p className="text-xs text-slate-400">Displayed in Navbar, Footer, and contact points.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Official Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Public Support Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiEnvelope size={16} />
                  </div>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Direct Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiPhone size={16} />
                  </div>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">WhatsApp Chat Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <FaWhatsapp size={16} />
                  </div>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="+917079884369"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Headquarters Address</label>
                <input
                  type="text"
                  value={settings.hqAddress}
                  onChange={(e) => setSettings({ ...settings, hqAddress: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Verified Live Stats Counters */}
          <div className="rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                <HiChartBar size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-['Outfit']">
                  Verified Trust Metrics & SLA Counters
                </h3>
                <p className="text-xs text-slate-400">Displayed in Hero, About Us, and Footer statistics.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Uptime SLA</label>
                <input
                  type="text"
                  value={settings.stats?.uptimeSLA || "99.9%"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, uptimeSLA: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Production Systems</label>
                <input
                  type="text"
                  value={settings.stats?.productionSystems || "40+"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, productionSystems: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">AI Resumes Screened</label>
                <input
                  type="text"
                  value={settings.stats?.aiResumesProcessed || "50K+"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, aiResumesProcessed: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Support Availability</label>
                <input
                  type="text"
                  value={settings.stats?.supportAvailability || "24/7"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: { ...settings.stats, supportAvailability: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Official Social Media Links */}
          <div className="rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-400">
                <HiShare size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-['Outfit']">
                  Official Social Channels & Profiles
                </h3>
                <p className="text-xs text-slate-400">Linked globally across footer, hero and contact widgets.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FaLinkedin className="text-blue-400" /> LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FaInstagram className="text-pink-400" /> Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FaFacebook className="text-blue-500" /> Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.facebook || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FaYoutube className="text-red-500" /> YouTube
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.youtube || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FaXTwitter className="text-slate-200" /> X (Twitter)
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FaGithub className="text-slate-300" /> GitHub
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.github || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving Changes..." : "Save Site Settings"}
            </button>
          </div>
        </form>

        {/* Section 4: Admin Profile & Security Password Gate */}
        <div className="rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
              <HiShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-['Outfit']">
                Admin Profile & Passkey Security Gate
              </h3>
              <p className="text-xs text-slate-400">Update root administrator username, login email, and password.</p>
            </div>
          </div>

          {credSuccess && (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-xs font-bold text-emerald-300 flex items-center gap-2">
              <HiCheckCircle size={16} />
              <span>Admin credentials updated successfully!</span>
            </div>
          )}

          {credError && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs font-bold text-red-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span>{credError}</span>
            </div>
          )}

          <form onSubmit={handleSaveCredentials} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Admin Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiUser size={16} />
                  </div>
                  <input
                    type="text"
                    value={adminProfile.username}
                    onChange={(e) => setAdminProfile({ ...adminProfile, username: e.target.value })}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Login Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiEnvelope size={16} />
                  </div>
                  <input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Display Name</label>
                <input
                  type="text"
                  value={adminProfile.name}
                  onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">New Password (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiLockClosed size={16} />
                  </div>
                  <input
                    type="password"
                    value={adminProfile.newPassword}
                    onChange={(e) => setAdminProfile({ ...adminProfile, newPassword: e.target.value })}
                    placeholder="Leave blank to keep current password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Confirm New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiLockClosed size={16} />
                  </div>
                  <input
                    type="password"
                    value={adminProfile.confirmPassword}
                    onChange={(e) => setAdminProfile({ ...adminProfile, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={credSaving}
                className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {credSaving ? "Updating Security..." : "Update Security Credentials"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
