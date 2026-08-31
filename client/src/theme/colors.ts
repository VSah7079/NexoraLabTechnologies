export const colors = {
  // Brand Colors
  primary: "#2563EB",      // Blue
  secondary: "#22D3EE",    // Cyan
  accent: "#7C3AED",       // Purple

  // Status Colors
  success: "#22C55E",      // Green
  warning: "#F59E0B",      // Amber
  danger: "#EF4444",       // Red
  info: "#38BDF8",         // Sky Blue

  // Base Colors
  white: "#FFFFFF",
  black: "#000000",

  // Zinc Scale
  zinc50: "#FAFAFA",
  zinc100: "#F4F4F5",
  zinc200: "#E4E4E7",
  zinc300: "#D4D4D8",
  zinc400: "#A1A1AA",
  zinc500: "#71717A",
  zinc600: "#52525B",
  zinc700: "#3F3F46",
  zinc800: "#27272A",
  zinc900: "#18181B",

  // Dark Theme
  dark: "#050816",
  navy: "#07142E",

  // Glass Effects
  glass: "rgba(255,255,255,.06)",
  glassBorder: "rgba(255,255,255,.08)",

  transparent: "transparent",
};

// ✅ Optional: Type for colors
export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey];

