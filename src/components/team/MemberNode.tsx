import React from "react";
import { TeamMember } from "@/types/team.types";
import { User, Crown } from "lucide-react";

interface MemberNodeProps {
  member: TeamMember;
  roleInDepartment: string;
  isLead?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const MemberNode: React.FC<MemberNodeProps> = ({
  member,
  roleInDepartment,
  isLead = false,
  onClick,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`group relative ${isLead ? "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" : "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"} transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLead ? "focus:ring-secondary" : "focus:ring-primary"} cyber-animate touch-manipulation`}
    >
      {/* Outer rings for leads - creates depth */}
      {isLead && (
        <div className="absolute inset-0">
          {/* Outermost subtle ring */}
          <div
            className="absolute inset-0 rounded-full border opacity-30 group-hover:opacity-60 transition-all duration-300"
            style={{
              borderColor: "rgb(var(--secondary))",
              borderWidth: "1px",
            }}
          />
          {/* Animated dashed ring */}
          <div
            className="absolute inset-1 rounded-full opacity-50 cyber-circuit-line group-hover:opacity-80 transition-opacity duration-300"
            style={{
              border: "1.5px dashed rgb(var(--secondary))",
            }}
          />
        </div>
      )}

      {/* Main node container */}
      <div
        className={`absolute ${isLead ? "inset-2" : "inset-1"} rounded-full bg-base-100 flex items-center justify-center overflow-hidden transition-all duration-300`}
        style={{
          border: `${isLead ? "2.5px" : "2px"} solid ${isLead ? "rgb(var(--secondary))" : "rgb(var(--primary))"}`,
          boxShadow: isLead
            ? "0 3px 10px rgba(var(--secondary), 0.5), inset 0 0 15px rgba(var(--secondary), 0.1)"
            : "0 2px 8px rgba(var(--primary), 0.4), inset 0 0 12px rgba(var(--primary), 0.08)",
        }}
      >
        {/* Inner decorative ring */}
        <div
          className="absolute inset-1.5 sm:inset-2 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            border: `1px solid ${isLead ? "rgb(var(--secondary))" : "rgb(var(--primary))"}`,
          }}
        />

        {/* Center dot - neural network style */}
        <div
          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
          style={{
            backgroundColor: isLead
              ? "rgb(var(--secondary))"
              : "rgb(var(--primary))",
          }}
        />

        {/* Avatar or placeholder */}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          {member.image ? (
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <User
                className={`${isLead ? "w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" : "w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16"} transition-all duration-300 group-hover:scale-110`}
                style={{
                  color: isLead
                    ? "rgb(var(--secondary))"
                    : "rgb(var(--primary))",
                }}
                strokeWidth={1.5}
              />
            </div>
          )}

          {/* Hover overlay with info - Better mobile sizing */}
          <div
            className="absolute inset-0 bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-full"
            style={{
              border: `2px solid ${isLead ? "rgb(var(--secondary))" : "rgb(var(--primary))"}`,
              boxShadow: isLead
                ? "inset 0 0 15px rgba(var(--secondary), 0.2), 0 0 12px rgba(var(--secondary), 0.3)"
                : "inset 0 0 15px rgba(var(--primary), 0.2), 0 0 12px rgba(var(--primary), 0.3)",
            }}
          >
            <p
              className={`text-base-content font-mono font-bold ${isLead ? "text-xs sm:text-sm md:text-base" : "text-[10px] sm:text-xs md:text-sm"} text-center leading-tight mb-0.5 sm:mb-1 max-w-full line-clamp-2 px-1`}
            >
              {member.name}
            </p>
            <p className="text-base-content/70 font-mono text-[8px] sm:text-[10px] md:text-xs text-center leading-tight line-clamp-2 max-w-full px-1">
              {roleInDepartment}
            </p>
            {isLead && (
              <div className="mt-1 sm:mt-1.5 flex items-center gap-0.5 sm:gap-1">
                <div
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "rgb(var(--secondary))" }}
                />
                <span
                  className="text-[8px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-wider font-bold"
                  style={{ color: "rgb(var(--secondary))" }}
                >
                  Lead
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Pulsing signal ring on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 pointer-events-none"
          style={{
            border: `2px solid ${isLead ? "rgb(var(--secondary))" : "rgb(var(--primary))"}`,
            animation: "pulse-ring 2s ease-out infinite",
          }}
        />
      </div>

      {/* Lead crown indicator - floating above with better mobile sizing */}
      {isLead && (
        <div className="absolute -top-1.5 sm:-top-2 md:-top-3 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            {/* Animated glow pulse */}
            <div
              className="absolute inset-0 rounded-full blur-md scale-150 animate-pulse"
              style={{ backgroundColor: "rgba(var(--secondary), 0.5)" }}
            />
            {/* Crown icon */}
            <div
              className="relative rounded-full p-1 sm:p-1.5 md:p-2 border-2 shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--secondary)), rgba(var(--secondary), 0.8))",
                borderColor: "hsl(var(--background))",
              }}
            >
              <Crown
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                style={{ color: "hsl(var(--secondary-content))" }}
                strokeWidth={2.5}
                fill="currentColor"
              />
            </div>
          </div>
        </div>
      )}

      {/* Connection points - dots around lead nodes with better mobile sizing */}
      {isLead && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const size = isLead ? 28 : 24; // adjust for mobile
            const radius = size * 0.45;
            const x = 50 + radius * Math.cos(rad);
            const y = 50 + radius * Math.sin(rad);
            return (
              <div
                key={angle}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundColor: "rgb(var(--secondary))",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 4px rgba(var(--secondary), 0.6)",
                  animation: `pulse-glow 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Background glow effect */}
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: isLead
            ? "radial-gradient(circle, rgba(var(--secondary), 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(var(--primary), 0.25) 0%, transparent 70%)",
          transform: "scale(1.5)",
        }}
      />
    </button>
  );
};

export default MemberNode;
