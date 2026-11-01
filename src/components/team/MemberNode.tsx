import React from "react";
import { LeadershipRank, TeamMember } from "@/types/team.types";
import { User, Crown, Shield } from "lucide-react";
import CyberImage from "../cyber-image/CyberImage";

interface MemberNodeProps {
  member: TeamMember;
  roleInDepartment: string;
  isLead?: boolean;
  leadershipRank?: LeadershipRank;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick: () => void;
  style?: React.CSSProperties;
}

const MemberNode: React.FC<MemberNodeProps> = ({
  member,
  roleInDepartment,
  isLead = false,
  leadershipRank,
  isHighlighted = false,
  isDimmed = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  style,
}) => {
  const rank: LeadershipRank =
    leadershipRank || (isLead ? "leader" : "member");
  const isPrimaryLeader = rank === "leader";
  const isCoLeader = rank === "co-leader";
  const isAnyLeader = isPrimaryLeader || isCoLeader;

  // High-contrast Cyber Gold for Primary Leader, Secondary for Co-Leader, Primary for Member
  const accentColor = isPrimaryLeader
    ? "#fbbf24"
    : isCoLeader
      ? "rgb(var(--secondary))"
      : "rgb(var(--primary))";

  const accentGlow = isPrimaryLeader
    ? "rgba(251, 191, 36, 0.55)"
    : isCoLeader
      ? "rgba(var(--secondary), 0.5)"
      : "rgba(var(--primary), 0.4)";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={`group relative ${
        isPrimaryLeader
          ? "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
          : isCoLeader
            ? "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
            : "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
      } rounded-full transition-all duration-300 hover:scale-110 focus:outline-none cyber-animate touch-manipulation ${
        isDimmed ? "opacity-45 scale-95" : "opacity-100"
      }`}
    >
      {/* Top Floating Command Crest for Leaders & Co-Leaders */}
      {isAnyLeader && (
        <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap">
          <div
            className="absolute inset-0 rounded-full blur-md opacity-70 animate-pulse"
            style={{ backgroundColor: accentGlow }}
          />
          <div
            className="relative flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-base-100/95 backdrop-blur-md border text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest shadow-xl"
            style={{
              borderColor: accentColor,
              color: accentColor,
              boxShadow: `0 0 12px ${accentGlow}`,
            }}
          >
            {isPrimaryLeader ? (
              <>
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>LEADER</span>
              </>
            ) : (
              <>
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>CO-LEAD</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Leader Outer Rotating Cyber-HUD Reticle */}
      {isAnyLeader && (
        <svg
          viewBox="0 0 120 120"
          className="absolute -inset-2.5 sm:-inset-3 w-[calc(100%+20px)] sm:w-[calc(100%+24px)] h-[calc(100%+20px)] sm:h-[calc(100%+24px)] pointer-events-none"
        >
          {/* Outer segmented HUD ring */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke={accentColor}
            strokeWidth="1.4"
            strokeDasharray="18 8 4 8"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 origin-center animate-[spin_22s_linear_infinite]"
          />
          {/* Inner counter-rotating dashed ring */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            strokeDasharray="6 12"
            className="opacity-45 group-hover:opacity-90 transition-opacity duration-300 origin-center animate-[spin_16s_linear_infinite_reverse]"
          />
          {/* Corner HUD targeting brackets */}
          <path
            d="M 16,28 L 16,16 L 28,16 M 92,16 L 104,16 L 104,28 M 104,92 L 104,104 L 92,104 M 28,104 L 16,104 L 16,92"
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </svg>
      )}

      {/* Regular Member Subtle Outer Tech Ring */}
      {!isAnyLeader && (
        <div
          className={`absolute -inset-1 rounded-full border border-dashed transition-all duration-300 pointer-events-none ${
            isHighlighted
              ? "opacity-95 scale-105"
              : "opacity-25 group-hover:opacity-75"
          }`}
          style={{
            borderColor: isHighlighted ? "#fbbf24" : accentColor,
          }}
        />
      )}

      {/* Main Circular Node Container */}
      <div
        className={`absolute ${
          isAnyLeader ? "inset-1.5" : "inset-1"
        } rounded-full bg-base-100 flex items-center justify-center overflow-hidden transition-all duration-300`}
        style={{
          border: `${isAnyLeader ? "3px" : "2px"} solid ${
            isHighlighted && !isAnyLeader ? "#fbbf24" : accentColor
          }`,
          boxShadow:
            isHighlighted || isAnyLeader
              ? `0 0 24px ${accentGlow}, inset 0 0 16px ${accentGlow}`
              : `0 4px 14px rgba(0, 0, 0, 0.5), 0 0 10px ${accentGlow}`,
        }}
      >
        {/* Inner decorative ring */}
        <div
          className="absolute inset-1.5 sm:inset-2 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
          style={{
            border: `1px solid ${accentColor}`,
          }}
        />

        {/* Avatar or Placeholder */}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          {member.image ? (
            <CyberImage
              src={member.image}
              alt={member.name}
              className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              priority={isAnyLeader}
              revealEffect="fade"
            />
          ) : (
            <div className="flex items-center justify-center">
              <User
                className={`${
                  isAnyLeader
                    ? "w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    : "w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                } transition-all duration-300 group-hover:scale-110`}
                style={{ color: accentColor }}
                strokeWidth={1.5}
              />
            </div>
          )}

          {/* Hover Overlay with Member Info */}
          <div
            className="absolute inset-0 bg-base-100/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 sm:p-3 rounded-full"
            style={{
              border: `2px solid ${accentColor}`,
              boxShadow: `inset 0 0 15px ${accentGlow}`,
            }}
          >
            <p
              className={`text-base-content font-mono font-bold ${
                isAnyLeader
                  ? "text-xs sm:text-sm md:text-base"
                  : "text-[10px] sm:text-xs md:text-sm"
              } text-center leading-tight mb-0.5 max-w-full line-clamp-2 px-1`}
            >
              {member.name}
            </p>
            <p
              className="font-mono text-[8px] sm:text-[10px] md:text-xs text-center leading-tight line-clamp-2 max-w-full px-1 font-semibold"
              style={{ color: accentColor }}
            >
              {roleInDepartment}
            </p>
          </div>
        </div>
      </div>

      {/* Synaptic Connection Port Dots around Node */}
      <div className="absolute inset-0 pointer-events-none">
        {(isAnyLeader ? [0, 90, 180, 270] : [0, 180]).map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const radius = 48;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);
          return (
            <div
              key={angle}
              className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-base-100 transition-transform duration-300 group-hover:scale-125"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: isHighlighted ? "#fbbf24" : accentColor,
                boxShadow: `0 0 6px ${accentGlow}`,
              }}
            />
          );
        })}
      </div>

      {/* Sleek Floating Nameplate Underneath Node (Always visible for instant identification) */}
      <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap">
        <div
          className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-base-100/95 backdrop-blur-md border shadow-lg transition-all duration-300 flex flex-col items-center ${
            isAnyLeader
              ? "max-w-[155px] sm:max-w-[180px]"
              : "max-w-[120px] sm:max-w-[145px]"
          }`}
          style={{
            borderColor:
              isHighlighted || isAnyLeader
                ? accentColor
                : "rgba(var(--primary), 0.35)",
            boxShadow:
              isHighlighted || isAnyLeader
                ? `0 2px 12px ${accentGlow}`
                : "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <span
            className={`font-mono font-bold text-base-content truncate w-full text-center leading-tight ${
              isAnyLeader
                ? "text-[10px] sm:text-xs"
                : "text-[9px] sm:text-[11px]"
            }`}
          >
            {member.name}
          </span>
          {isAnyLeader && (
            <span
              className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold truncate w-full text-center leading-tight"
              style={{ color: accentColor }}
            >
              {roleInDepartment}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default MemberNode;
