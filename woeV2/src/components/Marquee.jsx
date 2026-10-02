const ITEMS = ["Active Kids", "Strong Families", "Thriving Communities", "Play", "Move", "Grow", "Together", "Brighter Futures"];

const Sun = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="#F5C242" strokeWidth="2.4" strokeLinecap="round">
    <circle cx="12" cy="14" r="4.5" fill="#F5C242" stroke="none" />
    <line x1="12" y1="3" x2="12" y2="6" />
    <line x1="4.5" y1="7" x2="6.5" y2="9" />
    <line x1="19.5" y1="7" x2="17.5" y2="9" />
    <line x1="2.5" y1="14" x2="5.5" y2="14" />
    <line x1="21.5" y1="14" x2="18.5" y2="14" />
  </svg>
);

export const Marquee = () => (
  <div className="bg-teal py-4 overflow-hidden border-y-4 border-sun/60" data-testid="editorial-marquee">
    <div className="flex w-max animate-marquee">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
          {ITEMS.map((t, i) => (
            <span key={`${dup}-${i}`} className="flex items-center gap-6 px-6 font-display font-semibold text-cream text-lg tracking-wide whitespace-nowrap uppercase">
              {t} <Sun />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
