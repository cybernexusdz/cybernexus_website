import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import CyberCard from "@/components/ui/CyberCard";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Circle,
  Play,
  Lock,
  ArrowRight,
  Zap,
  Star,
  ChevronRight,
  UserPlus,
} from "lucide-react";

export type SessionStatus = "completed" | "current" | "upcoming" | "locked";

export interface WorkshopSession {
  id: number;
  sessionNumber: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  topics: string[];
  status: SessionStatus;
  attendees?: number;
  resources?: string[];
}

export interface WorkshopWithSessions {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  tags: string[];
  totalSessions: number;
  completedSessions: number;
  sessions: WorkshopSession[];
}

interface WorkshopSessionsModalProps {
  workshop: WorkshopWithSessions;
  onClose: () => void;
  onEnroll?: () => void;
  categoryColor: string;
  categoryBgColor: string;
  categoryBorderColor: string;
  categoryIcon: React.ElementType;
  glowColor: "primary" | "secondary" | "cyan" | "purple" | "pink";
}

const getSessionStatusConfig = (status: SessionStatus) => {
  switch (status) {
    case "completed":
      return {
        icon: CheckCircle2,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        lineColor: "bg-green-500/50",
        dotColor: "bg-green-400",
        label: "Completed",
      };
    case "current":
      return {
        icon: Play,
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/30",
        lineColor: "bg-primary/50",
        dotColor: "bg-primary",
        label: "Current Session",
      };
    case "upcoming":
      return {
        icon: Circle,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        lineColor: "bg-foreground/10",
        dotColor: "bg-yellow-400",
        label: "Upcoming",
      };
    case "locked":
      return {
        icon: Lock,
        color: "text-foreground/30",
        bg: "bg-foreground/5",
        border: "border-foreground/10",
        lineColor: "bg-foreground/10",
        dotColor: "bg-foreground/20",
        label: "Locked",
      };
  }
};

const WorkshopSessionsModal: React.FC<WorkshopSessionsModalProps> = ({
  workshop,
  onClose,
  onEnroll,
  categoryColor,
  categoryBgColor,
  categoryBorderColor,
  categoryIcon: CategoryIcon,
  glowColor,
}) => {
  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const progressPercent =
    (workshop.completedSessions / workshop.totalSessions) * 100;

  // Split sessions
  const completedSessions = workshop.sessions.filter(
    (s) => s.status === "completed",
  );
  const currentSession = workshop.sessions.find(
    (s) => s.status === "current",
  );
  const upcomingSessions = workshop.sessions.filter(
    (s) => s.status === "upcoming" || s.status === "locked",
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="cyber-scanlines absolute inset-0" />
      </div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl mx-4 max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        <CyberCard
          variant="bordered"
          glowColor={glowColor}
          className={`${categoryBorderColor} overflow-hidden`}
        >
          <div className="relative z-10">
            {/* ===== HEADER ===== */}
            <div className="p-6 pb-4 border-b border-foreground/10">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Workshop Info */}
              <div className="flex items-start gap-4 pr-10">
                <div
                  className={`w-12 h-12 rounded-lg ${categoryBgColor} border ${categoryBorderColor} flex items-center justify-center shrink-0`}
                >
                  <CategoryIcon className={`w-6 h-6 ${categoryColor}`} />
                </div>
                <div className="space-y-2 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-black text-foreground font-mono leading-tight">
                    {workshop.title}
                  </h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-foreground/60 font-mono flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {workshop.instructor}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs font-mono ${categoryBgColor} ${categoryColor} ${categoryBorderColor}`}
                    >
                      {workshop.level}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-foreground/50">
                  <span>
                    Course Progress:{" "}
                    <span className="text-primary">
                      {workshop.completedSessions}/{workshop.totalSessions}
                    </span>{" "}
                    sessions
                  </span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="relative h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                  {/* Animated glow on progress tip */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/80 blur-sm animate-pulse"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ===== SESSIONS TIMELINE ===== */}
            <div className="overflow-y-auto max-h-[55vh] p-6 space-y-2 custom-scrollbar">
              {/* Completed Sessions Header */}
              {completedSessions.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-green-400 uppercase tracking-wider">
                    Completed Sessions
                  </span>
                  <div className="flex-1 h-px bg-green-500/20" />
                </div>
              )}

              {/* Completed Sessions */}
              {completedSessions.map((session, index) => {
                const statusConfig = getSessionStatusConfig(session.status);
                const StatusIcon = statusConfig.icon;
                const isLast = index === completedSessions.length - 1 && !currentSession && upcomingSessions.length === 0;

                return (
                  <div key={session.id} className="relative flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${statusConfig.bg} border ${statusConfig.border} flex items-center justify-center shrink-0 z-10`}
                      >
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[16px] ${statusConfig.lineColor}`} />
                      )}
                    </div>

                    {/* Session Card */}
                    <div className="flex-1 pb-4 group">
                      <div className={`p-4 rounded-lg ${statusConfig.bg} border ${statusConfig.border} transition-all duration-300 hover:scale-[1.01]`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-foreground/40">
                              Session {session.sessionNumber}
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-mono ${statusConfig.color} ${statusConfig.border} ${statusConfig.bg}`}
                            >
                              {statusConfig.label}
                            </Badge>
                          </div>
                          {session.attendees && (
                            <span className="text-xs font-mono text-foreground/40 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {session.attendees}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-foreground/80 font-mono mb-1">
                          {session.title}
                        </h4>

                        <p className="text-xs text-foreground/50 mb-2 leading-relaxed">
                          {session.description}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-foreground/40 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.time} · {session.duration}
                          </span>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {session.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-foreground/5 text-foreground/40 border border-foreground/5"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* Resources */}
                        {session.resources && session.resources.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-green-400/60 font-mono">
                            <ChevronRight className="w-3 h-3" />
                            {session.resources.length} resource{session.resources.length > 1 ? "s" : ""} available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Current Session Header */}
              {currentSession && (
                <div className="flex items-center gap-2 mb-3 mt-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    Current Session
                  </span>
                  <div className="flex-1 h-px bg-primary/20" />
                </div>
              )}

              {/* Current Session */}
              {currentSession && (() => {
                const statusConfig = getSessionStatusConfig(currentSession.status);
                const StatusIcon = statusConfig.icon;
                const isLast = upcomingSessions.length === 0;

                return (
                  <div className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${statusConfig.bg} border-2 ${statusConfig.border} flex items-center justify-center shrink-0 z-10 animate-pulse shadow-lg shadow-primary/20`}
                      >
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[16px] ${statusConfig.lineColor}`} />
                      )}
                    </div>

                    {/* Current Session Card - Highlighted */}
                    <div className="flex-1 pb-4">
                      <div className={`p-4 rounded-lg bg-primary/10 border-2 border-primary/40 relative overflow-hidden`}>
                        {/* Animated glow border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse pointer-events-none" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-foreground/50">
                                Session {currentSession.sessionNumber}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-[10px] font-mono text-primary border-primary/30 bg-primary/10"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1 inline-block" />
                                In Progress
                              </Badge>
                            </div>
                          </div>

                          <h4 className="text-base font-bold text-foreground font-mono mb-1">
                            {currentSession.title}
                          </h4>

                          <p className="text-sm text-foreground/60 mb-3 leading-relaxed">
                            {currentSession.description}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-foreground/50 font-mono mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {currentSession.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {currentSession.time} · {currentSession.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {currentSession.location}
                            </span>
                          </div>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {currentSession.topics.map((topic, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary/70 border border-primary/20"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>

                          {/* Join button */}
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-mono font-bold text-xs hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                            <Zap className="w-3.5 h-3.5" />
                            Join Session
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Upcoming Sessions Header */}
              {upcomingSessions.length > 0 && (
                <div className="flex items-center gap-2 mb-3 mt-2">
                  <Circle className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                    Upcoming Sessions
                  </span>
                  <div className="flex-1 h-px bg-yellow-500/20" />
                </div>
              )}

              {/* Upcoming Sessions */}
              {upcomingSessions.map((session, index) => {
                const statusConfig = getSessionStatusConfig(session.status);
                const StatusIcon = statusConfig.icon;
                const isLast = index === upcomingSessions.length - 1;

                return (
                  <div key={session.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${statusConfig.bg} border ${statusConfig.border} flex items-center justify-center shrink-0 z-10`}
                      >
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[16px] ${statusConfig.lineColor}`} />
                      )}
                    </div>

                    {/* Session Card */}
                    <div className="flex-1 pb-4">
                      <div
                        className={`p-4 rounded-lg ${statusConfig.bg} border ${statusConfig.border} transition-all duration-300 ${
                          session.status === "locked" ? "opacity-60" : "hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-foreground/40">
                              Session {session.sessionNumber}
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-mono ${statusConfig.color} ${statusConfig.border} ${statusConfig.bg}`}
                            >
                              {statusConfig.label}
                            </Badge>
                          </div>
                        </div>

                        <h4
                          className={`text-sm font-bold font-mono mb-1 ${
                            session.status === "locked"
                              ? "text-foreground/30"
                              : "text-foreground/70"
                          }`}
                        >
                          {session.title}
                        </h4>

                        <p
                          className={`text-xs mb-2 leading-relaxed ${
                            session.status === "locked"
                              ? "text-foreground/20"
                              : "text-foreground/50"
                          }`}
                        >
                          {session.description}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-foreground/40 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.time} · {session.duration}
                          </span>
                        </div>

                        {/* Topics */}
                        {session.status !== "locked" && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {session.topics.map((topic, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-foreground/5 text-foreground/30 border border-foreground/5"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== FOOTER ===== */}
            <div className="p-4 border-t border-foreground/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {workshop.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-foreground/5 text-foreground/40 border border-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onEnroll && (
                  <button
                    onClick={onEnroll}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-mono font-bold text-xs hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Enroll
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground/60 font-mono text-xs hover:bg-foreground/10 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </CyberCard>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(var(--primary) / 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(var(--primary) / 0.5);
        }
      `}</style>
    </div>
  );
};

export default WorkshopSessionsModal;
