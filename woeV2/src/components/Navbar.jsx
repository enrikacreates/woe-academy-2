import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  { label: "Who We Serve", href: "#audiences", testid: "nav-link-audiences" },
  { label: "Programs", href: "#programs", testid: "nav-link-programs" },
  { label: "How It Works", href: "#how-it-works", testid: "nav-link-how" },
  { label: "Our Story", href: "#leadership", testid: "nav-link-story" },
];

export const Navbar = () => (
  <motion.header
    initial={{ y: -80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    className="fixed top-0 inset-x-0 z-50 bg-cream/85 backdrop-blur-md border-b border-teal/10"
    data-testid="main-nav"
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between gap-4">
      <button onClick={() => scrollToId("#top")} className="shrink-0" data-testid="nav-logo-btn">
        <Logo />
      </button>
      <nav className="hidden md:flex items-center gap-6">
        {LINKS.map((l) => (
          <button
            key={l.href}
            data-testid={l.testid}
            onClick={() => scrollToId(l.href)}
            className="text-sm font-semibold text-ink/70 hover:text-teal transition-colors duration-300"
          >
            {l.label}
          </button>
        ))}
        <Link
          to="/programs"
          data-testid="nav-link-menu"
          className="text-sm font-semibold text-tang hover:text-coral transition-colors duration-300"
        >
          Full Menu
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <a
          href="tel:+16617148940"
          data-testid="nav-phone-link"
          className="hidden lg:flex items-center gap-2 text-sm font-bold text-teal hover:text-teal-dark transition-colors"
        >
          <Phone className="w-4 h-4" /> (661) 714-8940
        </a>
        <motion.button
          whileHover={{ scale: 1.04, rotate: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToId("#book")}
          data-testid="nav-book-btn"
          className="bg-teal text-cream font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-[0_4px_0_#07352D] hover:shadow-[0_2px_0_#07352D] hover:translate-y-[2px] transition-all duration-200"
        >
          Book a Call
        </motion.button>
      </div>
    </div>
  </motion.header>
);
