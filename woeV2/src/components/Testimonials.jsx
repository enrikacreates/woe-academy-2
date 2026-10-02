import { motion } from "framer-motion";
import { Quote, HeartHandshake, ArrowRight } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const BUBBLES_PHOTO = "https://customer-assets-v7afamib.emergentagent.net/job_explorers-booking/artifacts/y3to7gea_8583dc6e4d77c1723dc39b8b7657aa676b64c731-500x666.webp";

const QUOTES = [
  {
    quote: "Brixton loves Mr. Brayson and is never bored!",
    name: "Ali",
    tag: "1:1 Client",
    tint: "bg-sun/20 border-sun",
    chipCls: "bg-tang text-cream",
    testid: "testimonial-ali",
  },
  {
    quote: "The care World of Explorers brings my daughter is one of a kind.",
    name: "Jennifer",
    tag: "Respite Care Client",
    tint: "bg-sky/20 border-sky",
    chipCls: "bg-teal text-cream",
    testid: "testimonial-jennifer",
  },
];

export const Testimonials = () => (
  <section id="testimonials" className="relative py-16 sm:py-20 bg-white/60" data-testid="testimonials-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral" data-testid="testimonials-eyebrow">What Families Are Saying</span>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-teal tracking-tight" data-testid="testimonials-headline">
          Early families. Real love.
        </h2>
        <p className="mt-4 text-ink/70 text-base sm:text-lg">
          Words from our very first client families — including our specialized 1:1 and respite care work.
        </p>
      </motion.div>

      <div className="mt-14 grid lg:grid-cols-[1fr_0.75fr_1fr] gap-6 items-stretch">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, rotate: i === 0 ? -0.5 : 0.5 }}
            className={`rounded-[26px] border-2 ${q.tint} p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300 ${i === 1 ? "lg:order-3" : ""}`}
            data-testid={q.testid}
          >
            <Quote className="w-9 h-9 text-tang rotate-180" />
            <blockquote className="mt-5 font-display font-semibold text-2xl text-teal leading-snug flex-1">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <span className="font-bold text-ink text-sm">— {q.name}</span>
              <span className={`text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 ${q.chipCls}`}>{q.tag}</span>
            </figcaption>
          </motion.figure>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[26px] overflow-hidden border-[6px] border-white shadow-xl rotate-1 lg:order-2 min-h-[340px]"
          data-testid="testimonials-photo"
        >
          <img src={BUBBLES_PHOTO} alt="Brayson playing bubbles with children during an in-home session" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 bg-cream/90 backdrop-blur-sm text-teal font-display font-semibold text-xs px-3.5 py-2 rounded-xl rotate-[-2deg] shadow">
            In-home 1:1 session in action
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 rounded-[26px] bg-teal p-8 sm:p-9 flex flex-col sm:flex-row sm:items-center gap-6 justify-between shadow-lg"
        data-testid="respite-callout"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sun flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6 text-teal-deep" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-cream" data-testid="respite-callout-title">
              Specialized 1:1 &amp; respite care is a core offering — not an add-on.
            </h3>
            <p className="mt-1.5 text-cream/75 text-sm leading-relaxed max-w-xl">
              Led by a Master's-level special educator, our respite and inclusive sessions sit right alongside
              our community and family fitness programs.
            </p>
          </div>
        </div>
        <button
          onClick={() => scrollToId("#book")}
          data-testid="respite-cta-btn"
          className="shrink-0 inline-flex items-center gap-2 bg-sun text-teal-deep font-display font-semibold text-sm px-6 py-3.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.25)] hover:shadow-[0_2px_0_rgba(0,0,0,0.25)] hover:translate-y-[2px] transition-all duration-200"
        >
          Ask About Respite Care <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  </section>
);
