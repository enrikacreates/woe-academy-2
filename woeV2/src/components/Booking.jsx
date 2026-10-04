import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Phone, Mail, Instagram, CalendarCheck, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const API = "/api";

const inputCls = "w-full rounded-xl border-2 border-teal/15 bg-cream/60 px-4 py-3 text-sm font-medium text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal transition-colors duration-300";

const INTERESTS = [
  "Booking a program or event",
  "Pricing & program details",
  "Respite care & special needs 1:1",
  "General inquiry / not sure yet",
];

export const Booking = ({ prefill }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", audience: "", interest: "", preferred_date: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefill) {
      setDone(false);
      setForm((f) => ({ ...f, interest: "Pricing & program details", message: `I'd like a quote for: ${prefill}` }));
    }
  }, [prefill]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await axios.post(`${API}/inquiries`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        audience: form.audience,
        interest: form.interest || null,
        preferred_date: form.preferred_date || null,
        message: form.message.trim() || null,
        company_website: e.target.company_website?.value || undefined,
      });
      setDone(true);
      toast.success("Request received — we'll be in touch soon!");
    } catch (err) {
      toast.error(err.response?.data?.detail?.[0]?.msg || "Something went wrong. Please try again or call us.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="book" className="relative py-16 sm:py-24 bg-teal overflow-hidden grain" data-testid="booking-section">
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-sun/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-sky/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-sun" data-testid="booking-eyebrow">Let's Partner</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-tight">
            Schedule a 15-minute conversation
          </h2>
          <p className="mt-5 text-cream/80 text-base sm:text-lg leading-relaxed max-w-lg">
            Tell us who you are and what you're dreaming up — a pop-up play day, a weekly
            community program, in-home sessions or something totally custom. We'll explore
            program options together, no pressure. Just want pricing or details first?
            Choose "General inquiry" — that works too.
          </p>
          <div className="mt-10 space-y-4" data-testid="booking-contact-info">
            <a href="tel:+16617148940" data-testid="booking-phone-link" className="flex items-center gap-3.5 text-cream font-semibold hover:text-sun transition-colors duration-300">
              <span className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center"><Phone className="w-5 h-5" /></span>
              (661) 714-8940
            </a>
            <a href="mailto:connect@worldofexplorers.com" data-testid="booking-email-link" className="flex items-center gap-3.5 text-cream font-semibold hover:text-sun transition-colors duration-300">
              <span className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center"><Mail className="w-5 h-5" /></span>
              connect@worldofexplorers.com
            </a>
            <a href="https://instagram.com/WOEFITANDPLAY" target="_blank" rel="noopener noreferrer" data-testid="booking-instagram-link" className="flex items-center gap-3.5 text-cream font-semibold hover:text-sun transition-colors duration-300">
              <span className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center"><Instagram className="w-5 h-5" /></span>
              @WOEFITANDPLAY
            </a>
          </div>
          <p className="mt-12 font-display font-semibold text-cream/60 text-sm uppercase tracking-[0.2em]">
            Play builds people. People build community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[28px] p-8 sm:p-10 shadow-2xl"
        >
          {done ? (
            <div className="text-center py-12" data-testid="booking-success-message">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.7 }}>
                <CheckCircle2 className="w-16 h-16 text-teal mx-auto" />
              </motion.div>
              <h3 className="mt-6 font-display font-bold text-2xl text-teal">You're on our radar!</h3>
              <p className="mt-3 text-ink/70 text-sm max-w-sm mx-auto leading-relaxed">
                Thanks, {form.name.split(" ")[0]} — your meeting request is saved. We'll reach out shortly to lock in your 15-minute conversation.
              </p>
              <button
                onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", audience: "", interest: "", preferred_date: "", message: "" }); }}
                data-testid="booking-another-btn"
                className="mt-8 text-sm font-bold text-teal underline underline-offset-4 hover:text-tang transition-colors"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5" data-testid="booking-form">
              <div className="flex items-center gap-3 pb-1">
                <CalendarCheck className="w-6 h-6 text-tang" />
                <h3 className="font-display font-semibold text-xl text-teal">{prefill ? "Get Your Quote" : "Request a Meeting"}</h3>
              </div>
              {prefill && (
                <div className="bg-sun/25 border-2 border-sun rounded-2xl px-4 py-3 flex items-start gap-2.5" data-testid="booking-quote-badge">
                  <Sparkles className="w-4 h-4 text-tang shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-teal leading-snug">
                    Getting a quote for: <span className="font-bold">{prefill}</span> — just add your details and hit send.
                  </p>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bk-name" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">Your Name *</label>
                  <input id="bk-name" data-testid="booking-name-input" required value={form.name} onChange={set("name")} placeholder="Jordan Rivera" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="bk-email" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">Email *</label>
                  <input id="bk-email" type="email" data-testid="booking-email-input" required value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bk-phone" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">Phone</label>
                  <input id="bk-phone" type="tel" data-testid="booking-phone-input" value={form.phone} onChange={set("phone")} placeholder="(661) 555-0123" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="bk-audience" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">I am a… *</label>
                  <select id="bk-audience" data-testid="booking-audience-select" required value={form.audience} onChange={set("audience")} className={inputCls}>
                    <option value="" disabled>Choose one</option>
                    <option value="family">Parent / Family</option>
                    <option value="community">Apartment Community / HOA</option>
                    <option value="business">Business (Gym, Church, Café…)</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="bk-interest" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">I'm reaching out about…</label>
                <select id="bk-interest" data-testid="booking-interest-select" value={form.interest} onChange={set("interest")} className={inputCls}>
                  <option value="">Not sure yet / general inquiry</option>
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bk-date" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">Preferred Call Date <span className="normal-case font-medium text-ink/40">(optional — skip if you're just exploring)</span></label>
                <input id="bk-date" type="date" data-testid="booking-date-input" value={form.preferred_date} onChange={set("preferred_date")} className={inputCls} />
              </div>
              <div>
                <label htmlFor="bk-message" className="block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5">What are you dreaming up?</label>
                <textarea id="bk-message" rows={3} data-testid="booking-message-input" value={form.message} onChange={set("message")} placeholder="A monthly family fitness night at our community clubhouse…" className={`${inputCls} resize-none`} />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={busy}
                data-testid="booking-submit-btn"
                className="w-full bg-teal text-cream font-display font-semibold text-base py-4 rounded-full shadow-[0_5px_0_#07352D] hover:shadow-[0_2px_0_#07352D] hover:translate-y-[3px] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
              >
                {busy ? "Sending…" : "Request My 15-Min Call"}
              </motion.button>
              <p className="text-[11px] text-ink/45 text-center">No spam, ever. We reply within 1–2 business days.</p>
              {/* Spam trap: hidden from people, filled in by bots. */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
