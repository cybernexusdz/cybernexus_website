import React, { useMemo } from "react";
import { Department, TeamMember } from "@/types/team.types";
import DepartmentNode from "./DepartmentNode";
import NetworkConnections from "./NetworkConnections";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowLeft } from "lucide-react";
import LogoIcon from "../ui/LogoIcon";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";
import GridBackground from "../ui/GridBackground";

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
  const backButtonRef = useCyberScrollAnimation({
    animation: "cyberGlitchLeft",
    duration: 0.8,
    delay: 0.1,
  });

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

  // Calculate positions for departments in a circular layout
  const nodePositions = useMemo(() => {
    const centerX = 50;
    const centerY = 50;

    // Adjust radius based on number of departments for better spacing
    const radius =
      departments.length <= 3 ? 25 : departments.length <= 5 ? 30 : 35;

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

  // Calculate dynamic height based on number of departments
  const getContainerHeight = () => {
    if (departments.length <= 2) return "450px";
    if (departments.length <= 4) return "550px";
    return "650px";
  };

  return (
    <section className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-background overflow-hidden">
      {/* <GridBackground /> */}

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header Section - More compact */}
        <div className="text-center space-y-4">
          {/* Badge - CENTER GLITCH with RGB */}
          <div ref={badgeRef} className="flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono"
            >
              <Terminal className="w-4 h-4 mr-2 inline animate-pulse-fast" />
              &lt;MEET_THE_TEAM /&gt;
            </Badge>
          </div>

          {/* Title - CENTER GLITCH with RGB */}
          <div ref={headerRef}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono leading-tight">
              <span className="text-primary/60">&gt;</span> The{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                Nexus
              </span>{" "}
              Network
            </h1>
          </div>

          {/* Description - CENTER GLITCH with RGB */}
          <div ref={descriptionRef}>
            <p className="text-base text-foreground/80 max-w-2xl mx-auto leading-relaxed font-mono">
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
            maxWidth: departments.length <= 3 ? "600px" : "100%",
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

          {/* Center logo - Scaled based on department count */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div
              className={`relative flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-full border-2 border-primary/30 shadow-2xl backdrop-blur-sm ${
                departments.length <= 2
                  ? "w-28 h-28 sm:w-32 sm:h-32"
                  : "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44"
              }`}
            >
              <svg
                className={`fill-primary ${
                  departments.length <= 2
                    ? "w-16 h-16 sm:w-20 sm:h-20"
                    : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 340.38 400.79"
              >
                <LogoIcon />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats footer - Optional, shows department count */}
        <div ref={footerRef} className="flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 border border-primary/30 rounded-lg bg-background/50 backdrop-blur-sm font-mono text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-fast" />
              <span className="text-foreground/80">
                {departments.length}{" "}
                {departments.length === 1 ? "Department" : "Departments"}
              </span>
            </div>
            <div className="w-px h-4 bg-primary/30" />
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
