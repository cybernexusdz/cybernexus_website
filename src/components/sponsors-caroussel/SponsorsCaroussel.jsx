import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { Handshake, Zap, Terminal, Code2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import { useScrollReveal } from "../../hooks/useGsapAnimation";
import {
  CornerBrackets,
  TerminalBadge,
  DataLine,
  StatusIndicator,
} from "../ui/CyberBackground";

gsap.registerPlugin(ScrollTrigger);

const defaultSponsors = [
  {
    id: 1,
    name: "Futuro Skills Academy",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
    description:
      "Empowering the next generation of tech innovators with cutting-edge education",
    tier: "PLATINUM",
  },
];

export default function SponsorsSection({
  sponsors = defaultSponsors,
  loading = false,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Single ref for animations
  const hasAnimatedRef = useRef(false);

  // Apply glitch effect to "Nexian" text
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });

  // Scroll-triggered animations
  const headerRef = useScrollReveal({ y: 40, duration: 0.8 });
  const cardsRef = useScrollReveal({ y: 60, duration: 1, start: "top 75%" });

  // Simplified GSAP animation - single setup
  useEffect(() => {
    if (hasAnimatedRef.current || !headerRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const list = useMemo(
    () =>
      Array.isArray(sponsors) && sponsors.length ? sponsors : defaultSponsors,
    [sponsors],
  );

  const openInNewTab = useCallback((url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleCardKeyDown = useCallback(
    (e, url) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openInNewTab(url);
      }
    },
    [openInNewTab],
  );

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/20 to-base-100 relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-4">
          <div className="mb-4">
            <TerminalBadge icon={Terminal}>
              &lt;PARTNERS_INITIATED&gt;
            </TerminalBadge>
          </div>

          <h2 className="text-5xl sm:text-6xl font-black text-base-content tracking-tight font-mono">
            <span className="text-primary/60">&gt;</span> Supporting The{" "}
            <span
              ref={glitchRef}
              className="relative inline-block bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent"
            >
              Nexian
            </span>{" "}
            Mission
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed font-mono">
            <span className="text-primary font-bold">&gt;</span> Partnering with
            organizations that fuel innovation and community growth
          </p>

          {/* Terminal-style divider */}
          <div className="flex items-center justify-center gap-2 text-primary/40 font-mono text-xs pt-4">
            <Code2 className="w-4 h-4" />
            <div className="flex gap-1">
              <span className="animate-pulse">
                ────────────────────────────────────────
              </span>
            </div>
            <Code2 className="w-4 h-4" />
          </div>
        </div>

        {/* Sponsor Cards */}
        <div ref={cardsRef} className="flex justify-center items-center">
          <div className="w-full max-w-5xl">
            {loading ? (
              <div className="py-12 text-center">
                <div className="h-64 w-full rounded-2xl bg-base-200/40 animate-pulse border-2 border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                </div>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1">
                {list.map((s, idx) => (
                  <div
                    key={s.id}
                    className="sponsor-card relative group"
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Corner brackets */}
                    <CornerBrackets size="md" />

                    {/* Simplified glow - removed blur-xl and animate-pulse-slow */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Main border - removed neon-border-subtle class */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 group-hover:border-primary/70 transition-all duration-300" />

                    {/* Removed scanning effect for performance */}

                    {/* Card Content - Removed backdrop-blur and perspective */}
                    <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-10 rounded-2xl bg-base-200/95 border-2 border-base-content/10 shadow-2xl transition-all duration-300 group-hover:scale-[1.01]">
                      {/* Logo Section */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => openInNewTab(s.lien)}
                        onKeyDown={(e) => handleCardKeyDown(e, s.lien)}
                        aria-label={`Open ${s.name} website`}
                        className="flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
                      >
                        <div className="w-72 h-48 lg:w-80 lg:h-56 flex items-center justify-center bg-base-100/60 rounded-xl border-2 border-primary/30 p-6 group-hover:border-primary/60 transition-all duration-500 relative overflow-hidden shadow-2xl">
                          {/* Removed scanline-slow for performance */}

                          {/* Data lines */}
                          <DataLine position="top" intensity="medium" />
                          <DataLine position="bottom" intensity="medium" />

                          {/* Removed drop-shadow filter for performance */}
                          <img
                            src={s.logo}
                            alt={s.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain relative z-10 group-hover:scale-105 transition-all duration-500"
                          />

                          {/* Tier badge */}
                          {s.tier && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-black text-white border border-white/30 shadow-lg z-20 font-mono">
                              {s.tier}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="flex-grow text-center lg:text-left space-y-4">
                        <div className="space-y-2">
                          <div className="inline-block px-3 py-1 bg-primary/10 rounded-md border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
                            <Handshake className="inline w-3 h-3 mr-1" />
                            Primary Sponsor
                          </div>

                          <h3 className="text-3xl lg:text-4xl font-black text-base-content tracking-tight group-hover:text-primary transition-colors duration-300 font-mono">
                            {s.name}
                          </h3>
                        </div>

                        {s.description && (
                          <p className="text-base lg:text-lg text-base-content/70 leading-relaxed font-mono max-w-2xl group-hover:text-base-content/90 transition-colors duration-300">
                            <span className="text-secondary">&gt;</span>{" "}
                            {s.description}
                          </p>
                        )}

                        {/* Status indicators */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                          <StatusIndicator
                            label="STATUS"
                            value="ACTIVE"
                            type="success"
                          />
                          <StatusIndicator
                            label="LEVEL"
                            value="MAX"
                            type="primary"
                          />
                          <StatusIndicator
                            label="SYNC"
                            value="100%"
                            type="success"
                          />
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <a
                            href={s.githubURL || s.lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg border-2 border-primary/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group/btn relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 font-mono tracking-wider flex items-center gap-2">
                              <Terminal className="w-4 h-4" />
                              ACCESS_SITE
                              <span className="text-xs opacity-70">.exe</span>
                            </span>
                            <Zap className="relative z-10 w-5 h-5 group-hover/btn:animate-pulse" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
