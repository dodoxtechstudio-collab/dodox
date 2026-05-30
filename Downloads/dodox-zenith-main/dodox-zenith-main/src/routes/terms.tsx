import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ScrollText } from "lucide-react";
import dodoxLogo from "@/assets/dodox-logo.png";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — DodoX Tech" },
      { name: "description", content: "Terms of Service for DodoX Tech — Coming Soon." },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      <nav className="fixed inset-x-0 top-0 z-50 px-6 py-4 glass-strong border-b border-white/5">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1 group">
            <img src={dodoxLogo} alt="DodoX Tech" className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(103,232,249,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(103,232,249,0.7)] transition-all duration-300" />
            <span className="font-semibold text-white">DodoX <span className="text-[#67e8f9]">Tech</span></span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="text-center max-w-lg">
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative inline-flex items-center justify-center mb-8">
            <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-full bg-[#67e8f9]/10 blur-xl" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute h-24 w-24 rounded-full border border-dashed border-[#67e8f9]/25" />
            <div className="relative h-20 w-20 rounded-2xl glass-strong border border-white/10 flex items-center justify-center">
              <ScrollText className="h-9 w-9 text-[#67e8f9]" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#67e8f9]/20 text-[11px] uppercase tracking-widest text-[#67e8f9] font-bold mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67e8f9] animate-pulse" />
            Coming Soon
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }} className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-5">
            Terms of Service<br />
            <span className="italic font-light text-white/50">are on their way.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }} className="text-white/50 text-base leading-relaxed mb-10">
            Our Terms of Service are currently being finalised by our team. They will be available here soon. If you have any questions about our terms or working with us, don't hesitate to get in touch.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.45 }} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:dodoxtechstudio@gmail.com?subject=Terms%20Inquiry%20—%20DodoX%20Tech" className="inline-flex items-center justify-center gap-2 rounded-full silver-gradient text-[#030712] px-7 py-3 text-sm font-bold hover:-translate-y-0.5 transition-transform duration-300">
              Contact Us
            </a>
            <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full glass border border-white/10 text-white/70 hover:text-white px-7 py-3 text-sm font-medium hover:-translate-y-0.5 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.6 }} className="mt-10 text-white/25 text-xs">
            Questions? Email us at{" "}
            <a href="mailto:dodoxtechstudio@gmail.com" className="text-[#67e8f9]/60 hover:text-[#67e8f9] transition-colors">dodoxtechstudio@gmail.com</a>
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
    </div>
  );
}
