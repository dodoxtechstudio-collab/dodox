import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Clock, TrendingUp, Wallet, Rocket } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString() + suffix);

  useEffect(() => {
    if (!inView) return;
    // Faster animation or skip counter animation on mobile entirely to reduce rendering lag
    const controls = animate(mv, to, { duration: isMobile ? 1 : 1.8, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const items = [
  { icon: Clock, value: 72, suffix: "%", label: "Save Time", desc: "Cut manual operations dramatically.", color: "#67e8f9" },
  { icon: TrendingUp, value: 3, suffix: "x", label: "Improve Productivity", desc: "Teams move faster with automation.", color: "#a5b4fc" },
  { icon: Wallet, value: 45, suffix: "%", label: "Reduce Costs", desc: "Lean stacks, optimized infrastructure.", color: "#86efac" },
  { icon: Rocket, value: 10, suffix: "x", label: "Scale Your Business", desc: "Architected to grow with you.", color: "#fda4af" },
];

function MetricCard({ it, i }: { it: typeof items[0]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = it.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: 1000 }}
      className="relative cursor-pointer select-none"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Front */}
        <div
          className="relative glass-strong rounded-2xl p-7 border border-white/5 overflow-hidden group transition-all duration-300 hover:border-white/10"
          style={{ backfaceVisibility: "hidden", willChange: "transform" }}
        >
          <div
            className="absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl transition duration-700 group-hover:scale-125"
            style={{ background: `${it.color}10` }}
          />
          {/* Replaced Framer Motion spring hover with lightweight GPU-accelerated CSS hover */}
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 inline-block">
            <Icon className="h-6 w-6 mb-5" strokeWidth={1.3} style={{ color: it.color }} />
          </div>
          <div className="text-4xl sm:text-5xl font-semibold text-platinum tracking-tight">
            <Counter to={it.value} suffix={it.suffix} />
          </div>
          <div className="mt-3 text-sm font-medium text-white">{it.label}</div>
          <p className="mt-1 text-sm text-white/55 leading-relaxed">{it.desc}</p>
          <div className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/25">Click to flip</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-strong rounded-2xl p-7 border border-white/5 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", willChange: "transform" }}
        >
          <div
            className="h-14 w-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: `${it.color}15`, border: `1px solid ${it.color}40` }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.3} style={{ color: it.color }} />
          </div>
          <div className="text-3xl font-semibold text-platinum">{it.value}{it.suffix}</div>
          <div className="mt-2 text-sm font-medium text-white">{it.label}</div>
          <p className="mt-3 text-xs text-white/50 leading-relaxed">{it.desc}</p>
          <div className="mt-4 text-[9px] uppercase tracking-[0.2em] text-white/25">Click to flip back</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WhyUs() {
  return (
    <section id="products" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-mask opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5 font-semibold">
            Why DodoX
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-platinum leading-[1.05]">
            Measurable outcomes.
            <br />
            <span className="italic font-light text-silver-glow">Project Delivery experience.</span>
          </h2>
          <p className="mt-4 text-xs text-white/40 tracking-wider">
            Click any card to explore
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <MetricCard key={it.label} it={it} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
