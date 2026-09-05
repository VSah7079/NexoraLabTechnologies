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

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 110;
    const connectionDistance = isMobile ? 120 : 160;
    const mouseDistance = isMobile ? 200 : 280;
    const mobileOpacityMultiplier = isMobile ? 0.4 : 1;

    // Exact Nexora Brand Spectrum
    const colors = [
      { r: 0, g: 210, b: 255 },   // Electric Cyan #00D2FF
      { r: 0, g: 102, b: 255 },   // Nexora Royal Blue #0066FF
      { r: 124, g: 58, b: 237 },  // Electric Violet #7C3AED
      { r: 147, g: 51, b: 234 },  // Deep Purple #9333EA
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

    const mouse = { x: -1000, y: -1000 };
    const mouseTrail: { x: number; y: number; alpha: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseTrail.push({ x: mouse.x, y: mouse.y, alpha: 1 });
      if (mouseTrail.length > 15) mouseTrail.shift();
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle radial glow background in Nexora colors
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, `rgba(0, 210, 255, ${0.03 * mobileOpacityMultiplier})`);
      gradient.addColorStop(0.5, `rgba(124, 58, 237, ${0.025 * mobileOpacityMultiplier})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mouse trail
      mouseTrail.forEach((point) => {
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
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.pulse += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulse) * 0.2;
        const currentRadius = particle.radius * pulseScale;

        // Draw particle glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          currentRadius * 3
        );
        glowGradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${0.45 * particle.layer * mobileOpacityMultiplier})`);
        glowGradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${0.2 * particle.layer * mobileOpacityMultiplier})`);
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${(0.85 + Math.sin(particle.pulse) * 0.15) * mobileOpacityMultiplier})`;
        ctx.fill();

        // Connect to nearby particles with gradient lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.45 * mobileOpacityMultiplier;
            
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
            ctx.lineWidth = 0.6 + particle.layer * 0.4;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const opacity = (1 - distance / mouseDistance) * 0.85 * mobileOpacityMultiplier;
          const mouseGradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            mouse.x,
            mouse.y
          );
          mouseGradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`);
          mouseGradient.addColorStop(1, `rgba(0, 210, 255, ${opacity})`);
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = mouseGradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw mouse glow
      const mouseGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        35
      );
      mouseGlow.addColorStop(0, `rgba(0, 210, 255, ${0.45 * mobileOpacityMultiplier})`);
      mouseGlow.addColorStop(0.4, `rgba(124, 58, 237, ${0.25 * mobileOpacityMultiplier})`);
      mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
      ctx.fillStyle = mouseGlow;
      ctx.fill();

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
