import { Linkedin, Mail } from "lucide-react";
import dodoxLogo from "@/assets/dodox-logo.png";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const cols = [
  { h: "Studio", links: [{ label: "About", href: "#about" }, { label: "Services", href: "#services" }, { label: "Projects", href: "#projects" }, { label: "Process", href: "#process" }] },
  { h: "Solutions", links: [{ label: "AI Automation", href: "#services" }, { label: "ERPNext", href: "#services" }, { label: "Mobile Apps", href: "#services" }, { label: "Full Stack Development", href: "#services" }] },
  { h: "Company", links: [{ label: "Careers", href: "/careers" }, { label: "Contact", href: "#contact" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
];

const socials = [
  { Icon: Linkedin, href: "https://www.linkedin.com/in/dodox-tech-692a55411/?isSelfProfile=true", label: "LinkedIn" },
  { Icon: WhatsAppIcon, href: "https://wa.me/917548872118", label: "WhatsApp" },
  { Icon: Mail, href: "mailto:dodoxtechstudio@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-[#030712] to-[#010204]">
      {/* Sleek top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67e8f9]/20 to-transparent" />
      
      <div className="mx-auto max-w-5xl px-6 py-20 text-center space-y-16">
        
        {/* Top: Centered Logo, Intro copy and Social links */}
        <div className="flex flex-col items-center space-y-6 max-w-xl mx-auto">
          <a href="#home" className="flex items-center gap-1 group">
            <img
              src={dodoxLogo}
              alt="DodoX Tech Logo"
              className="h-14 w-14 object-contain drop-shadow-[0_0_8px_rgba(103,232,249,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(103,232,249,0.7)] transition-all duration-300"
            />
            <span className="text-lg font-bold text-white tracking-wide">
              DodoX <span className="text-[var(--cyan-soft)]">Tech</span>
            </span>
          </a>
          <p className="text-sm text-white/50 leading-relaxed font-light">
            We design and engineer luxurious, cinematic digital environments for ambitious businesses worldwide — automated, scalable, beautiful.
          </p>
          
          {/* Social Icons row */}
          <div className="flex gap-3 pt-2 justify-center">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#67e8f9]/30 hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
              >
                <Icon className="h-4 w-4 text-white/50 group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Middle: Grid of Columns (Desktop: 3 equal columns, mobile: stacked) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-4 max-w-3xl mx-auto">
          {cols.map((c) => (
            <div key={c.h} className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold">{c.h}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-block text-sm text-white/50 hover:text-[var(--cyan-soft)] hover:translate-y-[-1px] transition-all duration-300 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#67e8f9]/50 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/35 font-light">
            <p>© {new Date().getFullYear()} DodoX Tech. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Coimbatore, TN, India</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Crafted with Love by Our Team.</span>
            </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
