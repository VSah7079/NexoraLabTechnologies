import React, { useState, useRef } from "react";
import {
  HiPhoto,
  HiArrowUpTray,
  HiXMark,
  HiLink,
  HiCheckCircle,
} from "react-icons/hi2";
import { adminService, getAdminToken } from "@/services/admin.service";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label = "Upload Image / Banner",
  value,
  onChange,
  placeholder = "https://... or upload a local image file",
  helperText = "Supports JPG, PNG, WebP, SVG (Max 10MB)",
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"file" | "url">(value && value.startsWith("http") ? "url" : "file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        try {
          const token = getAdminToken();
          const res = await fetch("http://localhost:8000/api/admin/upload-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              image: base64Data,
              filename: file.name,
            }),
          });

          const data = await res.json();
          if (data.success && data.url) {
            const finalUrl = data.url.startsWith("http")
              ? data.url
              : `http://localhost:8000${data.url}`;
            onChange(finalUrl);
          } else {
            // Fallback direct base64
            onChange(base64Data);
          }
        } catch {
          // Direct fallback to client base64 preview
          onChange(base64Data);
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || "Failed to process image file");
      setUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <HiPhoto className="text-cyan-400" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-1 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`px-2 py-0.5 rounded-md transition ${
              mode === "file"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded-md transition ${
              mode === "url"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <HiLink size={16} />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, "-")}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/\s+/g, "-")}`}
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/15 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/40 transition cursor-pointer text-center group"
          >
            {uploading ? (
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <span className="h-4 w-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                <span>Uploading & Optimizing Image...</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
                  <HiArrowUpTray size={18} />
                </div>
                <p className="text-xs font-bold text-white">Click or Drag & Drop to Upload Image</p>
                <p className="text-[10px] text-slate-400">{helperText}</p>
              </div>
            )}
          </label>
        </div>
      )}

      {error && <p className="text-[11px] font-bold text-red-400">{error}</p>}

      {/* Live Preview Thumbnail */}
      {value && (
        <div className="relative mt-2 p-2 rounded-2xl border border-white/10 bg-[#040814] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={value}
              alt="Preview"
              className="h-12 w-16 sm:w-20 object-cover rounded-xl border border-white/10 shrink-0 bg-slate-900"
              onError={(e) => {
                // Fallback icon on image load error
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Image Attached</p>
              <p className="text-[10px] text-cyan-400 truncate">{value.substring(0, 45)}...</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
            title="Remove Image"
          >
            <HiXMark size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
