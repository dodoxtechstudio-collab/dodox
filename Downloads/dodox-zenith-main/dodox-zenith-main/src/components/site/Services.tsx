import { Globe, Smartphone, Cpu, Database, Settings, LayoutDashboard, Briefcase, Brain, Workflow, Terminal, Bot, GitBranch, Layers } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { icon: Globe, title: "Website Development", desc: "High-performance, cinematic web experiences." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feel iOS & Android apps." },
  { icon: Brain, title: "AI Automation", desc: "Intelligent agents that work 24/7." },
  { icon: Database, title: "ERPNextServices Development", desc: "Tailored ERP platforms end-to-end." },
  { icon: Settings, title: "ERPNext Customization", desc: "Workflows, forms, reports, integrations." },
  { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Real-time analytics, beautiful UI." },
  { icon: Briefcase, title: "Business Management Systems", desc: "Operate every department from one console." },
  { icon: Cpu, title: "AI-Based Systems", desc: "OCR, classification, intelligent routing." },
  { icon: Workflow, title: "Automation Tools", desc: "n8n pipelines & no-code orchestration." },
  { icon: Terminal, title: "Linux System Administration", desc: "Server hardening, monitoring, uptime ops." },
  { icon: Bot, title: "Python / UiPath Automation", desc: "RPA bots & Python scripts for repetitive work." },
  { icon: GitBranch, title: "DevOps", desc: "CI/CD, Docker, cloud infra & deployment pipelines." },
  { icon: Layers, title: "Full Stack Development", desc: "React, Node, databases — end-to-end builds." },
];

const serviceCategories = ["All", "AI & Automation", "ERP & Business Systems", "Development", "DevOps & Cloud"];

function SpotlightCard({ s }: { s: typeof services[0] }) {
  const Icon = s.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative glass rounded-2xl p-6 hairline-border overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-white/10 h-full"
      style={{
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Spotlight glow follows cursor using CSS variables to prevent React renders */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(103,232,249,0.08), transparent 70%)`,
        }}
      />

      {/* Touch-optimized static overlay for mobile */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.04] via-transparent to-[#67e8f9]/[0.05] pointer-events-none" />

      {/* Edge highlight */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%)",
          WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative">
        <div className="h-11 w-11 rounded-xl glass grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="h-5 w-5 text-[var(--cyan-soft)]" strokeWidth={1.4} />
        </div>
        <h3 className="text-base font-semibold text-white/95">{s.title}</h3>
        <p className="mt-2 text-sm text-white/55 leading-relaxed">{s.desc}</p>
      </div>
    </div>
  );
}

export function Services() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = services.filter((s) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "AI & Automation") {
      return ["AI Automation", "AI-Based Systems", "Automation Tools", "Python / UiPath Automation"].includes(s.title);
    }
    if (activeCategory === "ERP & Business Systems") {
      return ["ERPNextServices Development", "ERPNext Customization", "Business Management Systems", "Admin Dashboards"].includes(s.title);
    }
    if (activeCategory === "Development") {
      return ["Website Development", "Mobile App Development", "Full Stack Development"].includes(s.title);
    }
    if (activeCategory === "DevOps & Cloud") {
      return ["DevOps", "Linux System Administration"].includes(s.title);
    }
    return true;
  });

  return (
    <section id="services" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        
        {/* Centered / clean header layout with category filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5 font-semibold">
              Services
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-platinum leading-[1.05]">
              Engineered for businesses
              <br />
              <span className="italic font-light text-silver-glow">that refuse to stand still.</span>
            </h2>
          </div>
        </div>

        {/* Premium Category Filter Bar */}
        <div className="flex flex-wrap gap-2 pt-2 mb-10">
          {serviceCategories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  active
                    ? "silver-gradient text-[#030712] shadow-[0_0_15px_rgba(103,232,249,0.25)] scale-102"
                    : "bg-white/[0.02] border border-white/5 text-white/55 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Animated Grid */}
        <motion.div 
          layout 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((s) => (
              <motion.div
                layout
                key={s.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SpotlightCard s={s} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
