// src/config/constants.ts
export const APP_NAME = "NexoraLab Technologies";
export const APP_DESCRIPTION = "AI Powered Smart Hiring Platform";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ROLES = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export const JOB_TYPES = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  CONTRACT: "contract",
  INTERNSHIP: "internship",
} as const;