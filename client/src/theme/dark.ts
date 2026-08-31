// import { colors } from "@/constants/colors";
import { colors } from "./colors";

export const darkTheme = {
  background: colors.dark,          // #050816
  surface: "#0B1120",
  card: "#111827",
  text: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textMuted: "#6B7280",
  border: "rgba(255,255,255,.08)",
  borderLight: "rgba(255,255,255,.04)",
  primary: colors.primary,          // #2563EB
  secondary: colors.secondary,      // #22D3EE
  accent: colors.accent,            // #7C3AED
  success: colors.success,          // #22C55E
  warning: colors.warning,          // #F59E0B
  danger: colors.danger,            // #EF4444
  info: colors.info,                // #38BDF8
  glass: colors.glass,              // rgba(255,255,255,.06)
  glassBorder: colors.glassBorder,  // rgba(255,255,255,.08)
  shadow: "rgba(0,0,0,0.5)",
  shadowLg: "rgba(0,0,0,0.6)",
  hover: "rgba(255,255,255,.05)",
  active: "rgba(255,255,255,.10)",
  disabled: "#374151",
  inputBg: "#1F2937",
  inputBorder: "#374151",
  inputFocus: colors.primary,
  placeholder: "#6B7280",
};

export type DarkTheme = typeof darkTheme;
export default darkTheme;