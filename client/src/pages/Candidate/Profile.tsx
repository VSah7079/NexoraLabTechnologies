import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { userAPI } from "@/services/api";
import { HiUser, HiPencilSquare, HiCheckCircle } from "react-icons/hi2";

const CandidateProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: [] as string[],
    experience: 0,
    location: "",
    website: "",
    linkedin: "",
    github: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.success) {
        setUser(response.user);
        setFormData({
          name: response.user.name || "",
          email: response.user.email || "",
          phone: response.user.phone || "",
          bio: response.user.bio || "",
          skills: response.user.skills || [],
          experience: response.user.experience || 0,
          location: response.user.location || "",
          website: response.user.website || "",
          linkedin: response.user.linkedin || "",
          github: response.user.github || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await userAPI.updateProfile(formData);
      if (response.success) {
        setUser(response.user);
        setEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00D2FF] border-t-transparent"></div>
      </div>
    );
  }

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">My Profile</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Manage your personal details, credentials, and technical skillset
          </p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          <HiPencilSquare className="text-base" />
          <span>{editing ? "Cancel Editing" : "Edit Profile"}</span>
        </button>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] flex items-center justify-center text-2xl text-white font-black shadow-lg shadow-cyan-500/30">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            {editing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-xl font-bold text-white bg-transparent border-b-2 border-slate-700 focus:border-[#00D2FF] outline-none"
              />
            ) : (
              <h2 className="text-xl sm:text-2xl font-black text-white">{user?.name || "Enterprise User"}</h2>
            )}
            <p className="text-xs text-[#00D2FF] font-semibold mt-0.5 capitalize">{user?.role || "Candidate"}</p>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="border border-slate-800 rounded-2xl p-4 bg-[#0b132b]/85">
            <p className="text-xs font-semibold text-slate-400">Phone</p>
            {editing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="font-medium text-white bg-transparent border-b border-slate-700 focus:border-[#00D2FF] outline-none w-full text-sm mt-1"
              />
            ) : (
              <p className="font-medium text-white text-sm mt-1">{user?.phone || "Not provided"}</p>
            )}
          </div>

          <div className="border border-slate-800 rounded-2xl p-4 bg-[#0b132b]/85">
            <p className="text-xs font-semibold text-slate-400">Location</p>
            {editing ? (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="font-medium text-white bg-transparent border-b border-slate-700 focus:border-[#00D2FF] outline-none w-full text-sm mt-1"
              />
            ) : (
              <p className="font-medium text-white text-sm mt-1">{user?.location || "Not provided"}</p>
            )}
          </div>

          <div className="border border-slate-800 rounded-2xl p-4 bg-[#0b132b]/85">
            <p className="text-xs font-semibold text-slate-400">Experience</p>
            {editing ? (
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                className="font-medium text-white bg-transparent border-b border-slate-700 focus:border-[#00D2FF] outline-none w-full text-sm mt-1"
              />
            ) : (
              <p className="font-medium text-white text-sm mt-1">{user?.experience || 0} Years</p>
            )}
          </div>

          <div className="border border-slate-800 rounded-2xl p-4 bg-[#0b132b]/85">
            <p className="text-xs font-semibold text-slate-400">Portfolio Website</p>
            {editing ? (
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="font-medium text-white bg-transparent border-b border-slate-700 focus:border-[#00D2FF] outline-none w-full text-sm mt-1"
              />
            ) : (
              <p className="font-medium text-white text-sm mt-1">{user?.website || "Not provided"}</p>
            )}
          </div>
        </div>

        <div className="border border-slate-800 rounded-2xl p-4 bg-[#0b132b]/85 mt-4">
          <p className="text-xs font-semibold text-slate-400">Bio & Summary</p>
          {editing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="font-medium text-white bg-[#0a1128] border border-slate-700 focus:border-[#00D2FF] outline-none w-full mt-2 rounded-xl p-3 text-sm resize-none"
            />
          ) : (
            <p className="font-normal text-slate-300 text-sm mt-1">{user?.bio || "No summary added yet."}</p>
          )}
        </div>

        <div className="border border-slate-800 rounded-2xl p-4 bg-[#0b132b]/85 mt-4">
          <p className="text-xs font-semibold text-slate-400">Technical Skills</p>
          {editing ? (
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  >
                    {skill}
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="text-cyan-300 hover:text-rose-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSkillAdd(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
                className="w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3 py-2 text-xs text-white focus:border-[#00D2FF] outline-none"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-500">No skills added</p>
              )}
            </div>
          )}
        </div>

        {editing && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3 text-xs font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-full border border-slate-700 bg-[#0a1128] px-8 py-3 text-xs font-bold text-slate-300 transition-all hover:border-[#00D2FF]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CandidateProfile;