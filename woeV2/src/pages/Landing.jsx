import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Audiences } from "@/components/Audiences";
import { Programs } from "@/components/Programs";
import { ProvideSplit } from "@/components/ProvideSplit";
import { Leadership } from "@/components/Leadership";
import { Testimonials } from "@/components/Testimonials";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { CallPopup } from "@/components/CallPopup";
import { FloatingCta } from "@/components/FloatingCta";
import { scrollToId } from "@/lib/scroll";

export default function Landing() {
  const location = useLocation();

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
    <main className="bg-cream" data-testid="landing-page">
      <Navbar />
      <Hero />
      <Marquee />
      <Audiences />
      <Programs />
      <ProvideSplit />
      <Leadership />
      <Testimonials />
      <Booking prefill={location.state?.quote} />
      <Footer />
      <CallPopup />
      <FloatingCta />
    </main>
  );
}
