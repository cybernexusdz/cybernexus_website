import React from "react";
import { Department } from "@/types/team.types";
import * as LucideIcons from "lucide-react";

interface DepartmentNodeProps {
  department: Department;
  memberCount: number;
  onClick: () => void;
  style?: React.CSSProperties;
}

const DepartmentNode: React.FC<DepartmentNodeProps> = ({
  department,
  memberCount,
  onClick,
  style,
}) => {
  const IconComponent =
    (LucideIcons as any)[department.icon] || LucideIcons.Box;

  return (
    <button
      onClick={onClick}
      style={style}
      className="group relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 cyber-animate touch-manipulation"
    >
      {/* Animated border frame */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient
            id={`border-grad-${department.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              className="text-primary"
              style={{ stopColor: "currentColor" }}
            />
            <stop
              offset="50%"
              className="text-secondary"
              style={{ stopColor: "currentColor" }}
            />
            <stop
              offset="100%"
              className="text-primary"
              style={{ stopColor: "currentColor" }}
            />
          </linearGradient>

          {/* Clip path for octagon to contain glitch effect */}
          <clipPath id={`octagon-clip-${department.id}`}>
            <polygon points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60" />
          </clipPath>
        </defs>

        {/* Outer octagon frame - solid background */}
        <polygon
          points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60"
          className="fill-base-100"
          stroke={`url(#border-grad-${department.id})`}
          strokeWidth="2"
        />

        {/* Inner geometric accent */}
        <polygon
          points="70,25 130,25 175,70 175,130 130,175 70,175 25,130 25,70"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/30 group-hover:text-primary/50 transition-all duration-500"
          strokeDasharray="4 4"
        />

        {/* Corner accent lines */}
        <line
          x1="60"
          y1="10"
          x2="75"
          y2="10"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary"
        />
        <line
          x1="10"
          y1="60"
          x2="10"
          y2="75"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary"
        />
        <line
          x1="190"
          y1="125"
          x2="190"
          y2="140"
          stroke="currentColor"
          strokeWidth="3"
          className="text-secondary"
        />
        <line
          x1="125"
          y1="190"
          x2="140"
          y2="190"
          stroke="currentColor"
          strokeWidth="3"
          className="text-secondary"
        />
      </svg>

      {/* Content container clipped to octagon */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#octagon-clip-${department.id})` }}
      >
        {/* Glitch effect wrapper */}
        <div className="cyber-glitch-container absolute inset-0 group-hover:[--glitch-x:1.5px] group-hover:[--glitch-opacity:0.6] transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          {/* Icon with glow */}
          <div className="relative mb-2 sm:mb-3">
            <div className="absolute inset-0 -m-2 sm:-m-3 md:-m-4 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <IconComponent
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Department name - Better mobile text wrapping */}
          <h3 className="text-base-content font-mono font-bold text-xs sm:text-sm md:text-base text-center mb-1.5 sm:mb-2 transition-all duration-300 group-hover:text-primary leading-tight max-w-full line-clamp-2 px-1">
            {department.name}
          </h3>

          {/* Member count with terminal style */}
          <div className="font-mono text-[10px] sm:text-[11px] md:text-xs text-base-content/70 group-hover:text-primary transition-colors duration-300">
            <span className="text-primary">&gt;</span> {memberCount}{" "}
            {memberCount === 1 ? "member" : "members"}
          </div>

          {/* Status indicator */}
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-primary uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 bg-primary/0 group-hover:bg-primary/5 blur-2xl transition-all duration-500 rounded-full" />

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent cyber-scanline" />
      </div>
    </button>
  );
};

export default DepartmentNode;
