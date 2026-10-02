import { Phone, Mail, Instagram } from "lucide-react";
import { Logo } from "./Logo";

const LOGO_URL = "https://customer-assets-lqy194kg.emergentagent.net/job_d72b5367-efb0-4d0c-ab92-d2be5e8a91f9/artifacts/yq5rqf7v_5F4670BC-33AF-4732-9CA1-12202B602DC4.png";

export const Footer = () => (
  <footer className="bg-teal-deep text-cream relative overflow-hidden" data-testid="site-footer">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-[1.2fr_1fr_1fr] gap-12 items-start">
      <div>
        <div className="w-[240px] rounded-2xl overflow-hidden bg-black">
          <img src={LOGO_URL} alt="World of Explorers — Fitness & Play logo" className="w-full mix-blend-screen" data-testid="footer-logo-image" />
        </div>
        <p className="mt-6 text-cream/70 text-sm leading-relaxed max-w-xs">
          Active kids. Strong families. Thriving communities. Mobile fitness &amp; play
          programs serving California communities.
        </p>
      </div>
      <div>
        <h4 className="font-display font-semibold text-sun uppercase tracking-widest text-sm">Let's Connect</h4>
        <div className="mt-5 space-y-3.5 text-sm">
          <a href="tel:+16617148940" data-testid="footer-phone-link" className="flex items-center gap-2.5 text-cream/85 hover:text-sun transition-colors"><Phone className="w-4 h-4" /> (661) 714-8940</a>
          <a href="mailto:connect@worldofexplorers.com" data-testid="footer-email-link" className="flex items-center gap-2.5 text-cream/85 hover:text-sun transition-colors"><Mail className="w-4 h-4" /> connect@worldofexplorers.com</a>
          <a href="https://instagram.com/WOEFITANDPLAY" target="_blank" rel="noopener noreferrer" data-testid="footer-instagram-link" className="flex items-center gap-2.5 text-cream/85 hover:text-sun transition-colors"><Instagram className="w-4 h-4" /> @WOEFITANDPLAY</a>
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold text-sun uppercase tracking-widest text-sm">Our Promise</h4>
        <ul className="mt-5 space-y-2.5 text-sm text-cream/85">
          <li>Healthy Kids</li>
          <li>Confident Kids</li>
          <li>Kinder Kids</li>
          <li>Brighter Futures</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
        <span data-testid="footer-copyright">© {new Date().getFullYear()} World of Explorers — Fitness &amp; Play. The adventure just begins.</span>
        <div className="flex items-center gap-5">
          <Logo dark />
        </div>
      </div>
    </div>
  </footer>
);
