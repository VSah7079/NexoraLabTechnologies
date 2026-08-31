import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { userAPI, getUser } from "@/services/api";

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
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
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
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 flex items-center justify-center text-3xl text-white font-bold">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-cyan-400 outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            )}
            <p className="text-gray-500">{user?.role || "User"}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Phone</p>
            {editing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-400 outline-none w-full"
              />
            ) : (
              <p className="font-medium text-gray-900">{user?.phone || "Not provided"}</p>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Location</p>
            {editing ? (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-400 outline-none w-full"
              />
            ) : (
              <p className="font-medium text-gray-900">{user?.location || "Not provided"}</p>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Experience</p>
            {editing ? (
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-400 outline-none w-full"
              />
            ) : (
              <p className="font-medium text-gray-900">{user?.experience || 0} Years</p>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Website</p>
            {editing ? (
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-400 outline-none w-full"
              />
            ) : (
              <p className="font-medium text-gray-900">{user?.website || "Not provided"}</p>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">LinkedIn</p>
            {editing ? (
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-400 outline-none w-full"
              />
            ) : (
              <p className="font-medium text-gray-900">{user?.linkedin || "Not provided"}</p>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">GitHub</p>
            {editing ? (
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-cyan-400 outline-none w-full"
              />
            ) : (
              <p className="font-medium text-gray-900">{user?.github || "Not provided"}</p>
            )}
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 mt-4">
          <p className="text-sm text-gray-500">Bio</p>
          {editing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="font-medium text-gray-900 bg-transparent border border-gray-300 focus:border-cyan-400 outline-none w-full mt-2 rounded-lg p-2"
            />
          ) : (
            <p className="font-medium text-gray-900 mt-1">{user?.bio || "No bio provided"}</p>
          )}
        </div>
        
        <div className="border border-gray-200 rounded-xl p-4 mt-4">
          <p className="text-sm text-gray-500">Skills</p>
          {editing ? (
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="text-cyan-700 hover:text-red-500"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-cyan-400 outline-none"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-1">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill: string) => (
                  <span key={skill} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No skills added</p>
              )}
            </div>
          )}
        </div>

        {editing && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
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