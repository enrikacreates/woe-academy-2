import { motion } from "framer-motion";
import { Heart, Building2, Store, ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const AUDIENCES = [
  {
    id: "families",
    icon: Heart,
    color: "bg-sun/25 border-sun",
    iconColor: "text-tang",
    title: "Families & Parents",
    tag: "Family / Parent Bookings",
    points: ["Private in-home sessions & small groups", "Special needs 1:1, respite care & inclusive play", "Learning adventures & field trips that make learning fun", "Movement, sports fundamentals, dance & rhythm", "Silent music parties & youth gatherings"],
  },
  {
    id: "communities",
    icon: Building2,
    color: "bg-sky/25 border-sky",
    iconColor: "text-teal",
    title: "Apartment Communities & HOAs",
    tag: "Community Play & Fit",
    points: ["Weekly kids sports & movement", "Monthly family fitness nights", "Quarterly seasonal community events", "A unique amenity — zero added workload"],
  },
  {
    id: "businesses",
    icon: Store,
    color: "bg-sage/30 border-sage",
    iconColor: "text-teal",
    title: "Businesses & Pop-Ups",
    tag: "Gyms, Churches, Cafés & More",
    points: ["Pop-up play days that draw families", "Corporate family days & holiday events", "Studio & gym collaborations", "Custom themed experiences"],
  },
];

export const Audiences = () => (
  <section id="audiences" className="relative py-16 sm:py-20" data-testid="audiences-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral" data-testid="audiences-eyebrow">Who We Serve</span>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-teal tracking-tight">
          Three simple ways to bring Play &amp; Fit to your world
        </h2>
        <p className="mt-4 text-ink/70 text-base sm:text-lg">
          One call is all it takes. Pick your path — we handle the coaches, equipment, planning and full execution.
        </p>
      </motion.div>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {AUDIENCES.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -0.6 : 0.6 }}
            className={`rounded-[28px] border-2 ${a.color} p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300`}
            data-testid={`audience-card-${a.id}`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <a.icon className={`w-7 h-7 ${a.iconColor}`} />
            </div>
            <span className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">{a.tag}</span>
            <h3 className="mt-1.5 font-display font-semibold text-2xl text-teal">{a.title}</h3>
            <ul className="mt-5 space-y-2.5 flex-1">
              {a.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink/75">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-teal shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollToId("#book")}
              data-testid={`audience-cta-${a.id}`}
              className="mt-7 inline-flex items-center gap-1.5 font-display font-semibold text-teal hover:text-tang transition-colors duration-300 group"
            >
              Set up a meeting
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
