import React, { useEffect, useRef } from "react";
import { TeamMember, Department } from "@/types/team.types";
import { X, User } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { gsap } from "gsap";

interface MemberCardProps {
  member: TeamMember;
  currentDepartment: Department;
  allDepartments: Department[];
  onClose: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  currentDepartment,
  allDepartments,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Get current department role
  const currentRole = member.departmentRoles.find(
    (dr) => dr.departmentId === currentDepartment.id,
  );

  // Helper function to apply RGB shadow effect only to text elements
  const applyRGBToText = (target: HTMLElement, shadow: string) => {
    const textElements = target.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, a, button, li, div",
    );
    textElements.forEach((el) => {
      gsap.set(el, { textShadow: shadow });
    });
  };

  // Helper function to remove RGB shadow from text elements
  const removeRGBFromText = (target: HTMLElement) => {
    const textElements = target.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, a, button, li, div",
    );
    textElements.forEach((el) => {
      gsap.set(el, { textShadow: "none" });
    });
  };

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial state
      gsap.set(overlay, { opacity: 0 });
      gsap.set(card, {
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
      });

      // Animate in with glitch effect
      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          card,
          {
            opacity: 0.7,
            scale: 1,
            filter: "blur(10px)",
            duration: 0.3,
            ease: "power2.out",
            onStart: function () {
              applyRGBToText(
                card,
                "15px 0 #ff0000, -15px 0 #00ffff, 0 8px #00ff00",
              );
            },
          },
          "-=0.2",
        )
        // Glitch sequence
        .to(card, {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-10, 10),
          rotate: () => gsap.utils.random(-5, 5),
          skewX: () => gsap.utils.random(-15, 15),
          filter: "blur(5px) saturate(3) hue-rotate(90deg)",
          duration: 0.05,
          ease: "none",
          onStart: function () {
            applyRGBToText(
              card,
              "10px 0 #ff0000, -10px 0 #00ffff, 0 5px #00ff00",
            );
          },
        })
        .to(card, {
          x: () => gsap.utils.random(-25, 25),
          y: () => gsap.utils.random(-8, 8),
          rotate: () => gsap.utils.random(-4, 4),
          skewX: () => gsap.utils.random(-12, 12),
          filter: "blur(5px) saturate(3) hue-rotate(-90deg)",
          duration: 0.05,
          ease: "none",
          onStart: function () {
            applyRGBToText(
              card,
              "-10px 0 #ff00ff, 10px 0 #00ff00, 0 5px #ffff00",
            );
          },
        })
        .to(card, {
          x: () => gsap.utils.random(-20, 20),
          y: () => gsap.utils.random(-6, 6),
          rotate: () => gsap.utils.random(-3, 3),
          skewX: () => gsap.utils.random(-10, 10),
          filter: "blur(5px) saturate(3) hue-rotate(180deg)",
          duration: 0.05,
          ease: "none",
          onStart: function () {
            applyRGBToText(
              card,
              "12px 0 #00ffff, -12px 0 #ff0000, 0 6px #ff00ff",
            );
          },
        })
        // Final settle
        .to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          skewX: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
          onStart: function () {
            applyRGBToText(card, "3px 0 #ff0000, -3px 0 #00ffff");
          },
        })
        .to(card, {
          duration: 0.2,
          ease: "power2.out",
          onStart: function () {
            removeRGBFromText(card);
          },
        });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) {
      onClose();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onClose,
      });

      // Glitch out sequence
      tl.to(card, {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-6, 6),
        rotate: () => gsap.utils.random(-3, 3),
        skewX: () => gsap.utils.random(-10, 10),
        filter: "blur(5px) saturate(3)",
        duration: 0.05,
        ease: "none",
        onStart: function () {
          applyRGBToText(
            card,
            "12px 0 #00ffff, -12px 0 #ff0000, 0 6px #ff00ff",
          );
        },
      })
        .to(card, {
          x: () => gsap.utils.random(-25, 25),
          y: () => gsap.utils.random(-8, 8),
          rotate: () => gsap.utils.random(-4, 4),
          skewX: () => gsap.utils.random(-12, 12),
          filter: "blur(8px) saturate(3)",
          duration: 0.05,
          ease: "none",
          onStart: function () {
            applyRGBToText(
              card,
              "-10px 0 #ff00ff, 10px 0 #00ff00, 0 5px #ffff00",
            );
          },
        })
        .to(card, {
          opacity: 0,
          scale: 0.9,
          filter: "blur(20px)",
          x: 0,
          y: 0,
          rotate: 0,
          skewX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.2",
        );
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/90 backdrop-blur-lg overflow-y-auto"
      onClick={handleClose}
    >
      {/* Cyber grid background */}
      <div className="cyber-grid absolute inset-0 opacity-10" />

      {/* Data particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="data-particle hidden sm:block"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${20 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div
        ref={cardRef}
        className="relative bg-background border-2 border-primary/50 rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing header bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-slow" />

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-primary" />

        {/* Close button - Touch friendly size */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-lg border border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/20 hover:border-primary transition-all duration-200 group min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-h-[calc(100vh-24px)] overflow-y-auto">
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 text-primary/60 font-mono text-xs mb-2 sm:mb-4">
            <LucideIcons.Terminal className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse-fast" />
            <span className="text-[10px] sm:text-xs">
              &gt; NEXIAN_PROFILE_LOADED
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Avatar with cyber frame */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-primary rounded-full opacity-75 blur animate-pulse-slow" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary overflow-hidden bg-primary/10">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User
                      className="w-12 h-12 sm:w-14 sm:h-14 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <LucideIcons.Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-background animate-pulse-fast" />
              </div>
            </div>

            {/* Name and role */}
            <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-1 justify-center sm:justify-start">
                <LucideIcons.Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60" />
                <h3 className="text-2xl sm:text-3xl font-black font-mono text-foreground truncate max-w-full">
                  {member.name}
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <div className="inline-block px-3 py-1.5 bg-primary/10 border border-primary/30 rounded font-mono text-xs sm:text-sm text-primary">
                  {currentRole?.role || "Team Member"}
                  {currentRole?.isLead && (
                    <span className="ml-2 text-secondary">★ LEAD</span>
                  )}
                </div>
                <div className="inline-block px-3 py-1.5 bg-secondary/10 border border-secondary/30 rounded font-mono text-[10px] sm:text-xs text-secondary/80">
                  {currentDepartment.name}
                </div>
              </div>
            </div>
          </div>

          {/* Quote section with cyberpunk styling */}
          {member.bio && (
            <div className="relative p-3 sm:p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-l-2 border-primary rounded-r-lg">
              <LucideIcons.Quote className="absolute top-2 left-2 w-5 h-5 sm:w-6 sm:h-6 text-primary/20" />
              <div className="pl-5 sm:pl-6">
                <p className="text-foreground/90 italic leading-relaxed font-mono text-xs sm:text-sm">
                  <span className="text-primary/60">&gt;_</span> {member.bio}
                </p>
              </div>
              <div className="absolute bottom-2 right-2">
                <LucideIcons.Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary/20 rotate-180" />
              </div>
            </div>
          )}

          {/* Department Roles Section */}
          {member.departmentRoles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-primary font-mono text-xs sm:text-sm font-bold">
                  // NEXUS_ROLES
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {member.departmentRoles.map((deptRole) => {
                  const dept = allDepartments.find(
                    (d) => d.id === deptRole.departmentId,
                  );
                  if (!dept) return null;

                  const IconComponent =
                    (LucideIcons as any)[dept.icon] || LucideIcons.Box;

                  return (
                    <div
                      key={deptRole.departmentId}
                      className="relative group p-3 rounded-lg bg-muted/30 border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    >
                      {/* Glitch effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded bg-primary/10 text-primary flex-shrink-0">
                          <IconComponent
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate">
                            {deptRole.role}
                            {deptRole.isLead && (
                              <span className="ml-1 sm:ml-2 text-secondary">
                                ★
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                            {dept.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social Links */}
          {member.socialLinks && member.socialLinks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-primary font-mono text-xs sm:text-sm font-bold">
                  // CONNECT
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                {member.socialLinks.map((social, index) => {
                  const SocialIcon =
                    typeof social.icon === "string"
                      ? (LucideIcons as any)[social.icon]
                      : social.icon;

                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-2.5 sm:p-3 border border-primary/30 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-200 overflow-hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={social.label}
                    >
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                      {SocialIcon && (
                        <SocialIcon className="relative w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Terminal-style footer */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-primary/40 font-mono text-[10px] sm:text-xs pt-3 sm:pt-4 border-t border-primary/20">
            <div className="flex items-center gap-2">
              <LucideIcons.Terminal className="w-3 h-3" />
              <span>
                &gt; MEMBER_ID: #{member.id.toString().padStart(3, "0")}
              </span>
            </div>
            <div className="flex-1 hidden sm:block" />
            <span className="text-green-500 animate-pulse-fast">● ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
