import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dodoxLogo from "@/assets/dodox-logo.png";

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 350);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "#030712",
            // DO NOT use flexbox — use absolute center on inner wrapper
          }}
        >
          {/* Centered content wrapper — most reliable cross-browser technique */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "max-content",
              maxWidth: "90vw",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", marginBottom: 20 }}
            >
              <img
                src={dodoxLogo}
                alt="DodoX Tech"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 22px rgba(103,232,249,0.6))",
                }}
              />
              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: 22,
                  border: "1px dashed rgba(103,232,249,0.25)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}
            >
              <span style={{ fontSize: 24, fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.02em" }}>
                DodoX
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#67e8f9", letterSpacing: "-0.02em" }}>
                Tech
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 28,
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Build Smarter · Grow Faster
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ width: 160 }}
            >
              <div
                style={{
                  height: 1,
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(to right, rgba(255,255,255,0.5), #ffffff)",
                    borderRadius: 999,
                  }}
                />
              </div>
              <p
                style={{
                  marginTop: 8,
                  textAlign: "center",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.22)",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "monospace",
                }}
              >
                {Math.round(progress)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
