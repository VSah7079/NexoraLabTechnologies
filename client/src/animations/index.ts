// src/animations/index.ts

// ✅ Export all from variants
export * from "./variants";

// ✅ Export all from gsap
export * from "./gsap";

// ✅ Default export
import * as variants from "./variants";
import * as gsap from "./gsap";

export default {
  ...variants,
  ...gsap,
};