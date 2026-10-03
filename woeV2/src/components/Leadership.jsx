import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, HeartHandshake, GraduationCap, Dumbbell } from "lucide-react";

const FAMILY_PORTRAIT = "https://customer-assets-v7afamib.emergentagent.net/job_explorers-booking/artifacts/25u4qy8t_IMG_3587.JPG";
const ACTION_TABLE = "https://customer-assets-v7afamib.emergentagent.net/job_explorers-booking/artifacts/m67qwtqv_cbea3438c4c0d18fe4479178b7d56dbdbed25d9e-1447x1930.webp";

const FOUNDERS = [
  {
    icon: GraduationCap,
    name: "Brayson Wikler",
    role: "Co-Founder · Education & Program Design",
    copy: "Bray holds a Bachelor's in Early Childhood Education and a Master's in Special Education, ensuring every program is developmentally appropriate, fully inclusive, and structurally sound.",
    testid: "founder-brayson",
  },
  {
    icon: Dumbbell,
    name: "Adazjia Wikler",
    role: "Co-Founder · Business & Fitness",
    copy: "Adazjia brings a strong foundation in business and fitness, combining operational structure with dynamic movement design.",
    testid: "founder-adazjia",
  },
];

const STANDARDS = [
  { icon: ShieldCheck, label: "Fully CPR & First Aid Certified", testid: "standard-cpr" },
  { icon: BadgeCheck, label: "Rigorous Background Checked", testid: "standard-background" },
  { icon: HeartHandshake, label: "Completed our rigorous, internally developed child safety program", testid: "standard-safety-program" },
];

export const Leadership = () => (
  <section id="leadership" className="relative py-16 sm:py-20 overflow-hidden" data-testid="leadership-section">
    <div className="absolute top-24 -left-24 w-[300px] h-[300px] rounded-full bg-sun/15 blur-3xl pointer-events-none" />
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[440px]"
          data-testid="leadership-collage"
        >
          <div className="rounded-t-[220px] rounded-b-[28px] overflow-hidden border-[6px] border-white shadow-2xl rotate-[-1.5deg]">
            <img src={FAMILY_PORTRAIT} alt="Brayson and Adazjia Wikler with their daughter Norai" className="w-full h-[520px] object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-10 -right-6 sm:-right-10 w-[180px] rounded-[22px] overflow-hidden border-[5px] border-white shadow-xl"
          >
            <img src={ACTION_TABLE} alt="Brayson leading a hands-on learning activity with children" className="w-full h-[230px] object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.7, delay: 0.4 }}
            className="absolute top-8 -left-4 sm:-left-8 bg-sun text-teal-deep font-display font-semibold text-sm px-4 py-2.5 rounded-2xl rotate-[-7deg] shadow-lg animate-floaty"
          >
            Family-Owned &amp; Operated
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.7, delay: 0.55 }}
            className="absolute bottom-[24%] -left-4 sm:-left-8 bg-teal text-cream font-display font-semibold text-xs px-4 py-2.5 rounded-2xl rotate-[-4deg] shadow-lg animate-floaty"
            style={{ animationDelay: "1.4s" }}
          >
            M.Ed. Special Education
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral" data-testid="leadership-eyebrow">Our Leadership &amp; Standards</span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-teal tracking-tight leading-[1.05]" data-testid="leadership-headline">
            Rooted in Education.<br />Driven by <span className="text-tang">Passion.</span>
          </h2>
          <p className="mt-5 text-ink/70 text-base sm:text-lg leading-relaxed" data-testid="leadership-intro">
            We started World of Explorers to create more opportunities for kids, families and communities
            to move, play and connect — because we believe stronger communities start with healthy, happy people.
          </p>

          <div className="mt-9 space-y-6">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="flex gap-4" data-testid={f.testid}>
                <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center shrink-0 shadow-md">
                  <f.icon className="w-6 h-6 text-sun" />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2.5">
                    <h3 className="font-display font-semibold text-xl text-teal">{f.name}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/50">{f.role}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink/75 leading-relaxed">{f.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-display font-semibold text-teal/80 text-sm" data-testid="leadership-signature">
            — Brayson &amp; Adazjia Wikler, and our daughter Norai, our Chief Play-Tester
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 rounded-[28px] bg-teal p-8 sm:p-10 shadow-lg"
        data-testid="standards-callout"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="lg:max-w-[260px] shrink-0">
            <h3 className="font-display font-bold text-2xl text-sun" data-testid="standards-title">Safety &amp; Certifications</h3>
            <p className="mt-2 text-cream/75 text-sm leading-relaxed">Every session. Every coach. No exceptions.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 flex-1">
            {STANDARDS.map((s) => (
              <div key={s.label} className="flex items-center gap-3.5 bg-cream/10 rounded-2xl px-5 py-4" data-testid={s.testid}>
                <div className="w-11 h-11 rounded-full bg-sun flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-teal-deep" />
                </div>
                <span className="text-sm font-semibold text-cream leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
