import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Phone, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { MENU } from "@/data/menu";
import { scrollToId } from "@/lib/scroll";

export default function ProgramsMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = location.hash.replace("#", "");
  const goBook = () => navigate("/#book");
  const goQuote = (program) => navigate(`/quote?program=${encodeURIComponent(program)}`);

  useEffect(() => {
    const t = setTimeout(() => {
      if (location.hash && document.querySelector(location.hash)) {
        scrollToId(location.hash);
      } else if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 120);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main className="bg-cream min-h-screen grain relative" data-testid="programs-menu-page">
      <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <Link to="/" data-testid="menu-logo-link"><Logo /></Link>
          <div className="flex items-center gap-3">
            <Link to="/" data-testid="menu-back-link" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-tang transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <button
              onClick={() => goBook()}
              data-testid="menu-book-btn"
              className="bg-teal text-cream font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-[0_4px_0_#07352D] hover:shadow-[0_2px_0_#07352D] hover:translate-y-[2px] transition-all duration-200"
            >
              Book a Call
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-coral rotate-[-1deg]" data-testid="menu-eyebrow">
            Programs &amp; Experiences Menu
          </span>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-teal tracking-tight leading-[1.02]" data-testid="menu-headline">
            Not just kids. <span className="text-tang">Every age.</span> Every space. Every crowd.
          </h1>
          <p className="mt-5 text-ink/70 text-base sm:text-lg leading-relaxed" data-testid="menu-subcopy">
            You give us the people and the space — we bring the experience. From toddler sensory play to
            senior chair fitness, learning adventures &amp; field trips to respite care, birthday parties to
            corporate family days. All ages. All abilities. Always welcome.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white border-2 border-dashed border-teal/30 rounded-2xl px-5 py-3 rotate-[0.5deg]" data-testid="menu-custom-badge">
            <Sparkles className="w-4 h-4 text-tang" />
            <span className="font-display font-semibold text-teal text-sm">Custom programs always available — just ask!</span>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-32 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {MENU.map((cat, i) => (
          <motion.article
            key={cat.id}
            id={cat.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className={`rounded-[24px] border-2 ${cat.tint} ${cat.wide ? "sm:col-span-2 xl:col-span-3" : ""} p-7 flex flex-col transition-all duration-300 ${activeId === cat.id ? "ring-4 ring-sun shadow-xl scale-[1.01]" : "shadow-sm hover:shadow-lg"}`}
            data-testid={`menu-card-${cat.id}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl ${cat.chip} flex items-center justify-center shrink-0`}>
                <cat.icon style={{ width: 22, height: 22 }} />
              </div>
              <h2 className="font-display font-semibold text-lg text-teal leading-tight">{cat.title}</h2>
              {cat.wide && (
                <span className="ml-auto hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.16em] bg-teal text-cream rounded-full px-3 py-1 rotate-1">
                  Learning Made Fun
                </span>
              )}
            </div>
            <p className="mt-3 text-xs text-ink/60 font-medium leading-relaxed">{cat.sub}</p>
            <div className={`mt-4 flex-1 ${cat.wide ? "grid sm:grid-cols-3 gap-5" : "space-y-3.5"}`}>
              {cat.groups.map((g) => (
                <div key={g.label}>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal/70">{g.label}</span>
                  <p className="mt-1 text-[13px] text-ink/75 leading-relaxed">{g.items.join("  ·  ")}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => goQuote(cat.title)}
              data-testid={`menu-quote-${cat.id}`}
              className="mt-5 inline-flex items-center gap-1.5 font-display font-semibold text-sm text-teal hover:text-tang transition-colors duration-300 group self-start"
            >
              Get a quote for this
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.article>
        ))}
      </section>

      <Footer />

      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 inset-x-4 z-50 max-w-3xl mx-auto"
        data-testid="menu-sticky-cta"
      >
        <div className="bg-teal rounded-full pl-6 pr-2.5 py-2.5 flex items-center justify-between gap-3 shadow-2xl border border-cream/15">
          <span className="font-display font-semibold text-cream text-sm sm:text-base truncate">Ready to build a healthier, happier community?</span>
          <div className="flex items-center gap-2 shrink-0">
            <a href="tel:+16617148940" data-testid="menu-sticky-phone" className="hidden sm:flex w-10 h-10 rounded-full bg-cream/10 items-center justify-center text-cream hover:bg-cream/20 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => goBook()}
              data-testid="menu-sticky-book-btn"
              className="bg-sun text-teal-deep font-display font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cream transition-colors duration-300"
            >
              Book a 15-Min Call
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
