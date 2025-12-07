import React, { useMemo, useState, useCallback } from "react";
import { Terminal, Code2 } from "lucide-react";
import SponsorCard, { Sponsor } from "./SponsorCard";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

interface SponsorsSectionProps {
  sponsors?: Sponsor[];
  loading?: boolean;
}

const defaultSponsors: Sponsor[] = [
  {
    id: 1,
    name: "Futuro Skills Academy",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
    description:
      "Empowering the next generation of tech innovators with cutting-edge education",
    tier: "PARTNER",
  },
];

const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  sponsors = defaultSponsors,
  loading = false,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Memoized sponsor list with fallback
  const sponsorList = useMemo<Sponsor[]>(
    () =>
      Array.isArray(sponsors) && sponsors.length > 0
        ? sponsors
        : defaultSponsors,
    [sponsors],
  );

  // Handlers
  const handleCardHover = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Animation refs with RGB CHROMATIC ABERRATION glitch effects
  const headerBadgeRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.1,
  });

  const headerTitleRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.3,
  });

  const headerDescRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.5,
  });

  const cardsRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.4,
    delay: 0.2,
    stagger: 0.2,
  });

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-10 bg-background overflow-hidden flex items-center">
      {/* Animated Background Grid - Simplified for performance */}
      <div className="cyber-grid absolute inset-0 opacity-20" />

      {/* Reduced particle count for better performance */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="data-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${25 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          {/* Badge - CENTER GLITCH with RGB */}
          <div ref={headerBadgeRef} className="flex justify-center">
            <div className="border border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 rounded font-mono text-sm inline-flex items-center gap-2">
              <Terminal className="w-4 h-4 animate-pulse-fast" />
              &lt;PARTNERS_INITIATED /&gt;
            </div>
          </div>

          {/* Title - CENTER GLITCH with RGB */}
          <div ref={headerTitleRef}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground font-mono leading-tight">
              <span className="text-primary/60">&gt;</span> Supporting The{" "}
              <span className="relative inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                Nexian
              </span>{" "}
              Mission
            </h2>
          </div>

          {/* Description - CENTER GLITCH with RGB */}
          <div ref={headerDescRef}>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed font-mono">
              <span className="text-primary animate-pulse-slow">&gt;_</span>{" "}
              Partnering with organizations that fuel innovation and community
              growth
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Code2 className="w-4 h-4 text-primary/40 animate-pulse-fast" />
              <div className="h-px w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent data-line" />
              <Code2 className="w-4 h-4 text-primary/40 animate-pulse-fast" />
            </div>
          </div>
        </div>

        {/* Sponsor Cards - CENTER GLITCH with RGB + STAGGER */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl">
            {loading ? (
              <div className="py-12 text-center">
                <div className="h-64 w-full rounded-2xl bg-card/40 animate-pulse border-2 border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary/60 font-mono flex items-center gap-2">
                      <Terminal className="w-5 h-5 animate-pulse" />
                      <span className="animate-pulse-slow">
                        LOADING_PARTNERS...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={cardsRef} className="grid gap-8 grid-cols-1">
                {sponsorList.map((sponsor, index) => (
                  <SponsorCard
                    key={sponsor.id}
                    sponsor={sponsor}
                    isHovered={hoveredCard === index}
                    onHover={() => handleCardHover(index)}
                    onLeave={handleCardLeave}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
