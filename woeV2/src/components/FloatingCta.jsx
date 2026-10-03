import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

export const FloatingCta = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const booking = document.querySelector("#book");
      const nearBooking = booking && booking.getBoundingClientRect().top < window.innerHeight * 0.6;
      setShow(window.scrollY > 650 && !nearBooking);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollToId("#book")}
          data-testid="floating-book-btn"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-sun text-teal-deep font-display font-semibold text-sm px-6 py-3.5 rounded-full shadow-[0_6px_20px_rgba(7,53,45,0.35)] border-2 border-teal-deep/10"
        >
          <CalendarCheck className="w-4 h-4" />
          Book a Call
        </motion.button>
      )}
    </AnimatePresence>
  );
};
