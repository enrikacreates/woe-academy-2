export const SunMark = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <g stroke="#F5C242" strokeWidth="5" strokeLinecap="round" fill="none">
      <path d="M16 34a16 16 0 0 1 32 0" />
      <line x1="32" y1="6" x2="32" y2="14" />
      <line x1="12" y1="14" x2="18" y2="20" />
      <line x1="52" y1="14" x2="46" y2="20" />
      <line x1="6" y1="32" x2="14" y2="32" />
      <line x1="58" y1="32" x2="50" y2="32" />
    </g>
  </svg>
);

const LETTERS = [
  { ch: "E", c: "#0E5E50" },
  { ch: "x", c: "#F2994A" },
  { ch: "p", c: "#7CC4E8" },
  { ch: "l", c: "#9DBE8C" },
  { ch: "o", c: "#0E5E50" },
  { ch: "r", c: "#F26B4F" },
  { ch: "e", c: "#F5C242" },
  { ch: "r", c: "#0E5E50" },
  { ch: "s", c: "#0E5E50" },
];

export const Logo = ({ dark = false }) => (
  <div className="flex items-center gap-2.5" data-testid="brand-logo">
    <SunMark className="w-9 h-9 animate-spin-slow" />
    <div className="leading-none">
      <span className={`block font-display font-semibold text-[11px] tracking-[0.22em] uppercase ${dark ? "text-cream/80" : "text-teal/80"}`}>
        World of
      </span>
      <span className="font-display font-bold text-xl tracking-tight">
        {LETTERS.map((l, i) => (
          <span key={i} style={{ color: l.c }}>{l.ch}</span>
        ))}
      </span>
    </div>
  </div>
);
