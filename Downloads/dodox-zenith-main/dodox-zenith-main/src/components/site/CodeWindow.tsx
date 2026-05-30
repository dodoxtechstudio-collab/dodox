import { useEffect, useState } from "react";

const LINES: { text: string; tokens: Array<{ t: string; c?: string }> }[] = [
  { text: "", tokens: [{ t: "// dodox.tech — automation engine", c: "muted" }] },
  { text: "", tokens: [{ t: "import", c: "kw" }, { t: " { " }, { t: "Workflow", c: "type" }, { t: " } " }, { t: "from", c: "kw" }, { t: " " }, { t: "'@dodox/core'", c: "str" }, { t: ";" }] },
  { text: "", tokens: [] },
  { text: "", tokens: [{ t: "const", c: "kw" }, { t: " " }, { t: "growth", c: "var" }, { t: " = " }, { t: "async", c: "kw" }, { t: " () => {" }] },
  { text: "", tokens: [{ t: "  await", c: "kw" }, { t: " " }, { t: "Workflow", c: "type" }, { t: "." }, { t: "deploy", c: "fn" }, { t: "({" }] },
  { text: "", tokens: [{ t: "    erp", c: "var" }, { t: ": " }, { t: "'erpnext'", c: "str" }, { t: "," }] },
  { text: "", tokens: [{ t: "    ai", c: "var" }, { t: ": " }, { t: "true", c: "bool" }, { t: ", " }, { t: "ocr", c: "var" }, { t: ": " }, { t: "true", c: "bool" }, { t: "," }] },
  { text: "", tokens: [{ t: "    uptime", c: "var" }, { t: ": " }, { t: "99.99", c: "num" }, { t: "," }] },
  { text: "", tokens: [{ t: "  });" }] },
  { text: "", tokens: [{ t: "  return", c: "kw" }, { t: " " }, { t: "'🚀 launched'", c: "str" }, { t: ";" }] },
  { text: "", tokens: [{ t: "};" }] },
];

const colorMap: Record<string, string> = {
  kw: "text-[#c084fc]",
  type: "text-[#67e8f9]",
  fn: "text-[#fcd34d]",
  str: "text-[#86efac]",
  num: "text-[#fdba74]",
  bool: "text-[#fb7185]",
  var: "text-[#e5e7eb]",
  muted: "text-white/40 italic",
};

export function CodeWindow() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  // total chars per line
  const lineLen = (i: number) => LINES[i].tokens.reduce((s, tk) => s + tk.t.length, 0);

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      const reset = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, 2200);
      return () => clearTimeout(reset);
    }
    const len = lineLen(lineIdx);
    if (charIdx < len) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28 + Math.random() * 35);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 180);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const renderLine = (i: number) => {
    const full = i < lineIdx;
    const active = i === lineIdx;
    if (!full && !active) return <span className="text-white/20">&nbsp;</span>;
    let remaining = active ? charIdx : Infinity;
    return (
      <>
        {LINES[i].tokens.map((tk, j) => {
          if (remaining <= 0) return null;
          const slice = tk.t.slice(0, remaining);
          remaining -= tk.t.length;
          return (
            <span key={j} className={tk.c ? colorMap[tk.c] : "text-white/80"}>
              {slice}
            </span>
          );
        })}
        {active && <span className="inline-block w-[7px] h-[14px] bg-[var(--cyan-soft)] ml-0.5 align-middle animate-pulse" />}
      </>
    );
  };

  return (
    <div className="relative h-full w-full bg-[#0a0f1e] font-mono text-[12px] sm:text-[13px] leading-[1.7]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/40 tracking-wide">~/dodox/automation.ts</span>
      </div>
      {/* Code body */}
      <div className="flex p-4 sm:p-5 h-[calc(100%-40px)] overflow-hidden">
        <div className="pr-4 text-white/25 select-none text-right">
          {LINES.map((_, i) => (
            <div key={i}>{String(i + 1).padStart(2, "0")}</div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          {LINES.map((_, i) => (
            <div key={i} className="whitespace-pre">
              {renderLine(i)}
            </div>
          ))}
        </div>
      </div>
      {/* Scanline glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--cyan-soft)]/[0.04] via-transparent to-[var(--cyan-soft)]/[0.04]" />
    </div>
  );
}
