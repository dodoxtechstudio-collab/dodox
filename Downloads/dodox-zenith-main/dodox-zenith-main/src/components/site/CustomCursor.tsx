import { useEffect, useRef, useState } from "react";

const SILVER_TONES = [
  "rgba(248, 250, 252, 0.95)",
  "rgba(209, 213, 219, 0.8)",
  "rgba(156, 163, 175, 0.6)",
  "rgba(229, 231, 235, 0.4)",
];

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Use refs for positions to avoid triggering React updates on mouse move
  const mouse = useRef({ x: -100, y: -100 });
  
  // Array of trail coordinates and their interpolation speeds
  const trails = useRef([
    { x: -100, y: -100, lerp: 0.25 }, // Trail 0 (Lead dot)
    { x: -100, y: -100, lerp: 0.15 }, // Trail 1 (Ring)
    { x: -100, y: -100, lerp: 0.10 }, // Trail 2 (Dot 2)
    { x: -100, y: -100, lerp: 0.06 }, // Trail 3 (Dot 3)
  ]);

  // Track scales mathematically inside the loop (no fighting with CSS transitions)
  const scales = useRef({
    lead: 1.0,
    ring: 1.0,
    glow: 1.0,
  });

  const glowRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".cursor-pointer") ||
          target.classList.contains("interactive"))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleHoverStart, { passive: true });

    // Butter-smooth RAF loop for updating trail positions & scales
    let animId: number;
    const updateTrails = () => {
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;

      // Mathematically interpolate the scale values for premium spring feel
      const targetLeadScale = hovered ? 1.6 : 1.0;
      const targetRingScale = hovered ? 2.0 : 1.0;
      const targetGlowScale = hovered ? 2.0 : 1.0;

      scales.current.lead += (targetLeadScale - scales.current.lead) * 0.15;
      scales.current.ring += (targetRingScale - scales.current.ring) * 0.15;
      scales.current.glow += (targetGlowScale - scales.current.glow) * 0.15;

      trails.current.forEach((trail, i) => {
        trail.x += (targetX - trail.x) * trail.lerp;
        trail.y += (targetY - trail.y) * trail.lerp;

        const el = elRefs.current[i];
        if (el) {
          // Centering + active scaling (0% CSS transition lag, 120FPS smooth feedback)
          let currentScale = 1.0;
          if (i === 0) currentScale = scales.current.lead;
          if (i === 1) currentScale = scales.current.ring;
          if (i > 1) currentScale = hovered ? 0.0 : 1.0; // Hide trail dots instantly or fade them

          el.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate3d(-50%, -50%, 0) scale(${currentScale})`;
        }
      });

      // Update separate glow backdrop tied to Trail 1 (index 1) with matching scale lerp
      if (glowRef.current) {
        const t1 = trails.current[1];
        glowRef.current.style.transform = `translate3d(${t1.x}px, ${t1.y}px, 0) translate3d(-50%, -50%, 0) scale(${scales.current.glow})`;
      }

      animId = requestAnimationFrame(updateTrails);
    };

    animId = requestAnimationFrame(updateTrails);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleHoverStart);
      cancelAnimationFrame(animId);
    };
  }, [hidden, hovered]); // Listen to hovered changes to capture correct targets

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Glow aura backdrop (tied to separate glowRef) */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(209,213,219,0.05) 50%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(8px)",
          willChange: "transform",
        }}
      />

      {/* Lead cursor dot (tied to Trail 0) */}
      <div
        ref={(el) => { elRefs.current[0] = el; }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: SILVER_TONES[0],
          borderRadius: "50%",
          boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Trailing ring 1 (tied to Trail 1) */}
      <div
        ref={(el) => { elRefs.current[1] = el; }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderColor: SILVER_TONES[1],
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "50%",
          willChange: "transform, opacity, box-shadow",
          opacity: hovered ? 0.95 : 0.65,
          boxShadow: hovered 
            ? "0 0 15px 3px rgba(255, 255, 255, 0.4), inset 0 0 10px 1px rgba(255, 255, 255, 0.2)"
            : "0 0 8px 1px rgba(209, 213, 219, 0.2)",
          transition: "opacity 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Trailing dot 2 (tied to Trail 2) */}
      <div
        ref={(el) => { elRefs.current[2] = el; }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: SILVER_TONES[2],
          borderRadius: "50%",
          boxShadow: "0 0 6px 1px rgba(156, 163, 175, 0.4)",
          willChange: "transform",
        }}
      />

      {/* Trailing dot 3 (tied to Trail 3) */}
      <div
        ref={(el) => { elRefs.current[3] = el; }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          backgroundColor: SILVER_TONES[3],
          borderRadius: "50%",
          willChange: "transform",
        }}
      />
    </div>
  );
}
