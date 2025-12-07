import React, { useState } from "react";
import { Card } from "@/components/ui/card";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "cyan" | "purple" | "pink";
  variant?: "default" | "bordered" | "hologram";
}

const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = "",
  glowColor = "primary",
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    primary: "from-primary/30 via-primary/20 to-primary/30",
    secondary: "from-secondary/30 via-secondary/20 to-secondary/30",
    cyan: "from-cyan-500/30 via-cyan-500/20 to-cyan-500/30",
    purple: "from-purple-500/30 via-purple-500/20 to-purple-500/30",
    pink: "from-pink-500/30 via-pink-500/20 to-pink-500/30",
  };

  const borderColors = {
    primary: "border-primary/30 group-hover:border-primary/60",
    secondary: "border-secondary/30 group-hover:border-secondary/60",
    cyan: "border-cyan-500/30 group-hover:border-cyan-500/60",
    purple: "border-purple-500/30 group-hover:border-purple-500/60",
    pink: "border-pink-500/30 group-hover:border-pink-500/60",
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner Brackets - Cyberpunk style */}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-all duration-300 pointer-events-none z-20" />
      <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-all duration-300 pointer-events-none z-20" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-all duration-300 pointer-events-none z-20" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-all duration-300 pointer-events-none z-20" />

      {/* Outer Glow */}
      <div
        className={`absolute -inset-1 rounded-lg bg-gradient-to-r ${glowColors[glowColor]} blur-sm transition-opacity duration-300 ${
          isHovered ? "opacity-70" : "opacity-30"
        }`}
      />

      {/* Scanline effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan" />
        </div>
      )}

      {/* Data lines (top & bottom) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />

      {/* Main Card */}
      <Card
        className={`relative bg-card/80 backdrop-blur-md border-2 ${borderColors[glowColor]} transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Hologram effect for variant */}
        {variant === "hologram" && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        )}

        {/* Grid overlay */}
        {variant === "bordered" && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </Card>

      {/* CSS for animations */}
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CyberCard;
