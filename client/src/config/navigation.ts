// src/config/navigation.ts
export const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Portfolio", path: "/portfolio" },
  { title: "Careers", path: "/careers" },
  { title: "Contact", path: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
