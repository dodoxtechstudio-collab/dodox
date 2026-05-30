import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  { q: "DodoX rebuilt our entire order pipeline. What used to take days now happens in minutes.", a: "Rajesh K.", r: "Operations Head, Textile Group" },
  { q: "Their ERPNext customization was surgical — exactly what our school needed.", a: "Meera S.", r: "Principal, Vagai Institute" },
  { q: "The AI extension saved us 40+ hours a week on product onboarding.", a: "Daniel V.", r: "E-commerce Lead" },
  { q: "Beautifully designed, brutally efficient. A rare combination.", a: "Aishwarya N.", r: "CTO, Retail SaaS" },
];

export function Testimonials() {
  const loop = [...items, ...items];
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">Testimonials</p>
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight text-platinum leading-[1.05]">
          Loved by teams that
          <br />
          <span className="italic font-light text-silver-glow">care about details.</span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10" />
        <div className="flex w-max gap-5 animate-marquee">
          {loop.map((t, i) => (
            <motion.figure
              key={i}
              className="w-[360px] md:w-[420px] glass-strong rounded-2xl p-7 hairline-border"
            >
              <Quote className="h-5 w-5 text-[var(--cyan-soft)] mb-4" />
              <blockquote className="text-white/85 leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10">
                <div className="text-sm font-medium text-white">{t.a}</div>
                <div className="text-xs text-white/50 mt-0.5">{t.r}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
