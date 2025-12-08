import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Zap } from "lucide-react";
import GridBackground from "@/components/ui/GridBackground";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";
import { Title } from "@/components/ui/title";

const HeroSection: React.FC = () => {
  // Animation refs for different elements with RGB CHROMATIC ABERRATION
  const badgeRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.2,
    start: "top 90%",
    once: true,
  });

  const titleRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.4,
    start: "top 90%",
    once: true,
  });

  const subtitleRef = useCyberScrollAnimation({
    animation: "cyberGlitchLeft",
    duration: 0.8,
    delay: 0.6,
    start: "top 90%",
    once: true,
  });

  const descriptionRef = useCyberScrollAnimation({
    animation: "cyberGlitchRight",
    duration: 1,
    delay: 0.8,
    start: "top 90%",
    once: true,
  });

  const ctaRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 1,
    start: "top 90%",
    once: true,
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-20 bg-background overflow-hidden">
      {/* Circuit Board Grid */}
      <div className="absolute inset-0">
        <GridBackground />
      </div>

      {/* Status Badge */}
      <div ref={badgeRef}>
        <Badge
          variant="outline"
          className="mb-6 sm:mb-8 border-primary/50 bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 font-mono relative z-10 text-xs sm:text-sm"
        >
          <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
          <span className="hidden sm:inline">
            SYSTEM ONLINE // STATUS: OPERATIONAL
          </span>
          <span className="sm:hidden">ONLINE // OPERATIONAL</span>
        </Badge>
      </div>

      {/* Title - Made bigger and responsive */}
      <div
        ref={titleRef}
        className="mb-6 sm:mb-8 relative z-10 cyber-perspective w-full max-w-6xl mx-auto"
      >
        <Title
          text="CyberNexus"
          className="text-5xl sm:text-7xl md:text-8xl mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent uppercase leading-[0.9] break-words hyphens-auto"
        />
      </div>

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="flex items-center justify-center gap-2 sm:gap-3 text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold font-mono text-foreground mb-6 sm:mb-8 relative z-10 px-2"
      >
        <Terminal className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary animate-pulse flex-shrink-0" />
        <h2 className="leading-tight">
          <span className="text-primary"></span> For Students. By Students.
        </h2>
      </div>

      {/* Description */}
      <div
        ref={descriptionRef}
        className="max-w-2xl mb-8 sm:mb-12 space-y-3 relative z-10 px-2"
      >
        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-mono">
          <span className="text-primary font-bold">[MISSION]</span> Your
          student-run tech hub at Ibn Khaldoun University. Building skills,
          sharing knowledge, and creating awesome projects together.
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground italic font-mono border-l-2 border-primary pl-3 sm:pl-4">
          <span className="text-secondary">&gt;_</span> Whether you're just
          starting out or already a tech wizard, there's a place for you here.
        </p>
      </div>

      {/* CTA Button */}
      <div
        ref={ctaRef}
        className="flex flex-col sm:flex-row gap-4 mb-12 relative z-10 px-2"
      >
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfTswK69iamz_XcmYAz8jTTm8ZAZSMS4RL9-WMBiZaXh9UR-w/viewform?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-spin" />
            <span className="hidden xs:inline">JOIN_THE_NEXIANS</span>
            <span className="xs:hidden">JOIN_NEXIANS</span>
            <span className="text-xs opacity-70 ml-1">.exe</span>
          </Button>
        </a>
      </div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute w-full h-[1px] bg-primary cyber-scanline" />
      </div>
    </section>
  );
};

export default HeroSection;
