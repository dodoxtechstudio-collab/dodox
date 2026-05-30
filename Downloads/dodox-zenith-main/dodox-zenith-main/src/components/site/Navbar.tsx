import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import dodoxLogo from "@/assets/dodox-logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "py-3" : "py-5"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-500 ${scrolled || open ? "glass-strong" : "bg-transparent"}`}>
            {/* Logo */}
            <a href="#home" className="flex items-center gap-1 group" onClick={() => setOpen(false)}>
              <img
                src={dodoxLogo}
                alt="DodoX Tech Logo"
                className="h-12 w-12 object-contain drop-shadow-[0_0_8px_rgba(103,232,249,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(103,232,249,0.7)] transition-all duration-300"
              />
              <span className="font-semibold tracking-tight text-white">
                DodoX <span className="text-[var(--cyan-soft)]">Tech</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-to-r from-white/60 to-[var(--cyan-soft)] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* CTA */}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full silver-gradient text-[#030712] px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium ambient-halo hover:-translate-y-0.5 transition"
              >
                <span className="hidden sm:inline">Start Project</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="md:hidden h-9 w-9 grid place-items-center rounded-lg glass text-white"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-[#030712]/95 backdrop-blur-2xl pt-24 px-6 pb-10"
          >
            {/* Ambient glow inside menu */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full blur-3xl bg-white/[0.03]" />
            </div>

            <nav className="flex flex-col gap-1 relative">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center py-4 px-2 border-b border-white/[0.06] text-lg font-medium text-white/80 hover:text-white transition-colors"
                >
                  <span>{l.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA inside menu */}
            <div className="mt-auto relative">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl silver-gradient text-[#030712] py-4 text-base font-semibold"
              >
                Start Your Project <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-center text-white/25 text-xs mt-4 tracking-widest uppercase">
                DodoX Tech · Build Smarter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
