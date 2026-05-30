import { motion } from "framer-motion";
import { Linkedin, Mail, Send, ArrowUpRight, MapPin, CheckCircle2, User, Briefcase, Coins, MessageSquare, Loader2 } from "lucide-react";
import { useState } from "react";
import { sendContactEmail } from "@/lib/mail";

// WhatsApp custom icon
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

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      budget: formData.get("budget") as string,
      details: formData.get("details") as string,
    };

    try {
      const response = await sendContactEmail({ data });
      if (response && response.success) {
        setSent(true);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background ambient radial sphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] sm:w-[900px] rounded-full blur-3xl bg-[#67e8f9]/[0.03]" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        
        {/* Top Header - Completely Centered Column Layout */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--cyan-soft)] mb-3 font-bold">
              Get In Touch
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-tight text-platinum leading-[1.08]">
              Let's build something
              <br />
              <span className="italic font-light text-silver-glow">amazing together.</span>
            </h2>
            
            {/* Premium Trust Badges Centered */}
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <a
                href="https://wa.me/917548872118?text=Hi%20DodoX%20Tech!%20I%20would%20like%20a%20free%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[9px] text-[#25D366] tracking-wider uppercase font-bold hover:bg-[#25D366]/20 hover:border-[#25D366]/50 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <CheckCircle2 className="h-3 w-3" />
                Free Consultation
              </a>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[9px] text-white/80 tracking-wider uppercase font-bold">
                <CheckCircle2 className="h-3 w-3 text-[var(--cyan-soft)]" />
                Response within 24hrs
              </span>
            </div>

            <p className="mt-6 text-white/50 leading-relaxed text-sm sm:text-base max-w-xl">
              Tell us about your business goals. We'll analyze your request and reply within 24 hours with a custom integration plan.
            </p>
          </motion.div>
        </div>

        {/* Column 2 - Direct Contact Cards Row (Desktop: 4 Columns, Mobile: 2 Columns / Stacked) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          {/* Card 1 - Email */}
          <motion.a
            href="mailto:dodoxtechstudio@gmail.com"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group flex flex-col justify-between p-5 rounded-2xl glass hover:bg-white/[0.03] transition duration-300 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300">
              <ArrowUpRight className="h-4 w-4 text-[var(--cyan-soft)]" />
            </div>
            <div className="h-9 w-9 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/60 mb-5">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/35 font-extrabold mb-1">Email Us</div>
              <div className="text-xs font-semibold text-white/80 group-hover:text-white transition duration-300 break-all">
                dodoxtechstudio@gmail.com
              </div>
            </div>
          </motion.a>

          {/* Card 2 - WhatsApp */}
          <motion.a
            href="https://wa.me/917548872118"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="group flex flex-col justify-between p-5 rounded-2xl glass hover:bg-white/[0.03] transition duration-300 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300">
              <ArrowUpRight className="h-4 w-4 text-[var(--cyan-soft)]" />
            </div>
            <div className="h-9 w-9 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/60 mb-5 group-hover:text-[var(--cyan-soft)] transition duration-300">
              <WhatsAppIcon className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/35 font-extrabold mb-1">WhatsApp</div>
              <div className="text-sm font-semibold text-white/80 group-hover:text-white transition duration-300">
                Chat with us
              </div>
            </div>
          </motion.a>

          {/* Card 3 - LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/dodox-tech-692a55411/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.19 }}
            className="group flex flex-col justify-between p-5 rounded-2xl glass hover:bg-white/[0.03] transition duration-300 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300">
              <ArrowUpRight className="h-4 w-4 text-[var(--cyan-soft)]" />
            </div>
            <div className="h-9 w-9 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/60 mb-5">
              <Linkedin className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/35 font-extrabold mb-1">LinkedIn</div>
              <div className="text-sm font-semibold text-white/80 group-hover:text-white transition duration-300">
                DodoX Tech
              </div>
            </div>
          </motion.a>

          {/* Card 4 - Location */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="group flex flex-col justify-between p-5 rounded-2xl glass border border-white/5 relative overflow-hidden cursor-default"
          >
            <div className="h-9 w-9 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/60 mb-5">
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/35 font-extrabold mb-1">Location</div>
              <div className="text-xs font-semibold text-white/80 leading-snug">
                Coimbatore, Tamil Nadu
              </div>
            </div>
          </motion.div>

        </div>

        {/* Column 3 - Center Centered Premium Form Card */}
        <div className="max-w-3xl mx-auto w-full">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden w-full"
          >
            {/* Form header glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#67e8f9]/20 to-transparent" />
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Name" placeholder="Your full name" icon={User} />
              <Field name="email" label="Email" type="email" placeholder="you@company.com" icon={Mail} />
              <Field name="company" label="Company" placeholder="Where you work" icon={Briefcase} />
              <Field name="budget" label="Budget" placeholder="e.g. $10k – $50k" icon={Coins} />
            </div>
            
            <div className="mt-4 relative">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-white/45 mb-2 font-bold">
                Project Details
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-white/35">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <textarea
                  name="details"
                  required
                  rows={4}
                  placeholder="Tell us what you want to build or automate..."
                  className="w-full rounded-xl bg-white/[0.01] border border-white/5 focus:border-[#67e8f9]/20 focus:ring-1 focus:ring-[#67e8f9]/10 outline-none pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 transition duration-300"
                />
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mt-4 text-xs text-red-400 text-center font-medium bg-red-950/20 border border-red-900/30 rounded-lg py-2">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading || sent}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full silver-gradient text-[#030712] px-8 py-3.5 text-sm font-bold ambient-halo hover:-translate-y-0.5 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    Sending... <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </>
                ) : sent ? (
                  "Sent Successfully ✓"
                ) : (
                  <>
                    Send Message <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>

      </div>
    </section>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon: React.ComponentType<{ className?: string }>;
}

function Field({ name, label, type = "text", placeholder, icon: Icon }: FieldProps) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-white/45 mb-2 font-bold">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/35">
          <Icon className="h-4 w-4" />
        </div>
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className="w-full rounded-xl bg-white/[0.01] border border-white/5 focus:border-[#67e8f9]/20 focus:ring-1 focus:ring-[#67e8f9]/10 outline-none pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 transition duration-300"
        />
      </div>
    </div>
  );
}
