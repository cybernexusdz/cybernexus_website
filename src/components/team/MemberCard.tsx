import React from "react";
import { TeamMember, Department } from "@/types/team.types";
import { X, User } from "lucide-react";
import * as LucideIcons from "lucide-react";

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
  // Get current department role
  const currentRole = member.departmentRoles.find(
    (dr) => dr.departmentId === currentDepartment.id,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Cyber grid background */}
      <div className="cyber-grid absolute inset-0 opacity-10" />

      {/* Data particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="data-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${20 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div
        className="relative bg-background border-2 border-primary/50 rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing header bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-slow" />

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg border border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/20 hover:border-primary transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-8 space-y-6">
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 text-primary/60 font-mono text-xs mb-4">
            <LucideIcons.Terminal className="w-4 h-4 animate-pulse-fast" />
            <span>&gt; NEXIAN_PROFILE_LOADED</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          {/* Profile Header */}
          <div className="flex items-start gap-6">
            {/* Avatar with cyber frame */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-primary rounded-full opacity-75 blur animate-pulse-slow" />
              <div className="relative w-28 h-28 rounded-full border-2 border-primary overflow-hidden bg-primary/10">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User
                      className="w-14 h-14 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <LucideIcons.Zap className="w-3 h-3 text-background animate-pulse-fast" />
              </div>
            </div>

            {/* Name and role */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <LucideIcons.Code2 className="w-5 h-5 text-primary/60" />
                <h3 className="text-3xl font-black font-mono text-foreground truncate">
                  {member.name}
                </h3>
              </div>

              <div className="space-y-2 mt-3">
                <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded font-mono text-sm text-primary">
                  {currentRole?.role || "Team Member"}
                  {currentRole?.isLead && (
                    <span className="ml-2 text-secondary">★ LEAD</span>
                  )}
                </div>
                <div className="inline-block ml-2 px-3 py-1 bg-secondary/10 border border-secondary/30 rounded font-mono text-xs text-secondary/80">
                  {currentDepartment.name}
                </div>
              </div>
            </div>
          </div>

          {/* Quote section with cyberpunk styling */}
          {member.bio && (
            <div className="relative p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-l-2 border-primary rounded-r-lg">
              <LucideIcons.Quote className="absolute top-2 left-2 w-6 h-6 text-primary/20" />
              <div className="pl-6">
                <p className="text-foreground/90 italic leading-relaxed font-mono text-sm">
                  <span className="text-primary/60">&gt;_</span> {member.bio}
                </p>
              </div>
              <div className="absolute bottom-2 right-2">
                <LucideIcons.Quote className="w-6 h-6 text-primary/20 rotate-180" />
              </div>
            </div>
          )}

          {/* Department Roles Section */}
          {member.departmentRoles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-primary font-mono text-sm font-bold">
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

                      <div className="relative flex items-center gap-3">
                        <div className="p-2 rounded bg-primary/10 text-primary">
                          <IconComponent
                            className="w-4 h-4"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground font-mono truncate">
                            {deptRole.role}
                            {deptRole.isLead && (
                              <span className="ml-2 text-secondary">★</span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
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
                <div className="text-primary font-mono text-sm font-bold">
                  // CONNECT
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              </div>

              <div className="flex gap-3">
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
                      className="group relative p-3 border border-primary/30 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-200 overflow-hidden"
                      aria-label={social.label}
                    >
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                      {SocialIcon && (
                        <SocialIcon className="relative w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Terminal-style footer */}
          <div className="flex items-center gap-2 text-primary/40 font-mono text-xs pt-4 border-t border-primary/20">
            <LucideIcons.Terminal className="w-3 h-3" />
            <span>
              &gt; MEMBER_ID: #{member.id.toString().padStart(3, "0")}
            </span>
            <div className="flex-1" />
            <span className="text-green-500 animate-pulse-fast">● ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
