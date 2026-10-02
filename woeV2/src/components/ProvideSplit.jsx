import { motion } from "framer-motion";
import { Users, Cone, ClipboardList, PartyPopper, MapPin, Megaphone, Heart, Star, Leaf, TrendingUp } from "lucide-react";

const WE = [
  { icon: Users, label: "Experienced Coaches" },
  { icon: Cone, label: "Equipment & Setup" },
  { icon: ClipboardList, label: "Program Planning" },
  { icon: PartyPopper, label: "Full Execution" },
];

const YOU = [
  { icon: MapPin, label: "A Space — courtyard, lawn, clubhouse" },
  { icon: Megaphone, label: "Promotion to your people (we supply flyers)" },
];

const RESULTS = [
  { icon: Heart, label: "Happier, More Connected Residents" },
  { icon: TrendingUp, label: "Higher Satisfaction & Retention" },
  { icon: Star, label: "An Amenity That Sets You Apart" },
  { icon: Leaf, label: "A Healthier, More Vibrant Community" },
];

const panelAnim = (delay) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export const ProvideSplit = () => (
  <section id="how-it-works" className="relative py-16 sm:py-20" data-testid="how-it-works-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <motion.div {...panelAnim(0)} className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral" data-testid="how-eyebrow">How It Works</span>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-teal tracking-tight">
          We bring everything. You bring the space.
        </h2>
      </motion.div>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <motion.div {...panelAnim(0.1)} className="rounded-[28px] bg-teal p-9 sm:p-11 shadow-lg" data-testid="we-provide-panel">
          <h3 className="font-display font-bold text-2xl text-sun tracking-tight">We Provide</h3>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {WE.map((w) => (
              <div key={w.label} className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-cream/10 flex items-center justify-center">
                  <w.icon className="w-6 h-6 text-sun" />
                </div>
                <span className="font-semibold text-cream text-sm leading-snug">{w.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...panelAnim(0.2)} className="rounded-[28px] bg-sun/30 border-2 border-sun p-9 sm:p-11 shadow-sm" data-testid="you-provide-panel">
          <h3 className="font-display font-bold text-2xl text-teal tracking-tight">You Provide</h3>
          <div className="mt-8 space-y-6">
            {YOU.map((y) => (
              <div key={y.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                  <y.icon className="w-6 h-6 text-tang" />
                </div>
                <span className="font-semibold text-ink/80 text-sm leading-snug">{y.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-9 text-sm font-semibold text-teal bg-white/70 rounded-2xl px-5 py-4">
            That's it. No added workload for your team — we handle the rest.
          </p>
        </motion.div>
      </div>

      <motion.div {...panelAnim(0.15)} className="mt-6 rounded-[28px] bg-white border border-teal/10 p-9 sm:p-11 shadow-sm" data-testid="results-strip">
        <span className="font-display font-semibold text-lg text-coral">The result?</span>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {RESULTS.map((r) => (
            <div key={r.label} className="flex items-center gap-3.5" data-testid={`result-${r.label.slice(0, 12).toLowerCase().replace(/[^a-z]/g, "-")}`}>
              <div className="w-11 h-11 rounded-full bg-sage/30 flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-teal" />
              </div>
              <span className="text-sm font-semibold text-ink/80 leading-snug">{r.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
