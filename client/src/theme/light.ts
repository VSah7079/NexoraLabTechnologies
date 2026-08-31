import { colors } from "@/theme/colors";

export const lightTheme = {
  background: "#FFFFFF",
  surface: "#F8FAFC",
  card: "#FFFFFF",
  text: "#111827",
  textSecondary: "#52525B",
  textMuted: "#9CA3AF",
  border: "#E4E4E7",
  borderLight: "#F1F5F9",
  primary: colors.primary,      // #2563EB
  secondary: colors.secondary,   // #22D3EE
  accent: colors.accent,         // #7C3AED
  success: colors.success,       // #22C55E
  warning: colors.warning,       // #F59E0B
  danger: colors.danger,         // #EF4444
  info: colors.info,             // #38BDF8
  glass: "rgba(255,255,255,.06)",
  glassBorder: "rgba(255,255,255,.08)",
  shadow: "rgba(0,0,0,0.08)",
  shadowLg: "rgba(0,0,0,0.12)",
  hover: "rgba(0,0,0,.05)",
  active: "rgba(0,0,0,.10)",
  disabled: "#E5E7EB",
  inputBg: "#F9FAFB",
  inputBorder: "#D1D5DB",
  inputFocus: colors.primary,
  placeholder: "#9CA3AF",
};

export type LightTheme = typeof lightTheme;
export default lightTheme;