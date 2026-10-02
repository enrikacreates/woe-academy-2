import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { MENU } from "@/data/menu";

export const MenuPreview = () => {
  const [open, setOpen] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8"
      data-testid="menu-preview"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display font-bold text-2xl text-teal" data-testid="menu-preview-title">
          Browse the full menu — right here
        </h3>
        <span className="text-xs font-bold uppercase tracking-widest text-ink/50">{MENU.length} categories · tap to peek inside</span>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-3 items-start">
        {MENU.map((cat) => {
          const isOpen = open === cat.id;
          return (
            <div
              key={cat.id}
              className={`rounded-2xl border-2 overflow-hidden bg-white transition-colors duration-300 ${isOpen ? "border-teal/40 shadow-md" : "border-teal/10"}`}
              data-testid={`preview-item-${cat.id}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : cat.id)}
                data-testid={`preview-toggle-${cat.id}`}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 px-5 py-3 text-left group"
              >
                <span className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-xl ${cat.chip} flex items-center justify-center shrink-0`}>
                    <cat.icon style={{ width: 18, height: 18 }} />
                  </span>
                  <span className="font-display font-semibold text-teal text-[15px] leading-tight">{cat.title}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-teal/60 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 space-y-3 border-t border-teal/10">
                      {cat.groups.map((g) => (
                        <div key={g.label}>
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/50">{g.label}</span>
                          <p className="mt-0.5 text-[13px] text-ink/75 leading-relaxed">{g.items.join("  ·  ")}</p>
                        </div>
                      ))}
                      <Link
                        to={`/programs#${cat.id}`}
                        data-testid={`preview-more-${cat.id}`}
                        className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-tang hover:text-coral transition-colors pt-1"
                      >
                        Full details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
