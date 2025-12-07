import React, { KeyboardEvent } from "react";
import { Handshake, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import CyberCard from "../ui/CyberCard";

export type SponsorTier = "PLATINUM" | "GOLD" | "SILVER" | "BRONZE" | "PARTNER";

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  lien?: string;
  description?: string;
  tier?: SponsorTier;
  githubURL?: string;
}

interface SponsorCardProps {
  sponsor: Sponsor;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const tierConfig: Record<
  SponsorTier,
  {
    gradient: string;
    borderColor: string;
    glowColor: string;
    label: string;
    badgeGradient: string;
    cyberGlow: "primary" | "secondary";
  }
> = {
  PLATINUM: {
    gradient: "from-slate-300 via-slate-100 to-slate-300",
    borderColor: "border-slate-400/50",
    glowColor: "from-slate-400/30 via-slate-300/20 to-slate-400/30",
    label: "Elite Partner",
    badgeGradient: "from-slate-400 to-slate-300",
    cyberGlow: "primary",
  },
  GOLD: {
    gradient: "from-yellow-400 via-yellow-300 to-yellow-400",
    borderColor: "border-yellow-400/50",
    glowColor: "from-yellow-400/30 via-yellow-300/20 to-yellow-400/30",
    label: "Premium Partner",
    badgeGradient: "from-yellow-500 to-yellow-400",
    cyberGlow: "primary",
  },
  SILVER: {
    gradient: "from-gray-400 via-gray-300 to-gray-400",
    borderColor: "border-gray-400/50",
    glowColor: "from-gray-400/30 via-gray-300/20 to-gray-400/30",
    label: "Strategic Partner",
    badgeGradient: "from-gray-500 to-gray-400",
    cyberGlow: "secondary",
  },
  BRONZE: {
    gradient: "from-orange-600 via-orange-400 to-orange-600",
    borderColor: "border-orange-500/50",
    glowColor: "from-orange-500/30 via-orange-400/20 to-orange-500/30",
    label: "Supporting Partner",
    badgeGradient: "from-orange-600 to-orange-500",
    cyberGlow: "secondary",
  },
  PARTNER: {
    gradient: "from-primary via-secondary to-primary",
    borderColor: "border-primary/50",
    glowColor: "from-primary/30 via-secondary/20 to-primary/30",
    label: "Community Partner",
    badgeGradient: "from-primary to-secondary",
    cyberGlow: "primary",
  },
};

const SponsorCard: React.FC<SponsorCardProps> = ({
  sponsor,
  isHovered,
  onHover,
  onLeave,
}) => {
  const tier = sponsor.tier || "PARTNER";
  const config = tierConfig[tier];

  const openInNewTab = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    url?: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openInNewTab(url);
    }
  };

  return (
    <div className="sponsor-card" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <CyberCard className="p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Logo Section */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => openInNewTab(sponsor.lien)}
            onKeyDown={(e) => handleCardKeyDown(e, sponsor.lien)}
            aria-label={`Open ${sponsor.name} website`}
            className="flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
          >
            <div
              className={`w-72 h-48 lg:w-80 lg:h-56 flex items-center justify-center bg-background/60 rounded-xl border-2 ${config.borderColor} p-6 hover:border-opacity-100 transition-all duration-500 relative overflow-hidden shadow-2xl`}
            >
              {/* Scanline effect on hover */}
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan pointer-events-none" />
              )}

              <img
                src={sponsor.logo}
                alt={sponsor.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain relative z-10 hover:scale-105 transition-all duration-500"
              />

              {/* Tier Badge */}
              {sponsor.tier && (
                <div
                  className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${config.badgeGradient} rounded-full text-xs font-black text-white border border-white/30 shadow-lg z-20 font-mono tracking-wider`}
                >
                  {tier}
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-grow text-center lg:text-left space-y-4">
            <div className="space-y-2">
              {/* Partner Type Badge */}
              <div
                className={`inline-block px-3 py-1 bg-gradient-to-r ${config.glowColor} rounded-md border ${config.borderColor} text-xs font-mono uppercase tracking-widest text-foreground`}
              >
                <Handshake className="inline w-3 h-3 mr-1" />
                {config.label}
              </div>

              {/* Name */}
              <h3 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight font-mono">
                {sponsor.name}
              </h3>
            </div>

            {/* Description */}
            {sponsor.description && (
              <p className="text-base lg:text-lg text-foreground/80 leading-relaxed font-mono max-w-2xl">
                <span className="text-primary">&gt;</span> {sponsor.description}
              </p>
            )}

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs font-mono text-green-400 uppercase tracking-wide">
                STATUS: ACTIVE
              </span>
              <span
                className={`px-3 py-1 bg-gradient-to-r ${config.glowColor} border ${config.borderColor} rounded text-xs font-mono uppercase tracking-wide`}
              >
                TIER: {tier}
              </span>
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs font-mono text-green-400 uppercase tracking-wide">
                SYNC: 100%
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => openInNewTab(sponsor.githubURL || sponsor.lien)}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8 py-6"
              >
                <Terminal className="w-4 h-4 mr-2" />
                ACCESS_SITE
                <span className="text-xs opacity-70 ml-1">.exe</span>
                <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
              </Button>
            </div>
          </div>
        </div>
      </CyberCard>
    </div>
  );
};

export default SponsorCard;
