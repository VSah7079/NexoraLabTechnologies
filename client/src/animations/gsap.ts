// src/animations/gsap.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// HERO ANIMATIONS
// ============================================

export const heroAnimation = (element: HTMLElement) => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
  });

  tl.fromTo(
    element.querySelector(".hero-title"),
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2 }
  )
    .fromTo(
      element.querySelector(".hero-subtitle"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      element.querySelector(".hero-cta"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

  return tl;
};

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

export const revealAnimation = (elements: NodeListOf<Element>) => {
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

// ============================================
// PARALLAX ANIMATION
// ============================================

export const parallaxAnimation = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => {
      const scroller = ScrollTrigger.getById("scroller");
      return scroller ? scroller.progress * speed * 100 : 0;
    },
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
};

// ============================================
// COUNTER ANIMATION
// ============================================

export const counterAnimation = (
  element: HTMLElement,
  target: number,
  duration: number = 2
) => {
  gsap.fromTo(
    element,
    { innerText: 0 },
    {
      innerText: target,
      duration: duration,
      ease: "power2.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        const target = this.targets()[0];
        const current = Math.floor(Number(target.innerText));
        target.innerText = current + (current < target ? "+" : "");
      },
    }
  );
};

// ============================================
// TEXT REVEAL ANIMATION
// ============================================

export const textRevealGSAP = (element: HTMLElement) => {
  const chars = element.textContent?.split("") || [];
  element.innerHTML = "";

  chars.forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(30px)";
    element.appendChild(span);

    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: i * 0.03,
      ease: "power3.out",
    });
  });
};

// ============================================
// IMAGE REVEAL ANIMATION
// ============================================

export const imageRevealGSAP = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// ============================================
// FADE IN ON SCROLL
// ============================================

export const fadeInOnScroll = (elements: NodeListOf<Element>) => {
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

// ============================================
// SLIDE IN ON SCROLL
// ============================================

export const slideInOnScroll = (elements: NodeListOf<Element>) => {
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  heroAnimation,
  revealAnimation,
  parallaxAnimation,
  counterAnimation,
  textRevealGSAP,
  imageRevealGSAP,
  fadeInOnScroll,
  slideInOnScroll,
};