// src/animations/variants.ts
// src/animations/variants.ts
import type { Variants } from "framer-motion";

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideIn: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const slideUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// ROTATE ANIMATIONS
// ============================================

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

// ============================================
// HERO ANIMATIONS
// ============================================

export const heroText: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] },
  },
};

export const heroButtons: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

export const pageSlide: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// REVEAL ANIMATIONS
// ============================================

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// INFINITE ANIMATIONS
// ============================================

export const float = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// ============================================
// TIMELINE ANIMATIONS
// ============================================

export const timelineContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const timelineItem: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleUp,
  staggerContainer,
  staggerChildren,
  slideIn,
  slideUp,
  rotateIn,
  cardHover,
  cardEntrance,
  heroText,
  heroSubtitle,
  heroButtons,
  heroBadge,
  pageFade,
  pageSlide,
  textReveal,
  imageReveal,
  float,
  pulse,
  timelineContainer,
  timelineItem,
};