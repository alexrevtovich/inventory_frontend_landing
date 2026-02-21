"use client";

import {
  FlaskConical,
  Search,
  Camera,
  Shield,
  Smartphone,
  MapPin,
  Zap,
  Globe,
  Cloud,
  Server,
  Palette,
  Layout,
  Package,
  Bell,
  ExternalLink,
  Github,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ────────────────────────────────────
   Intersection-observer fade-in hook
   ──────────────────────────────────── */
function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Shared padding for all section inners */
const sectionPx = "px-6 sm:px-10 lg:px-16";

/* ───────────── Navbar ───────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-xl"
          : "bg-slate-950"
      }`}
    >
      <div className={`flex items-center justify-between ${sectionPx} py-4`}>
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
            <FlaskConical className="h-5 w-5 text-blue-400" />
          </div>
          <span className="text-lg font-semibold text-slate-100 tracking-tight">
            Chem<span className="text-blue-400">Tracker</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Tech Stack"].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              {s}
            </a>
          ))}
          <a
            href="https://chemtracker.avrtech.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            Open App <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-200"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl px-6 py-4 space-y-4">
          {["Features", "Tech Stack"].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setOpen(false)}
              className="block text-base text-slate-300 active:text-blue-400 transition-colors py-1"
            >
              {s}
            </a>
          ))}
          <a
            href="https://chemtracker.avrtech.org/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-500/10 border border-blue-500/20 py-3 text-sm font-medium text-blue-400"
          >
            Open App <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
}

/* ───────────── Phone Mockup ───────────── */
function PhoneMockup() {
  return (
    <div className="phone-frame w-[240px] sm:w-[270px] lg:w-[290px] xl:w-[310px] animate-float">
      <div className="phone-screen">
        <div className="phone-notch" />

        {/* Mini app header */}
        <div className="px-4 pt-3 sm:pt-4 pb-2.5 sm:pb-3 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-blue-400" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-200">
              ChemTracker
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/60 border border-slate-700/50 px-2.5 sm:px-3 py-1.5 sm:py-2">
            <Search className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-slate-500" />
            <span className="text-[9px] sm:text-[10px] text-slate-500">
              Search chemicals...
            </span>
          </div>
        </div>

        {/* Item list */}
        <div className="px-3 sm:px-4 space-y-1.5 sm:space-y-2 pb-5 sm:pb-6">
          {[
            { name: "Sodium Chloride", loc: "Shelf A-3" },
            { name: "Ethanol 95%", loc: "Cabinet B-1" },
            { name: "Acetic Acid", loc: "Fume Hood 2" },
            { name: "DAPI Stain", loc: "Freezer -20" },
            { name: "Methanol HPLC", loc: "Cabinet C-2" },
            { name: "Tris Buffer", loc: "Shelf B-1" },
            { name: "Isopropanol", loc: "Flammables 1" },
            { name: "PBS 10X", loc: "Shelf A-1" },
            { name: "Formaldehyde 37%", loc: "Fume Hood 1" },
            { name: "Glycerol", loc: "Cabinet D-3" },
            { name: "Potassium Chloride", loc: "Shelf A-4" },
            { name: "EDTA 0.5M", loc: "Shelf B-2" },
            { name: "Chloroform", loc: "Flammables 2" },
            { name: "Acetonitrile", loc: "Cabinet C-1" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 sm:gap-3 rounded-lg bg-slate-800/40 border border-slate-700/30 px-2.5 sm:px-3 py-2 sm:py-2.5"
            >
              <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-slate-700/60 text-[8px] sm:text-[9px] font-bold text-slate-400">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-200 truncate">
                  {item.name}
                </p>
                <p className="text-[8px] sm:text-[9px] text-slate-500 flex items-center gap-0.5">
                  <MapPin className="h-1.5 sm:h-2 w-1.5 sm:w-2" /> {item.loc}
                </p>
              </div>
              <Camera className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-slate-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Hero ───────────── */
function Hero() {
  return (
    <section className="relative min-h-screen bg-grid overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] xl:w-[1000px] h-[600px] sm:h-[800px] xl:h-[1000px] rounded-full bg-blue-500/[0.03] blur-3xl pointer-events-none" />

      <div className={`${sectionPx} pt-6 sm:pt-10 pb-16 sm:pb-20 w-full`}>
        <div className="flex flex-col items-center gap-12 sm:gap-16 text-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 sm:px-4 py-1.5 mb-5 sm:mb-6">
              <div className="relative h-2 w-2 rounded-full bg-blue-400 pulse-ring" />
              <span className="text-[11px] sm:text-xs font-medium text-blue-400 tracking-wide">
                Built for Research Labs
              </span>
            </div>

            <h1 className="text-[2rem] leading-[1.15] sm:text-5xl xl:text-6xl font-bold sm:leading-[1.1] tracking-tight text-white mb-5 sm:mb-6">
              Track Your Lab
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Chemicals
              </span>{" "}
              with Ease
            </h1>

            <p className="text-base sm:text-lg xl:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-8">
              A mobile-first inventory application designed for research
              laboratories. Search, photograph, and manage your chemical stock
              from any phone or tablet — right at the bench.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center">
              <a
                href="https://chemtracker.avrtech.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:brightness-110 transition-all active:scale-[0.98]"
              >
                Launch App <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-7 py-3.5 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all active:scale-[0.98]"
              >
                Explore Features <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll hint — mobile only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:hidden animate-bounce">
        <ChevronDown className="h-5 w-5 text-slate-600" />
      </div>
    </section>
  );
}

/* ───────────── Features ───────────── */
const features = [
  {
    icon: Search,
    title: "Instant Search",
    desc: "Real-time filtering across your entire inventory. Find any chemical by name in milliseconds.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Camera,
    title: "Photo Documentation",
    desc: "Snap photos of bottles and labels with your phone camera. Visual records stored alongside each entry.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    desc: "Record shelf, cabinet, and freezer locations. Instantly know where every chemical is stored.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Shield,
    title: "Password Protected",
    desc: "Adding and deleting chemicals requires authentication. Your inventory stays safe from accidental changes.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    desc: "Designed for phones and tablets. Use it at the bench, in the fume hood, or at the storage room door.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: Zap,
    title: "Fast & Cached",
    desc: "Built-in 3-minute cache reduces API calls. Manual refresh when you need the latest data.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

function Features() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section id="features" className="relative py-12 sm:py-16 xl:py-20 scroll-mt-20">
      <div ref={ref} className={`fade-section ${sectionPx}`}>
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 block">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4">
            Everything Your Lab Needs
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Purpose-built for the daily workflow of a research laboratory.
            Simple, fast, and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900/80 transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
            >
              {/* Colored accent bar at top */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${
                    f.color === "text-blue-400"
                      ? "#60a5fa"
                      : f.color === "text-emerald-400"
                      ? "#34d399"
                      : f.color === "text-amber-400"
                      ? "#fbbf24"
                      : f.color === "text-violet-400"
                      ? "#a78bfa"
                      : "#fb7185"
                  } 0%, transparent 100%)`,
                }}
              />

              <div className="p-6 sm:p-8" style={{ paddingTop: 48, paddingBottom: 48 }}>
                {/* Glow orb behind icon */}
                <div className="relative mb-5 sm:mb-6">
                  <div
                    className="absolute -top-3 -left-3 h-16 w-16 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                    style={{
                      background:
                        f.color === "text-blue-400"
                          ? "rgba(96,165,250,0.25)"
                          : f.color === "text-emerald-400"
                          ? "rgba(52,211,153,0.25)"
                          : f.color === "text-amber-400"
                          ? "rgba(251,191,36,0.25)"
                          : f.color === "text-violet-400"
                          ? "rgba(167,139,250,0.25)"
                          : "rgba(251,113,133,0.25)",
                    }}
                  />
                  <div
                    className={`relative inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${f.bg} border ${f.border}`}
                  >
                    <f.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${f.color}`} />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {f.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Tech Stack ───────────── */
const techs = [
  { name: "Next.js 16", category: "Framework", icon: Layout },
  { name: "React 19", category: "UI Library", icon: Package },
  { name: "TypeScript 5", category: "Language", icon: Globe },
  { name: "Tailwind CSS 4", category: "Styling", icon: Palette },
  { name: "shadcn/ui", category: "Components", icon: Layout },
  { name: "Radix UI", category: "Primitives", icon: Package },
  { name: "Lucide Icons", category: "Iconography", icon: Palette },
  { name: "Sonner", category: "Notifications", icon: Bell },
  { name: "Azure SWA", category: "Hosting", icon: Cloud },
  { name: "REST API", category: "Backend", icon: Server },
  { name: "Turbopack", category: "Bundler", icon: Zap },
  { name: "ESLint", category: "Linting", icon: Shield },
];

function TechStack() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section
      id="tech-stack"
      className="relative min-h-screen flex items-center py-16 sm:py-24 xl:py-32 bg-slate-900/30"
    >
      <div ref={ref} className={`fade-section w-full ${sectionPx}`}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 block">
            Technology
          </span>
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Built with the latest web technologies for performance, type
            safety, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {techs.map((t) => (
            <div
              key={t.name}
              className="tech-badge flex flex-col items-center justify-center text-center px-4" style={{ paddingTop: 80, paddingBottom: 80 }}
            >
              <t.icon className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base font-medium text-slate-200">
                {t.name}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-1">
                {t.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── CTA ───────────── */
function CTA() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section className="relative py-16 sm:py-24 xl:py-32">
      <div ref={ref} className={`fade-section ${sectionPx}`}>
        <div className="feature-card glow-blue p-8 sm:p-12 xl:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4">
            See It in Action
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto mb-6 sm:mb-8">
            ChemTracker is live and ready to explore. Open it on your phone to
            experience the mobile-first interface designed for the lab bench.
          </p>
          <a
            href="https://chemtracker.avrtech.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:brightness-110 transition-all active:scale-[0.98]"
          >
            Launch ChemTracker <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Footer ───────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-8 sm:py-10">
      <div className={sectionPx}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-slate-500">
              ChemTracker — A portfolio project by{" "}
              <span className="text-slate-300">Alexey Revtovich</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://chemtracker.avrtech.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-slate-500 hover:text-blue-400 transition-colors"
            >
              Live App
            </a>
            <a
              href="https://github.com/arevtovich"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── Page ───────────── */
export default function LandingPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <TechStack />
        <div className="section-divider" />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
