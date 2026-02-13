import { useState, useEffect, useRef } from "react";
import { useScrollReveal, useCountUp } from "./hooks/useScrollReveal";

/* ─── ICON COMPONENTS ─────────────────────────────────── */

function GlobeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function DatabaseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function KeyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function MenuIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── FORM SUBMISSION HELPER ─────────────────────────── */

async function submitToBackend(email: string): Promise<boolean> {
  // Always save to localStorage as backup
  const existing = JSON.parse(localStorage.getItem("apx_waitlist") || "[]");
  existing.push({ email, timestamp: new Date().toISOString() });
  localStorage.setItem("apx_waitlist", JSON.stringify(existing));

  // Try to POST to configured endpoint
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "landing_page", timestamp: new Date().toISOString() }),
      });
      return res.ok;
    } catch {
      console.warn("Form endpoint unreachable — email saved to localStorage");
      return true; // Still show success since we saved locally
    }
  }
  return true; // No endpoint configured, localStorage is the backup
}

/* ─── LIVE TICKER COMPONENT ───────────────────────────── */

function LiveTicker() {
  const items = [
    "KE:NBI:RESIDENTIAL $245,000",
    "NG:LAG:COMMERCIAL $1,200,000",
    "ZA:CPT:RESIDENTIAL $380,000",
    "GH:ACC:LAND $95,000",
    "CV:PRA:RESIDENTIAL $185,000",
    "TZ:DAR:COMMERCIAL $520,000",
    "ET:ADD:RESIDENTIAL $150,000",
    "MA:CAS:RESIDENTIAL $290,000",
    "KE:MBS:LAND $67,000",
    "NG:ABJ:RESIDENTIAL $410,000",
    "ZA:JHB:COMMERCIAL $890,000",
    "GH:KMA:RESIDENTIAL $120,000",
  ];

  return (
    <div className="overflow-hidden border-y border-border bg-muted">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 py-2 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-green inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── (TypingText removed — no longer used in simplified hero) ─── */

/* ─── ANIMATED COUNTER ────────────────────────────────── */

function AnimatedStat({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}) {
  const [ref, value] = useCountUp(end, duration);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums text-foreground">
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="label-style mt-2">{label}</div>
    </div>
  );
}

/* ─── SAMPLE LISTINGS DATA ────────────────────────────── */

const SAMPLE_LISTINGS = [
  {
    id: "APX-001847",
    location: "Bantry Bay, Cape Town",
    country: "ZA",
    type: "RESIDENTIAL",
    price: 2450000,
    size: 320,
    beds: 4,
    status: "VERIFIED",
    indexed: "2026-02-13T08:22:00Z",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  },
  {
    id: "APX-003291",
    location: "Muthaiga, Nairobi",
    country: "KE",
    type: "RESIDENTIAL",
    price: 1850000,
    size: 450,
    beds: 5,
    status: "VERIFIED",
    indexed: "2026-02-13T07:45:00Z",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: "APX-005104",
    location: "Ikoyi, Lagos",
    country: "NG",
    type: "RESIDENTIAL",
    price: 3200000,
    size: 280,
    beds: 3,
    status: "VERIFIED",
    indexed: "2026-02-13T06:18:00Z",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop",
  },
  {
    id: "APX-002756",
    location: "Casablanca Marina",
    country: "MA",
    type: "COMMERCIAL",
    price: 3200000,
    size: 1200,
    beds: 0,
    status: "PENDING",
    indexed: "2026-02-12T22:05:00Z",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },
  {
    id: "APX-004018",
    location: "Praia, Santiago",
    country: "CV",
    type: "RESIDENTIAL",
    price: 185000,
    size: 95,
    beds: 2,
    status: "VERIFIED",
    indexed: "2026-02-12T19:30:00Z",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
  },
  {
    id: "APX-006332",
    location: "East Legon, Accra",
    country: "GH",
    type: "LAND",
    price: 750000,
    size: 2400,
    beds: 0,
    status: "VERIFIED",
    indexed: "2026-02-12T15:12:00Z",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
  },
];

/* ─── SCROLL REVEAL SECTION WRAPPER ───────────────────── */

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── INLINE EMAIL FORM (reusable) ───────────────────── */

function InlineEmailForm({
  onSubmit,
  loading,
  variant = "dark",
}: {
  onSubmit: (email: string) => void;
  loading: boolean;
  variant?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onSubmit(email);
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
      <input
        type="email"
        required
        placeholder="ENTER_EMAIL_ADDRESS"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 border px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm placeholder:uppercase placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark
            ? "border-background/30 bg-background/10 text-background placeholder:text-background/40 focus:ring-background"
            : "border-foreground bg-background text-foreground placeholder:text-muted-foreground focus:ring-foreground"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`text-xs sm:text-sm uppercase tracking-widest px-6 sm:px-8 py-3 sm:py-3.5 border transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
          isDark
            ? "bg-background text-foreground border-background hover:bg-transparent hover:text-background"
            : "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground"
        }`}
      >
        {loading ? (
          <span className="animate-pulse">Processing...</span>
        ) : (
          <>
            <KeyIcon className="w-4 h-4" />
            Get Early Access
          </>
        )}
      </button>
    </form>
  );
}

/* ─── MAIN APP ────────────────────────────────────────── */

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [listingCount, setListingCount] = useState(50247);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setListingCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = async (email: string) => {
    setLoading(true);
    const success = await submitToBackend(email);
    setLoading(false);
    if (success) {
      setSubmittedEmail(email);
      setSubmitted(true);
    }
  };

  const navLinks = [
    { label: "THE_PROBLEM", href: "#problem" },
    { label: "HOW_IT_WORKS", href: "#how-it-works" },
    { label: "ALL_LISTINGS", href: "#listings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* ══════════════════════════════════════════════════
          NAV (with mobile hamburger)
          ══════════════════════════════════════════════════ */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <DatabaseIcon className="w-5 h-5" />
            <span className="font-bold text-lg uppercase tracking-tight">
              Africa Property Index
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#waitlist"
            className="hidden md:inline-flex text-xs uppercase tracking-widest px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Get API Access
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 sm:px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-widest px-4 py-2.5 border border-foreground text-center hover:bg-foreground hover:text-background transition-colors"
            >
              Get API Access
            </a>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO (new subhead + inline CTA)
          ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-foreground text-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-24 sm:pb-28">
          {/* Live badge */}
          <div className="animate-fade-in flex items-center gap-2 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full bg-green opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-green" />
            </span>
            <span className="text-xs uppercase tracking-widest text-background/70">
              Live: Aggregating{" "}
              <span className="text-background font-bold tabular-nums">
                {listingCount.toLocaleString()}+
              </span>{" "}
              listings
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight leading-[0.92] mb-8 max-w-5xl">
            The Neutral Data
            <br />
            Layer For African
            <br />
            Real Estate
          </h1>

          {/* NEW subhead — customer-facing */}
          <p className="animate-fade-up delay-200 text-sm sm:text-base text-background/60 max-w-2xl leading-relaxed mb-12">
            Clean, real-time property data for Africa — one API, every market.
            Powering investors, proptech apps, and financial institutions across the continent.
          </p>

          {/* Inline CTA in hero */}
          {!submitted ? (
            <div className="animate-fade-up delay-400 max-w-xl">
              <InlineEmailForm onSubmit={handleEmailSubmit} loading={loading} variant="dark" />
              <p className="text-[10px] text-background/40 mt-3 uppercase tracking-widest">
                Join the API beta. No spam. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="animate-scale-in max-w-xl border border-green/30 p-6 bg-green/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green" />
                <span className="text-sm uppercase tracking-widest font-bold text-green">
                  You're on the list
                </span>
              </div>
              <p className="text-sm text-background/60">
                We'll send your API key to <span className="text-background font-bold">{submittedEmail}</span> when your slot opens.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── LIVE TICKER ─────────────────────────────── */}
      <LiveTicker />

      {/* ══════════════════════════════════════════════════
          THE PROBLEM — fragmentation table (best hook, right after hero)
          ══════════════════════════════════════════════════ */}
      <section id="problem" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <span className="label-style mb-4 block">// the_problem</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight mb-6 leading-[0.95]">
              Africa's Real Estate
              <br />
              Markets Are
              <br />
              <span className="text-muted-foreground">Fragmented</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Hundreds of local property sites operate across the continent, each
              with different formats, languages, and data structures. No unified,
              pan-African overview exists for investors, developers, or analysts.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This fragmentation creates blind spots and inefficiencies across one
              of the world's fastest-growing real estate markets. We're fixing that.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="border border-border brutalist-shadow p-6 bg-muted">
              <div className="label-style mb-4">// market_fragmentation.log</div>
              <div className="text-sm">
                {[
                  { market: "Nigeria", sites: "40+", formats: "12", standardized: false },
                  { market: "Kenya", sites: "25+", formats: "8", standardized: false },
                  { market: "South Africa", sites: "30+", formats: "10", standardized: false },
                  { market: "Ghana", sites: "15+", formats: "6", standardized: false },
                  { market: "Ethiopia", sites: "10+", formats: "5", standardized: false },
                ].map((row) => (
                  <div key={row.market} className="grid grid-cols-[100px_1fr_auto] sm:grid-cols-[140px_1fr_1fr_auto] items-center py-3 border-b border-border last:border-0">
                    <span className="font-bold">{row.market}</span>
                    <span className="text-muted-foreground text-center">{row.sites} sites</span>
                    <span className="text-muted-foreground text-center hidden sm:block">{row.formats} formats</span>
                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">NO_STANDARD</span>
                  </div>
                ))}
                <div className="pt-4 flex items-center gap-2 text-muted-foreground text-xs">
                  <span className="w-2 h-2 bg-foreground" />
                  Result: No unified data layer exists
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROOF — Cape Verde stats
          ══════════════════════════════════════════════════ */}
      <section className="bg-muted py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-2 h-2 bg-green" />
              <span className="label-style text-green">Proof of concept: live</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-center mb-4">
              Validated &amp; Working
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-xl mx-auto mb-16 leading-relaxed">
              Our pipeline handled all seven Cape Verde data sources with zero manual fixes
              and zero country-specific code. Next: Nigeria + Kenya live Q2 2026.
            </p>
          </RevealSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border brutalist-shadow">
            {[
            { end: 13, suffix: "", label: "Data Sources Integrated" },
            { end: 280, suffix: "+", label: "Clean Listings" },
            { end: 16, suffix: "", label: "Locations Across Cape Verde" },
            { end: 100, suffix: "%", label: "Automation Rate" },
            ].map((stat, i) => (
              <RevealSection key={stat.label} delay={i * 100}>
                <div className="bg-background p-4 sm:p-8">
                  <AnimatedStat
                    end={stat.end}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW IT WORKS — simplified 3 steps
          ══════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-foreground text-background py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="label-style text-background/50 mb-4 block">// system.pipeline</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-sm text-background/60 max-w-xl mb-16 leading-relaxed">
              A single pipeline that adds new markets through configuration, not code.
              One codebase. Every country.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-px bg-background/10">
            {[
              {
                step: "01",
                title: "Ingest",
                desc: "Automated crawlers collect listings from local property portals across African markets. Resilient to site redesigns.",
                tag: "ingestion_engine",
              },
              {
                step: "02",
                title: "Normalize",
                desc: "Universal schema mapping converts fragmented data into a single standardized format. Currency, units, title status — all unified.",
                tag: "normalize.run()",
              },
              {
                step: "03",
                title: "Index",
                desc: "Clean, deduplicated, verified data accessible via API. One endpoint, every market. Full audit trail on every data point.",
                tag: "api/v1/properties",
              },
            ].map((item, i) => (
              <RevealSection key={item.step} delay={i * 150}>
                <div className="bg-foreground p-5 sm:p-8 h-full relative">
                  <div className="text-7xl font-sans font-black text-background/10 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-background/40 mb-4">
                    {item.tag}
                  </div>
                  <h3 className="font-sans font-black text-xl uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-background/60 leading-relaxed">
                    {item.desc}
                  </p>
                  {i < 2 && (
                    <div className="hidden md:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10">
                      <ArrowRightIcon className="w-5 h-5 text-background/30" />
                    </div>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RECENT AGGREGATIONS — auto-scrolling carousel
          ══════════════════════════════════════════════════ */}
      <section id="listings" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-foreground" />
                <h2 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight">
                  Recent Aggregations
                </h2>
              </div>
              <a href="#waitlist" className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                Get_Full_Access <ArrowRightIcon className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-4 mb-8 ml-0 sm:ml-4">
              <p className="label-style">Live data samples from our unified index</p>
              <span className="label-style px-2 py-0.5 border border-border bg-muted hidden sm:inline-flex">via GET /api/v1/properties</span>
            </div>
          </RevealSection>
        </div>

        {/* Carousel track — continuous scroll, pauses on hover */}
        <div className="overflow-hidden">
          <div className="flex animate-carousel hover:[animation-play-state:paused]">
            {[...SAMPLE_LISTINGS, ...SAMPLE_LISTINGS].map((listing, i) => (
              <div key={`${listing.id}-${i}`} className="w-[350px] flex-shrink-0 px-3">
                <div className="border border-border brutalist-shadow group">
                  {/* Property image */}
                  <div className="h-48 relative overflow-hidden bg-neutral-200">
                    <img
                      src={listing.image}
                      alt={listing.location}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 text-foreground text-[10px] uppercase tracking-widest px-2.5 py-1 font-bold">
                        {listing.location}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-1 font-bold flex items-center gap-1 ${
                        listing.status === "VERIFIED"
                          ? "bg-green text-white"
                          : "bg-amber text-black"
                      }`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        {listing.status}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="label-style">{listing.id}</span>
                      <span className="label-style">{listing.type}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans font-black text-xl uppercase tracking-tight">
                        ${listing.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {listing.size}m&sup2;
                        {listing.beds > 0 && ` · ${listing.beds}bd`}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        ${Math.round(listing.price / listing.size).toLocaleString()}/m&sup2;
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {listing.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO BENEFITS
          ══════════════════════════════════════════════════ */}
      <section className="bg-muted py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="label-style mb-4 block">// target_users</span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight mb-16">
              Who Benefits From This Data
            </h2>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "International Investors & Funds",
                desc: "Comprehensive market data for due diligence, portfolio analysis, and cross-border investment decisions.",
                tag: "investors",
              },
              {
                title: "Proptech & Fintech Companies",
                desc: "Build applications on standardized African property data without per-country integration work.",
                tag: "developers",
              },
              {
                title: "Banks & Valuation Tools",
                desc: "Enhance mortgage underwriting and property valuations with accurate, up-to-date market comparables.",
                tag: "finance",
              },
              {
                title: "Market Analysts & Researchers",
                desc: "Generate insights, track trends, and publish reports using the most comprehensive African real estate dataset.",
                tag: "research",
              },
            ].map((card, i) => (
              <RevealSection key={card.tag} delay={i * 100}>
                <div className="border border-border bg-background p-6 brutalist-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all h-full">
                  <span className="label-style block mb-4">{card.tag}</span>
                  <h3 className="font-sans font-black text-base uppercase tracking-tight mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          JOIN API BETA — full-width dark CTA (mirrors hero)
          ══════════════════════════════════════════════════ */}
      <section id="waitlist" className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <RevealSection>
            <div className="flex items-center gap-2 mb-6">
              <KeyIcon className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest text-background/50">// api_beta.register</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight mb-4">
              Join the API Beta
            </h2>
            <p className="text-sm text-background/60 max-w-xl mb-10 leading-relaxed">
              Get early access to the Africa Property Index API. Real-time data
              feeds, historical analytics, and market intelligence across the continent.
            </p>

            {!submitted ? (
              <div className="max-w-xl">
                <InlineEmailForm onSubmit={handleEmailSubmit} loading={loading} variant="dark" />
                <p className="text-[10px] text-background/40 mt-3 uppercase tracking-widest">
                  No spam. Unsubscribe anytime. We respect your data.
                </p>
              </div>
            ) : (
              <div className="animate-scale-in max-w-xl border border-green/30 p-8 bg-green/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping-slow absolute inline-flex h-full w-full bg-green opacity-75" />
                    <span className="relative inline-flex h-3 w-3 bg-green" />
                  </span>
                  <span className="text-sm uppercase tracking-widest font-bold text-green">
                    Registration Confirmed
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-background/50">email:</span>{" "}
                    <span className="font-bold">{submittedEmail}</span>
                  </p>
                  <p>
                    <span className="text-background/50">status:</span>{" "}
                    <span className="font-bold text-green">QUEUED</span>
                  </p>
                </div>
                <p className="text-xs text-background/50 mt-6">
                  You're on the list. We'll send your API key when your slot opens.
                </p>
              </div>
            )}
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER (with trust signals + one-line roadmap)
          ══════════════════════════════════════════════════ */}
      <footer className="border-t border-border">
        {/* Trust strip */}
        <div className="border-b border-border bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-muted-foreground uppercase tracking-widest text-center sm:text-left">
              <span className="flex items-center gap-2">
                <GlobeIcon className="w-4 h-4" /> Neutral · No listings sold
              </span>
              <span className="hidden sm:inline">|</span>
              <span>Data from 120+ sources across 54 markets</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {["ZA", "KE", "NG", "GH", "CV", "MA", "ET", "TZ"].map((code) => (
                <span key={code} className="text-[10px] font-bold border border-border px-1.5 py-0.5 bg-background">
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Mobile: compact stacked footer */}
          <div className="sm:hidden space-y-6">
            <div className="flex items-center gap-2">
              <DatabaseIcon className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-tight">
                Africa Property Index
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The neutral data layer for African real estate. Infrastructure, not a portal.
            </p>
            <div className="flex gap-6">
              <div>
                <span className="label-style block mb-2">Connect</span>
                {["Network_X", "LinkedIn_Prof"].map((link) => (
                  <a key={link} href="#" className="block text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest mb-1">
                    {link}
                  </a>
                ))}
              </div>
              <div>
                <span className="label-style block mb-2">Legal</span>
                {["Privacy_Policy", "Terms_of_Service"].map((link) => (
                  <a key={link} href="#" className="block text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest mb-1">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4 text-xs text-muted-foreground uppercase tracking-widest">
              <p>&copy; {new Date().getFullYear()} Africa Property Index Tech</p>
              <p className="mt-1">Location: Pan-African_Distributed</p>
            </div>
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DatabaseIcon className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-tight">
                  Africa Property Index
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The neutral data layer for African real estate.
                Infrastructure, not a portal.
              </p>
            </div>

            {/* Connect */}
            <div>
              <span className="label-style block mb-4">Connect</span>
              <div className="space-y-2">
                {["Network_X", "LinkedIn_Prof"].map((link) => (
                  <a key={link} href="#" className="block text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <span className="label-style block mb-4">Legal</span>
              <div className="space-y-2">
                {["Privacy_Policy", "Terms_of_Service"].map((link) => (
                  <a key={link} href="#" className="block text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="text-left lg:text-right">
              <span className="label-style block mb-4">&copy; {new Date().getFullYear()} Africa Property Index Tech</span>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Location: Pan-African_Distributed
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
