import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Discover", desc: "Deep dive into your operations, pain points and goals." },
  { n: "02", title: "Design", desc: "Cinematic UI, IA and workflows mapped to outcomes." },
  { n: "03", title: "Develop", desc: "Production-grade code with rigorous QA." },
  { n: "04", title: "Deploy", desc: "Zero-downtime release, monitored end-to-end." },
  { n: "05", title: "Scale", desc: "Iterate, optimize and grow with you." },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Only subscribe to scroll events on desktop where the line indicator is visible
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : containerRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5 font-semibold">
            Process
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-platinum leading-[1.05]">
            From idea to impact —
            <br />
            <span className="italic font-light text-silver-glow">in five elegant steps.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Scroll-driven progress line */}
          {!isMobile && (
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06] hidden md:block -translate-x-1/2">
              <motion.div
                style={{ scaleY: lineScaleY, originY: 0 }}
                className="absolute inset-0 bg-gradient-to-b from-[#67e8f9]/60 via-white/30 to-transparent"
              />
            </div>
          )}

          <div className="space-y-12 md:space-y-24">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Left / right label */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="md:text-right md:pr-12"
                >
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--cyan-soft)]/80">
                    Step {s.n}
                  </div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-platinum">{s.title}</h3>
                </motion.div>

                {/* Right / left description */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 16 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="md:pl-12 mt-4 md:mt-0"
                >
                  <p className="text-white/60 leading-relaxed max-w-md text-sm md:text-base">{s.desc}</p>
                </motion.div>

                {/* Timeline dot with pulse ring */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="relative"
                  >
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-[#67e8f9]/20 animate-pulse-soft" />
                    <div className="relative h-3 w-3 rounded-full bg-white/95 ambient-halo" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
