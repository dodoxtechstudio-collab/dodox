import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12+", label: "Industries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "Support" },
];

// Split text into words for word-by-word reveal (5x fewer DOM nodes than character split, zero lag)
function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Parallax is heavy, skip scroll tracking on mobile viewports
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : sectionRef,
    offset: ["start end", "end start"],
  });
  
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 sm:py-32">
      {/* Parallax ambient blob - only scales on desktop */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {isMobile ? (
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[300px] w-[500px] rounded-full blur-3xl bg-[#67e8f9]/[0.04]" />
        ) : (
          <motion.div
            style={{ scale: bgScale }}
            className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[400px] w-[800px] rounded-full blur-3xl bg-[#67e8f9]/[0.05]"
          />
        )}
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-semibold"
        >
          About DodoX
        </motion.p>

        {/* Word-by-word heading */}
        <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.05]">
          <SplitWords
            text="Every business has a problem."
            className="text-platinum"
            delay={0}
          />
          <br className="hidden sm:inline" />
          <SplitWords
            text="We create the solution."
            className="text-silver-glow italic font-light"
            delay={0.2}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 mx-auto max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed font-light"
        >
          We build smart digital systems that save time, reduce manual work, improve workflow
          efficiency, and help businesses scale faster using modern technologies.
        </motion.p>

        {/* Stats grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group glass rounded-2xl px-6 py-8 hairline-border hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden"
              style={{ willChange: "transform" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#67e8f9]/[0.07] to-transparent pointer-events-none" />
              
              {/* Top border lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#67e8f9]/20 to-transparent" />

              <div className="relative text-4xl md:text-5xl font-semibold text-platinum tracking-tight">
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
