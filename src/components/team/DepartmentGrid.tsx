import React, { useMemo } from "react";
import { Department, TeamMember } from "@/types/team.types";
import DepartmentNode from "./DepartmentNode";
import NetworkConnections from "./NetworkConnections";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import LogoIcon from "../ui/LogoIcon";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

interface DepartmentGridProps {
  departments: Department[];
  teamMembers: TeamMember[];
  onSelectDepartment: (id: string) => void;
  onBack?: () => void;
}

const DepartmentGrid: React.FC<DepartmentGridProps> = ({
  departments,
  teamMembers,
  onSelectDepartment,
}) => {
  // Animation refs
  const badgeRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.2,
  });

  const headerRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.3,
  });

  const descriptionRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.4,
  });

  const networkRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.5,
  });

  const footerRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.6,
  });

  // Calculate positions for departments in a circular layout with better mobile spacing
  const nodePositions = useMemo(() => {
    const centerX = 50;
    const centerY = 50;

    // Dynamic radius based on number of departments and screen size
    let radius: number;
    if (departments.length <= 2) {
      radius = 28;
    } else if (departments.length <= 4) {
      radius = 32;
    } else if (departments.length <= 6) {
      radius = 36;
    } else {
      radius = 38;
    }

    // Add center node for logo
    const positions = [{ id: "center", x: centerX, y: centerY }];

    departments.forEach((dept, index) => {
      const angle = (index / departments.length) * 2 * Math.PI - Math.PI / 2;
      positions.push({
        id: dept.id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    });

    return positions;
  }, [departments]);

  // Build hub-spoke connections: center to all departments + ring connections
  const connections = useMemo(() => {
    const conns: Array<{ from: string; to: string }> = [];

    // Connect center to all departments (hub-spoke pattern)
    departments.forEach((dept) => {
      conns.push({ from: "center", to: dept.id });
    });

    // Only add ring connections if there are 3+ departments
    if (departments.length >= 3) {
      departments.forEach((dept, index) => {
        const nextIndex = (index + 1) % departments.length;
        const nextDept = departments[nextIndex];
        conns.push({ from: dept.id, to: nextDept.id });
      });
    }

    // Optional: Connect to department across the circle for more complexity
    if (departments.length > 4) {
      departments.forEach((dept, index) => {
        const oppositeIndex =
          (index + Math.floor(departments.length / 2)) % departments.length;
        const oppositeDept = departments[oppositeIndex];
        conns.push({ from: dept.id, to: oppositeDept.id });
      });
    }

    return conns;
  }, [departments]);

  // Count members per department
  const getMemberCount = (deptId: string) => {
    return teamMembers.filter((member) =>
      member.departmentRoles.some((dr) => dr.departmentId === deptId),
    ).length;
  };

  // Calculate dynamic height based on number of departments - better mobile scaling
  const getContainerHeight = () => {
    if (departments.length <= 2) return "400px";
    if (departments.length <= 4) return "500px";
    if (departments.length <= 6) return "580px";
    return "650px";
  };

  return (
    <section className="relative min-h-screen py-10 sm:py-12 px-3 sm:px-6 lg:px-10 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Header Section - More compact on mobile */}
        <div className="text-center space-y-3 sm:space-y-4">
          {/* Badge - CENTER GLITCH with RGB */}
          <div ref={badgeRef} className="flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs"
            >
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 inline animate-pulse-fast" />
              &lt;MEET_THE_TEAM /&gt;
            </Badge>
          </div>

          {/* Title - CENTER GLITCH with RGB */}
          <div ref={headerRef}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono leading-tight px-4">
              <span className="text-primary/60">&gt;</span> The{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                Nexus
              </span>{" "}
              Network
            </h1>
          </div>

          {/* Description - CENTER GLITCH with RGB */}
          <div ref={descriptionRef}>
            <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mx-auto leading-relaxed font-mono px-4">
              <span className="text-primary animate-pulse-slow">&gt;_</span>{" "}
              Click on any department node to explore the team members and their
              connections
            </p>
          </div>
        </div>

        {/* Department nodes with connections - CENTER GLITCH with RGB */}
        <div
          ref={networkRef}
          className="relative w-full mx-auto"
          style={{
            height: getContainerHeight(),
            maxWidth: departments.length <= 3 ? "550px" : "100%",
          }}
        >
          {/* Connection lines */}
          <NetworkConnections
            nodes={nodePositions}
            connections={connections}
            animated={true}
          />

          {/* Department nodes */}
          {departments.map((dept, index) => {
            const pos = nodePositions[index + 1]; // +1 because center is at index 0
            return (
              <DepartmentNode
                key={dept.id}
                department={dept}
                memberCount={getMemberCount(dept.id)}
                onClick={() => onSelectDepartment(dept.id)}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              />
            );
          })}

          {/* Center logo - Better mobile scaling */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div
              className={`relative flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-full border-2 border-primary/30 shadow-2xl backdrop-blur-sm ${
                departments.length <= 2
                  ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                  : "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44"
              }`}
            >
              <svg
                className={`fill-primary ${
                  departments.length <= 2
                    ? "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 340.38 400.79"
              >
                <LogoIcon />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats footer - Better mobile layout */}
        <div ref={footerRef} className="flex justify-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 border border-primary/30 rounded-lg bg-background/50 backdrop-blur-sm font-mono text-xs sm:text-sm w-full sm:w-auto max-w-sm sm:max-w-none">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-fast" />
              <span className="text-foreground/80">
                {departments.length}{" "}
                {departments.length === 1 ? "Department" : "Departments"}
              </span>
            </div>
            <div className="w-full sm:w-px h-px sm:h-4 bg-primary/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-fast" />
              <span className="text-foreground/80">
                {teamMembers.length}{" "}
                {teamMembers.length === 1 ? "Member" : "Members"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentGrid;
