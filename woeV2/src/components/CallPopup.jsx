import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarCheck } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

export const CallPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("woe_popup_seen")) return;
    const t = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("woe_popup_seen", "1");
  };

  const goBook = () => {
    close();
    scrollToId("#book");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-5"
          data-testid="call-popup"
        >
          <div className="absolute inset-0 bg-teal-deep/60 backdrop-blur-sm" onClick={close} data-testid="call-popup-backdrop" />
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative bg-cream rounded-[28px] max-w-md w-full p-8 sm:p-10 shadow-2xl text-center overflow-hidden grain"
          >
            <svg viewBox="0 0 200 200" className="absolute -top-14 -right-14 w-44 h-44 opacity-25 animate-spin-slow pointer-events-none">
              <g stroke="#F2994A" strokeWidth="7" strokeLinecap="round">
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i * 30 * Math.PI) / 180;
                  return <line key={i} x1={100 + 56 * Math.cos(a)} y1={100 + 56 * Math.sin(a)} x2={100 + 80 * Math.cos(a)} y2={100 + 80 * Math.sin(a)} />;
                })}
              </g>
              <circle cx="100" cy="100" r="38" fill="#F5C242" />
            </svg>
            <button
              onClick={close}
              data-testid="call-popup-close"
              aria-label="Close popup"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-teal/10 text-teal flex items-center justify-center hover:bg-teal/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 rounded-full bg-sun mx-auto flex items-center justify-center shadow-lg">
              <CalendarCheck className="w-8 h-8 text-teal-deep" />
            </div>
            <h3 className="mt-6 font-display font-bold text-2xl sm:text-3xl text-teal" data-testid="call-popup-title">
              Want to talk it through?
            </h3>
            <p className="mt-3 text-ink/70 text-sm sm:text-base leading-relaxed">
              Schedule a free 15-minute call — no pressure, just possibilities. We'll help you
              find the right program for your family, community or business.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={goBook}
              data-testid="call-popup-cta"
              className="mt-7 w-full bg-teal text-cream font-display font-semibold text-base py-4 rounded-full shadow-[0_5px_0_#07352D] hover:shadow-[0_2px_0_#07352D] hover:translate-y-[3px] transition-all duration-200"
            >
              Schedule My Call
            </motion.button>
            <button
              onClick={close}
              data-testid="call-popup-later"
              className="mt-4 text-xs font-bold text-ink/50 hover:text-teal transition-colors underline underline-offset-4"
            >
              Maybe later — keep exploring
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
