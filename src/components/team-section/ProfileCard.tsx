import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Briefcase,
  Terminal,
  ChevronRight,
} from "lucide-react";

interface SocialLink {
  icon: any;
  label: string;
  href: string;
  platform?: string;
}

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  socialLinks?: SocialLink[] | null;
  onClick?: () => void;
  memberId?: number;
  departmentId?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  image,
  socialLinks = null,
  onClick,
  memberId,
  departmentId,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (memberId && departmentId) {
      navigate(`/meet-the-team/${departmentId}/${memberId}`);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper to convert string icon names to components
  const getIconComponent = (iconName: string | any): any => {
    if (typeof iconName !== "string") return iconName;

    const iconMap: Record<string, any> = {
      Github,
      Linkedin,
      Twitter,
      Mail,
      Briefcase,
      github: Github,
      linkedin: Linkedin,
      twitter: Twitter,
      mail: Mail,
      briefcase: Briefcase,
      portfolio: Briefcase,
      email: Mail,
    };
    return iconMap[iconName] || Briefcase;
  };

  const links = (socialLinks || []).filter(
    (link) => link && link.href && link.href.trim() !== "" && link.href !== "#",
  );

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group relative cursor-pointer transition-all duration-500 hover:scale-[1.02] w-full max-w-[280px]"
    >
      {/* Image Container - Statue Style */}
      <div className="relative mb-4 overflow-hidden h-[320px] sm:h-[360px] md:h-[400px] lg:h-[420px]">
        {/* Glowing corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 z-10 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-primary" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60 z-10 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-primary" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60 z-10 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-primary" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 z-10 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-primary" />

        {/* Scan line effect */}
        <div
          className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)",
          }}
        />

        {/* Animated scan line */}
        {isHovered && !isMobile && (
          <div
            className="absolute inset-x-0 h-32 z-20 pointer-events-none profile-card-scan"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.2), transparent)",
            }}
          />
        )}

        {/* Image with grayscale effect */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={image}
            alt={`${name} profile`}
            className="w-full h-full object-cover object-bottom transition-all duration-700 group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
            loading="lazy"
          />
          {/* Cyan/Magenta chromatic aberration overlay on hover */}
          <div
            className={`absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-20" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 0, 255, 0.3), transparent 50%)",
            }}
          />
        </div>

        {/* Glitch effect overlay */}
        <div
          className={`absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Name Display - Cyberpunk Style */}
      <div className="relative space-y-2 min-h-[120px] sm:min-h-[110px] flex flex-col justify-between">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 text-primary/60 text-xs font-mono mb-1">
          <Terminal className="w-3 h-3 flex-shrink-0" />
          <span className="tracking-wider truncate text-[10px]">
            MEMBER_ID_{name.replace(/\s+/g, "_").toUpperCase()}
          </span>
          <ChevronRight className="w-3 h-3 ml-auto animate-pulse flex-shrink-0" />
        </div>

        {/* Name with glitch effect */}
        <div className="relative flex-1">
          <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-foreground relative z-10 group-hover:text-primary transition-colors duration-300 leading-tight break-words">
            <span className="relative inline-block">
              {name}
              {/* Glitch layers */}
              {isHovered && !isMobile && (
                <>
                  <span className="absolute inset-0 text-cyan-400 opacity-70 profile-card-glitch1">
                    {name}
                  </span>
                  <span className="absolute inset-0 text-pink-400 opacity-70 profile-card-glitch2">
                    {name}
                  </span>
                </>
              )}
            </span>
          </h3>

          {/* Hex grid pattern background */}
          <div className="absolute -inset-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMTAgMCBMIDIwIDEwIEwgMTAgMjAgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 text-sm font-mono mt-auto">
          <span className="text-primary/80">&gt;_</span>
          <span className="text-foreground/70 tracking-wide truncate">
            {role}
          </span>
        </div>

        {/* Divider line with glow */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-3 group-hover:via-primary/60 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </div>

        {/* Social Links - Minimalist */}
        {links.length > 0 && (
          <div className="flex items-center gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {links.map((social, index) => {
              const Icon = getIconComponent(social.icon);
              return (
                <a
                  key={`${social.label}-${index}`}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={social.label}
                  className="text-foreground/40 hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
