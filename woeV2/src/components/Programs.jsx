import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MenuPreview } from "./MenuPreview";

const CARDS = [
  {
    id: "community",
    title: "On-Site Community Programs",
    desc: "Pop-up play days, obstacle courses, sports & fitness clubs, resident events and family fitness nights — brought straight to your community.",
    img: "https://images.unsplash.com/photo-1763639700458-38a0fd25335d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHxfHxraWRzJTIwb2JzdGFjbGUlMjBjb3Vyc2UlMjBmdW58ZW58MHx8fHwxNzkwNjQwNDg1fDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-4",
    tall: true,
    chips: ["Pop-Up Play Days", "Sports Clubs", "Family Fitness Nights"],
  },
  {
    id: "inhome",
    title: "Private In-Home Sessions",
    desc: "Personalized 1:1 & small-group sessions — movement fundamentals, learning through play, special needs support and respite care.",
    img: "https://images.unsplash.com/photo-1758598737547-666bce663667?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA8Mzl8MHwxfHNlYXJjaHwzfHxtb3RoZXIlMjBjaGlsZCUyMHBsYXlpbmclMjB3b29kZW4lMjBibG9ja3N8ZW58MHx8fHwxNzkwNjQxOTY4fDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-2",
    chips: ["1:1 & Small Group", "Special Needs & Respite"],
  },
  {
    id: "school",
    title: "School & Youth Programs",
    desc: "After-school programs, recess enrichment, PE support and sports clinics that energize school days.",
    img: "https://images.unsplash.com/photo-1630139026564-4a2bf5670879?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxraWRzJTIwcGxheWluZyUyMHBsYXlncm91bmQlMjByZWNlc3MlMjBvdXRkb29yfGVufDB8fHwxNzkwNjQwNDg1fDA&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-2",
    chips: ["After-School", "Recess & PE"],
  },
  {
    id: "adult",
    title: "Adult Wellness & Dance",
    desc: "High-energy group classes — Zumba, hip-hop, strength and stretching — plus mindfulness for all fitness levels.",
    img: "https://images.unsplash.com/photo-1758798458123-7b4fbcc92c1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxncm91cCUyMGRhbmNlJTIwZml0bmVzcyUyMGNsYXNzJTIwb3V0ZG9vcnxlbnwwfHx8MTc5MDY0MDQ4NXww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-2",
    chips: ["Zumba & Hip-Hop", "All Levels"],
  },
  {
    id: "events",
    title: "Special Events & Partnerships",
    desc: "Corporate family days, seasonal & holiday events, studio collaborations and custom themed experiences.",
    img: "https://images.unsplash.com/photo-1680562152683-2327331f4763?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBidWJibGVzJTIwb3V0ZG9vcnxlbnwwfHx8MTc5MDY0MDQ5MHww&ixlib=rb-4.1.0&q=85",
    span: "md:col-span-2",
    chips: ["Holiday Events", "Custom Themes"],
  },
];

export const Programs = () => (
  <section id="programs" className="relative py-16 sm:py-20 bg-white/60" data-testid="programs-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral" data-testid="programs-eyebrow">Our Offerings</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-teal tracking-tight">
            Turnkey movement experiences for all ages
          </h2>
        </div>
        <p className="text-ink/60 text-sm font-semibold uppercase tracking-widest">Flexible · Seasonal · Customizable</p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-5">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className={`group relative ${c.span} rounded-[26px] overflow-hidden bg-teal shadow-md hover:shadow-2xl transition-shadow duration-300 ${c.tall ? "min-h-[380px]" : "min-h-[340px]"}`}
            data-testid={`program-card-${c.id}`}
          >
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/95 via-teal-deep/45 to-teal-deep/5" />
            <div className="relative h-full flex flex-col justify-end p-7">
              <div className="flex flex-wrap gap-2 mb-3">
                {c.chips.map((chip) => (
                  <span key={chip} className="text-[11px] font-bold uppercase tracking-wider text-teal-deep bg-sun rounded-full px-3 py-1">{chip}</span>
                ))}
              </div>
              <h3 className="font-display font-semibold text-2xl text-cream">{c.title}</h3>
              <p className="mt-2 text-sm text-cream/85 leading-relaxed max-w-md">{c.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 relative overflow-hidden rounded-[26px] bg-teal p-8 sm:p-10 flex flex-col md:flex-row md:items-center gap-7 justify-between shadow-lg"
        data-testid="all-programs-banner"
      >
        <svg viewBox="0 0 200 200" className="absolute -top-16 -right-16 w-56 h-56 opacity-20 animate-spin-slow pointer-events-none">
          <g stroke="#F5C242" strokeWidth="7" strokeLinecap="round">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return <line key={i} x1={100 + 58 * Math.cos(a)} y1={100 + 58 * Math.sin(a)} x2={100 + 84 * Math.cos(a)} y2={100 + 84 * Math.sin(a)} />;
            })}
          </g>
          <circle cx="100" cy="100" r="40" fill="#F5C242" />
        </svg>
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-sun" data-testid="all-programs-eyebrow">And That's Not All</span>
          <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-cream">It's not just kids.</h3>
          <p className="mt-3 text-cream/80 text-sm sm:text-base max-w-2xl leading-relaxed">
            Adult wellness &amp; dance, parent + baby stroller fitness, senior active-adult programs, learning
            adventures &amp; field trips, special needs 1:1 &amp; respite care, birthday parties and corporate
            family experiences — the full menu is twelve categories deep.
          </p>
        </div>
        <Link
          to="/programs"
          data-testid="explore-programs-btn"
          className="relative shrink-0 inline-flex items-center gap-2 bg-sun text-teal-deep font-display font-semibold px-7 py-4 rounded-full shadow-[0_5px_0_rgba(0,0,0,0.25)] hover:shadow-[0_2px_0_rgba(0,0,0,0.25)] hover:translate-y-[3px] transition-all duration-200"
        >
          Explore Additional Programs <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      <MenuPreview />
    </div>
  </section>
);
