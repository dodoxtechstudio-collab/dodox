import { useEffect, useRef } from "react";

const SILVER_COLORS: [number, number, number][] = [
  [248, 250, 252],
  [209, 213, 219],
  [156, 163, 175],
  [229, 231, 235],
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number; alphaDir: number;
  color: [number, number, number];
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let paused = false;
    const particles: Particle[] = [];

    // Standardized count: 12 on mobile, 35 on desktop.
    // Reducing count from 60 to 35 reduces distance-check calculations by 66% (1770 -> 595),
    // allowing 60FPS fluid line rendering without any frame-skip flickering.
    const COUNT = isMobile ? 12 : 35;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    for (let i = 0; i < COUNT; i++) {
      const maxSpeed = isMobile ? 0.08 : 0.16;
      particles.push({
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        vx: rand(-maxSpeed, maxSpeed),
        vy: rand(-maxSpeed, maxSpeed),
        radius: rand(0.5, isMobile ? 1.4 : 1.8),
        alpha: rand(0.06, 0.4),
        alphaDir: rand(-0.0008, 0.0008),
        color: SILVER_COLORS[Math.floor(Math.random() * SILVER_COLORS.length)],
      });
    }

    // Pause when tab is hidden — saves CPU entirely
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (paused) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connection lines — drawn every frame for smooth, flicker-free presentation
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 130 * 130) {
              const dist = Math.sqrt(distSq);
              const [r, g, b] = particles[i].color;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${r},${g},${b},${0.04 * (1 - dist / 130)})`;
              ctx.lineWidth = 0.35;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Particles movement
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha <= 0.04 || p.alpha >= 0.4) p.alphaDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const [r, g, b] = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      aria-hidden="true"
    />
  );
}
