import { useEffect, useRef } from "react";

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Detect mobile view
    const isMobile = window.innerWidth < 768;

    // Enhanced particle configuration - reduced for mobile
    const particleCount = isMobile ? 50 : 120;
    const connectionDistance = isMobile ? 120 : 160;
    const mouseDistance = isMobile ? 200 : 280;

    // Mobile opacity multiplier
    const mobileOpacityMultiplier = isMobile ? 0.4 : 1;

    // Premium color palette
    const colors = [
      { r: 6, g: 182, b: 212 },   // Cyan
      { r: 59, g: 130, b: 246 }, // Blue
      { r: 124, g: 58, b: 237 }, // Violet
      { r: 168, g: 85, b: 247 }, // Purple
    ];

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number; g: number; b: number };
      pulse: number;
      pulseSpeed: number;
      layer: number;
    }[] = [];

    // Initialize particles with layers for depth
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random() > 0.5 ? 1 : 0;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (layer === 0 ? 0.3 : 0.6),
        vy: (Math.random() - 0.5) * (layer === 0 ? 0.3 : 0.6),
        radius: layer === 0 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        layer,
      });
    }

    // Mouse position
    const mouse = { x: -1000, y: -1000 };
    const mouseTrail: { x: number; y: number; alpha: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Add to trail
      mouseTrail.push({ x: mouse.x, y: mouse.y, alpha: 1 });
      if (mouseTrail.length > 15) mouseTrail.shift();
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, `rgba(6, 182, 212, ${0.03 * mobileOpacityMultiplier})`);
      gradient.addColorStop(0.5, `rgba(124, 58, 237, ${0.02 * mobileOpacityMultiplier})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mouse trail
      mouseTrail.forEach((point, index) => {
        point.alpha -= 0.06;
        if (point.alpha > 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4 * point.alpha, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 58, 237, ${point.alpha * 0.3 * mobileOpacityMultiplier})`;
          ctx.fill();
        }
      });

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Update pulse
        particle.pulse += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;
        const currentRadius = particle.radius * pulseScale;

        // Draw particle with glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          currentRadius * 3
        );
        glowGradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${0.4 * particle.layer * mobileOpacityMultiplier})`);
        glowGradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${0.2 * particle.layer * mobileOpacityMultiplier})`);
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${(0.8 + Math.sin(particle.pulse) * 0.2) * mobileOpacityMultiplier})`;
        ctx.fill();

        // Connect to nearby particles with gradient lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4 * mobileOpacityMultiplier;
            
            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              particles[j].x,
              particles[j].y
            );
            lineGradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`);
            lineGradient.addColorStop(1, `rgba(${particles[j].color.r}, ${particles[j].color.g}, ${particles[j].color.b}, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.5 + particle.layer * 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse with enhanced effect
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const opacity = (1 - distance / mouseDistance) * 0.8 * mobileOpacityMultiplier;
          
          // Gradient line to mouse
          const mouseGradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            mouse.x,
            mouse.y
          );
          mouseGradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`);
          mouseGradient.addColorStop(1, `rgba(124, 58, 237, ${opacity})`);
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = mouseGradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw enhanced mouse glow with ripple
      const mouseGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        30
      );
      mouseGlow.addColorStop(0, `rgba(124, 58, 237, ${0.4 * mobileOpacityMultiplier})`);
      mouseGlow.addColorStop(0.3, `rgba(124, 58, 237, ${0.2 * mobileOpacityMultiplier})`);
      mouseGlow.addColorStop(0.6, `rgba(6, 182, 212, ${0.1 * mobileOpacityMultiplier})`);
      mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = mouseGlow;
      ctx.fill();

      // Mouse ripple effect
      const time = Date.now() / 1000;
      for (let i = 0; i < 3; i++) {
        const rippleRadius = 10 + (time * 20 + i * 15) % 45;
        const rippleOpacity = 1 - (rippleRadius / 45);
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124, 58, 237, ${rippleOpacity * 0.3 * mobileOpacityMultiplier})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        width: "100%", 
        height: "100%",
        zIndex: -1
      }}
    />
  );
};

export default NetworkBackground;
