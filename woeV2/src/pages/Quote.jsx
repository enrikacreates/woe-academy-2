import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquareText, Phone, CheckCircle2, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { MENU } from "@/data/menu";

const API = "/api";

const inputCls = "w-full rounded-xl border-2 border-teal/15 bg-cream/60 px-4 py-3 text-sm font-medium text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal transition-colors duration-300";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-ink/60 mb-1.5";

const CONTACT_OPTIONS = [
  { value: "email", label: "Email", icon: Mail, testid: "quote-contact-email" },
  { value: "text", label: "Text", icon: MessageSquareText, testid: "quote-contact-text" },
  { value: "call", label: "Call", icon: Phone, testid: "quote-contact-call" },
];

const SELECTS = [
  { key: "group_size", label: "About how many participants?", options: ["1–5", "6–15", "16–30", "30+"], testid: "quote-group-size-select" },
  { key: "ages", label: "Ages of participants", options: ["Toddlers (1–3)", "Kids (4–7)", "Kids (8–12)", "Teens", "Adults", "Seniors", "Mixed ages"], testid: "quote-ages-select" },
  { key: "location_type", label: "Where would it happen?", options: ["My home / backyard", "Community space (clubhouse, courtyard…)", "Park or outdoor space", "Business / venue", "School", "Not sure yet"], testid: "quote-location-select" },
  { key: "frequency", label: "How often?", options: ["One-time event", "Weekly", "Monthly", "Seasonal", "Not sure yet"], testid: "quote-frequency-select" },
  { key: "timeline", label: "When are you hoping to start?", options: ["As soon as possible", "Within a month", "1–3 months", "Just researching"], testid: "quote-timeline-select" },
  { key: "budget", label: "Rough budget (optional)", options: ["Under $200", "$200–$500", "$500–$1,000", "$1,000+", "Not sure yet"], testid: "quote-budget-select" },
];

const CONTACT_LABEL = { email: "by email", text: "by text", call: "with a phone call" };

export default function Quote() {
  const [params] = useSearchParams();
  const programParam = params.get("program") || "";
  const programTitles = MENU.map((c) => c.title);
  const initialProgram = programTitles.includes(programParam) ? programParam : programParam ? "Something custom / not sure yet" : "";

  const [form, setForm] = useState({
    name: "", email: "", phone: "", contact_pref: "", program: initialProgram,
    audience: "", group_size: "", ages: "", location_type: "", frequency: "", timeline: "", budget: "", notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v]));
      Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
      payload.name = form.name.trim();
      payload.email = form.email.trim();
      payload.contact_pref = form.contact_pref;
      payload.program = form.program;
      payload.company_website = e.target.company_website?.value || undefined;
      await axios.post(`${API}/quotes`, payload);
      setDone(true);
      toast.success("Quote request sent — we'll be in touch soon!");
    } catch (err) {
      toast.error(err.response?.data?.detail?.[0]?.msg || "Something went wrong. Please try again or call us.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="bg-cream min-h-screen grain relative" data-testid="quote-page">
      <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-teal/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
          <Link to="/" data-testid="quote-logo-link"><Logo /></Link>
          <Link to="/programs" data-testid="quote-back-link" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-tang transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to menu
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral" data-testid="quote-eyebrow">Quote Questionnaire</span>
          <h1 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-teal tracking-tight leading-tight" data-testid="quote-headline">
            Let's build your quote
          </h1>
          <p className="mt-4 text-ink/70 text-base sm:text-lg leading-relaxed" data-testid="quote-subcopy">
            A few quick questions about what matters most to you — so we can recommend the right
            program and get back to you with real pricing, the way you prefer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 bg-white rounded-[28px] border border-teal/10 shadow-xl p-7 sm:p-10"
        >
          {done ? (
            <div className="text-center py-10" data-testid="quote-success-message">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.7 }}>
                <CheckCircle2 className="w-16 h-16 text-teal mx-auto" />
              </motion.div>
              <h2 className="mt-6 font-display font-bold text-2xl text-teal">Your quote request is in!</h2>
              <p className="mt-3 text-ink/70 text-sm max-w-md mx-auto leading-relaxed">
                Thanks, {form.name.split(" ")[0]} — we'll review your answers and get back to you
                {" "}{CONTACT_LABEL[form.contact_pref] || "soon"} within 1–2 business days.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/programs" data-testid="quote-success-menu-link" className="text-sm font-bold text-teal underline underline-offset-4 hover:text-tang transition-colors">
                  Explore more programs
                </Link>
                <Link to="/" data-testid="quote-success-home-link" className="text-sm font-bold text-teal underline underline-offset-4 hover:text-tang transition-colors">
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8" data-testid="quote-form">
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <ClipboardList className="w-5 h-5 text-tang" />
                  <h2 className="font-display font-semibold text-lg text-teal">About you</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="q-name" className={labelCls}>Your Name *</label>
                    <input id="q-name" data-testid="quote-name-input" required value={form.name} onChange={set("name")} placeholder="Jordan Rivera" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="q-email" className={labelCls}>Email *</label>
                    <input id="q-email" type="email" data-testid="quote-email-input" required value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} />
                  </div>
                </div>
                <div className="mt-5">
                  <span className={labelCls}>How should we reach you with pricing? *</span>
                  <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Preferred contact method">
                    {CONTACT_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setForm((f) => ({ ...f, contact_pref: opt.value }))}
                        data-testid={opt.testid}
                        aria-pressed={form.contact_pref === opt.value}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 rounded-xl border-2 px-3 py-3.5 font-display font-semibold text-sm transition-all duration-200 ${
                          form.contact_pref === opt.value
                            ? "border-teal bg-teal text-cream shadow-md"
                            : "border-teal/15 bg-cream/60 text-teal hover:border-teal/40"
                        }`}
                      >
                        <opt.icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {form.contact_pref && form.contact_pref !== "email" && (
                    <p className="mt-2 text-xs text-ink/50 font-medium" data-testid="quote-phone-hint">We'll need your phone number to {form.contact_pref === "text" ? "text" : "call"} you.</p>
                  )}
                </div>
                <div className="mt-5">
                  <label htmlFor="q-phone" className={labelCls}>Phone {form.contact_pref && form.contact_pref !== "email" ? "*" : "(optional)"}</label>
                  <input id="q-phone" type="tel" data-testid="quote-phone-input" required={form.contact_pref === "text" || form.contact_pref === "call"} value={form.phone} onChange={set("phone")} placeholder="(661) 555-0123" className={inputCls} />
                </div>
              </div>

              <div className="border-t border-teal/10 pt-7">
                <h2 className="font-display font-semibold text-lg text-teal mb-5">The experience</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label htmlFor="q-program" className={labelCls}>Which program caught your eye? *</label>
                    <select id="q-program" data-testid="quote-program-select" required value={form.program} onChange={set("program")} className={inputCls}>
                      <option value="" disabled>Choose one</option>
                      {programTitles.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                      <option value="Something custom / not sure yet">Something custom / not sure yet</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="q-audience" className={labelCls}>This is for…</label>
                    <select id="q-audience" data-testid="quote-audience-select" value={form.audience} onChange={set("audience")} className={inputCls}>
                      <option value="">Choose one (optional)</option>
                      <option value="family">My family / my child</option>
                      <option value="community">Our apartment community / HOA</option>
                      <option value="business">Our business, school or organization</option>
                    </select>
                  </div>
                  {SELECTS.slice(0, 2).map((s) => (
                    <div key={s.key}>
                      <label htmlFor={`q-${s.key}`} className={labelCls}>{s.label}</label>
                      <select id={`q-${s.key}`} data-testid={s.testid} value={form[s.key]} onChange={set(s.key)} className={inputCls}>
                        <option value="">Choose one (optional)</option>
                        {s.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-teal/10 pt-7">
                <h2 className="font-display font-semibold text-lg text-teal mb-5">The logistics</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {SELECTS.slice(2).map((s) => (
                    <div key={s.key}>
                      <label htmlFor={`q-${s.key}`} className={labelCls}>{s.label}</label>
                      <select id={`q-${s.key}`} data-testid={s.testid} value={form[s.key]} onChange={set(s.key)} className={inputCls}>
                        <option value="">Choose one (optional)</option>
                        {s.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <label htmlFor="q-notes" className={labelCls}>What matters most to you? Anything else we should know?</label>
                  <textarea id="q-notes" rows={3} data-testid="quote-notes-input" value={form.notes} onChange={set("notes")} placeholder="E.g. my son thrives with routine and gentle transitions…" className={`${inputCls} resize-none`} />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={busy || !form.contact_pref}
                data-testid="quote-submit-btn"
                className="w-full bg-teal text-cream font-display font-semibold text-base py-4 rounded-full shadow-[0_5px_0_#07352D] hover:shadow-[0_2px_0_#07352D] hover:translate-y-[3px] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
              >
                {busy ? "Sending…" : "Send My Quote Request"}
              </motion.button>
              {!form.contact_pref && (
                <p className="text-[11px] text-coral text-center font-semibold -mt-4" data-testid="quote-contact-required-hint">Pick email, text or call above so we know how to reach you</p>
              )}
              <p className="text-[11px] text-ink/45 text-center">No spam, ever. Your answers go straight to Brayson &amp; Adazjia.</p>
              {/* Spam trap: hidden from people, filled in by bots. */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
