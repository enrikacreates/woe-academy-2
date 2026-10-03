import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const HERO_IMG_1 = "https://images.unsplash.com/photo-1606092195808-3107b7ed4c98?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHxfHxraWRzJTIwcGFyYWNodXRlJTIwZ2FtZSUyMHBsYXklMjBvdXRkb29yfGVufDB8fHx8MTc5MDY0MDQ4MHww&ixlib=rb-4.1.0&q=85";
const HERO_IMG_2 = "https://images.unsplash.com/photo-1593893513213-0ecc2ea282c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY6NzN8MHwxfHNlYXJjaHwyfHx0b2RkbGVyJTIwb3V0ZG9vciUyMHBsYXklMjBmdW58ZW58MHx8fHwxNzkwNjQwNDg1fDA&ixlib=rb-4.1.0&q=85";

const lineAnim = (delay) => ({
  initial: { y: "115%" },
  animate: { y: "0%" },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

export const Hero = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sunX = useTransform(mx, (v) => v * 34);
  const sunY = useTransform(my, (v) => v * 22);
  const imgX = useTransform(mx, (v) => v * -18);
  const imgY = useTransform(my, (v) => v * -12);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative min-h-[92vh] flex items-center overflow-hidden grain pt-24 pb-14"
      data-testid="hero-section"
    >
      <motion.div style={{ x: sunX, y: sunY }} className="absolute -top-28 -right-28 w-[260px] h-[260px] opacity-50 sm:opacity-90 sm:-top-24 sm:-right-24 sm:w-[420px] sm:h-[420px] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
          <g stroke="#F5C242" strokeWidth="6" strokeLinecap="round">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return (
                <line key={i} x1={100 + 62 * Math.cos(a)} y1={100 + 62 * Math.sin(a)} x2={100 + 88 * Math.cos(a)} y2={100 + 88 * Math.sin(a)} />
              );
            })}
          </g>
          <circle cx="100" cy="100" r="44" fill="#F5C242" />
        </svg>
      </motion.div>
      <div className="absolute bottom-[-180px] left-[-160px] w-[460px] h-[460px] rounded-full bg-sage/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-[42%] w-[220px] h-[220px] rounded-full bg-sky/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="inline-flex items-center gap-2 bg-white border border-teal/15 rounded-full px-4 py-1.5 shadow-sm mb-7"
            data-testid="hero-badge"
          >
            <Sparkles className="w-4 h-4 text-tang" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal">World of Explorers — Fitness &amp; Play</span>
          </motion.div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-teal" data-testid="hero-headline">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" {...lineAnim(0.45)}>SMALL STEPS.</motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" {...lineAnim(0.6)}>
                <span className="text-tang">BIG</span> <span className="relative inline-block">ADVENTURES.
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    viewBox="0 0 320 14"
                    className="absolute -bottom-1 left-0 w-full"
                  >
                    <motion.path
                      d="M4 10 C 80 2, 240 2, 316 8"
                      stroke="#F5C242"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 1.5, ease: "easeOut" }}
                    />
                  </motion.svg>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-6 text-base sm:text-lg text-ink/70 max-w-xl leading-relaxed"
            data-testid="hero-subcopy"
          >
            We bring turnkey movement, learning and play experiences for every age — kids, adults
            and seniors — to families, schools, apartment communities and local businesses.
            Coaches, equipment and setup included. A healthier, happier generation through play,
            movement and exploration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToId("#book")}
              data-testid="hero-book-btn"
              className="group inline-flex items-center gap-2 bg-teal text-cream font-display font-semibold text-base px-7 py-4 rounded-full shadow-[0_6px_0_#07352D] hover:shadow-[0_3px_0_#07352D] hover:translate-y-[3px] transition-all duration-200"
            >
              Book a 15-Min Call
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToId("#programs")}
              data-testid="hero-explore-btn"
              className="inline-flex items-center gap-2 bg-white text-teal border-2 border-teal/20 font-display font-semibold text-base px-7 py-4 rounded-full hover:border-teal/50 transition-colors duration-300"
            >
              Explore Programs
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-10 flex flex-wrap gap-2.5"
            data-testid="hero-trust-chips"
          >
            {["Certified Coaches", "Equipment Included", "All Ages & Abilities Welcome"].map((t) => (
              <span key={t} className="text-xs font-bold text-teal bg-teal/5 border border-teal/15 rounded-full px-3.5 py-1.5">{t}</span>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ x: imgX, y: imgY }} className="relative hidden lg:block h-[560px]" data-testid="hero-collage">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-2 top-0 w-[320px] h-[420px] rounded-t-[170px] rounded-b-[28px] overflow-hidden border-[6px] border-white shadow-2xl"
          >
            <img src={HERO_IMG_1} alt="Children and families playing with a giant colorful parachute on the lawn" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 bottom-2 w-[250px] h-[320px] rounded-[28px] overflow-hidden border-[6px] border-white shadow-2xl"
          >
            <img src={HERO_IMG_2} alt="Joyful toddler laughing during outdoor playful movement" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.3, type: "spring" }}
            className="absolute top-6 left-6 bg-sun text-teal font-display font-semibold text-sm px-4 py-2.5 rounded-2xl rotate-[-7deg] shadow-lg animate-floaty"
          >
            Active Kids
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.45, type: "spring" }}
            className="absolute bottom-16 right-4 bg-sky text-teal-deep font-display font-semibold text-sm px-4 py-2.5 rounded-2xl rotate-[5deg] shadow-lg animate-floaty"
            style={{ animationDelay: "1.2s" }}
          >
            Strong Families
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.6, type: "spring" }}
            className="absolute bottom-[150px] right-[40%] bg-coral text-cream font-display font-semibold text-sm px-4 py-2.5 rounded-2xl rotate-[-3deg] shadow-lg animate-floaty"
            style={{ animationDelay: "2s" }}
          >
            Thriving Communities
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
