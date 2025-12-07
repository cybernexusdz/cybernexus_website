import React, { useMemo, useState, useEffect } from "react";
import { Department, TeamMember } from "@/types/team.types";
import MemberNode from "./MemberNode";
import NetworkConnections from "./NetworkConnections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Terminal } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";
import GridBackground from "../ui/GridBackground";

interface DepartmentExpandedProps {
  department: Department;
  departmentMembers: Array<
    TeamMember & { roleInDepartment: string; isLeadInDepartment: boolean }
  >;
  onBack: () => void;
  onSelectMember: (memberId: number) => void;
}

const DESKTOP_QUERY = "(min-width: 1024px)";
const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

const DepartmentExpanded: React.FC<DepartmentExpandedProps> = ({
  department,
  departmentMembers,
  onBack,
  onSelectMember,
}) => {
  const IconComponent =
    (LucideIcons as any)[department.icon] || LucideIcons.Box;

  // Animation refs with RGB CHROMATIC ABERRATION glitch effects
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
    duration: 1.4,
    delay: 0.5,
  });

  const footerRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.6,
  });

  const [isHorizontal, setIsHorizontal] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (ev: MediaQueryListEvent | MediaQueryList) => {
      setIsHorizontal(ev.matches);
    };
    handler(mq);
    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler);
    } else {
      // @ts-ignore
      mq.addListener(handler);
    }
    return () => {
      if ("removeEventListener" in mq) {
        mq.removeEventListener("change", handler);
      } else {
        // @ts-ignore
        mq.removeListener(handler);
      }
    };
  }, []);

  const { memberPositions, layers } = useMemo(() => {
    const members = departmentMembers;
    const centerPct = 50;

    if (!members || members.length === 0)
      return { memberPositions: [], layers: [] };

    if (members.length === 1) {
      return {
        memberPositions: [{ id: members[0].id, x: centerPct, y: centerPct }],
        layers: [[members[0].id]],
      };
    }

    const leads = members.filter((m) => m.isLeadInDepartment);
    const regulars = members.filter((m) => !m.isLeadInDepartment);
    const layerGroups: number[][] = [];

    if (leads.length > 0) {
      layerGroups.push(leads.map((l) => l.id));
    }

    if (regulars.length > 0) {
      const membersPerLayer = Math.ceil(Math.sqrt(regulars.length * 1.2));
      const numLayers = Math.ceil(regulars.length / membersPerLayer);
      for (let layerIdx = 0; layerIdx < numLayers; layerIdx++) {
        const layerStart = layerIdx * membersPerLayer;
        const layerEnd = Math.min(
          layerStart + membersPerLayer,
          regulars.length,
        );
        const layerMembers = regulars.slice(layerStart, layerEnd);
        layerGroups.push(layerMembers.map((m) => m.id));
      }
    }

    const positions: Array<{ id: number; x: number; y: number }> = [];
    const numLayers = layerGroups.length;

    // Increased spacing significantly for mobile to prevent overlap with larger nodes
    const availableSpan = isHorizontal ? 60 : 75;
    const maxSpacing = isHorizontal ? 22 : 35;
    const spacing =
      numLayers <= 1
        ? 0
        : Math.min(maxSpacing, availableSpan / Math.max(numLayers - 1, 1));
    const startMain = centerPct - ((numLayers - 1) * spacing) / 2;

    layerGroups.forEach((layer, layerIdx) => {
      const layerCount = Math.max(layer.length, 1);

      // Significantly increased cross spacing to prevent overlap between nodes in same layer
      const crossAvailableSpan = isHorizontal ? 70 : 80;
      const maxCrossSpacing = isHorizontal ? 25 : 38;
      const crossSpacing =
        layerCount <= 1
          ? 0
          : Math.min(
              maxCrossSpacing,
              crossAvailableSpan / Math.max(layerCount - 1, 1),
            );
      const startCross = centerPct - ((layerCount - 1) * crossSpacing) / 2;
      const mainPos = clamp(startMain + layerIdx * spacing, 5, 95);

      layer.forEach((id, idx) => {
        const crossPos = clamp(startCross + idx * crossSpacing, 5, 95);
        if (isHorizontal) {
          positions.push({ id, x: mainPos, y: crossPos });
        } else {
          positions.push({ id, x: crossPos, y: mainPos });
        }
      });
    });

    return { memberPositions: positions, layers: layerGroups };
  }, [departmentMembers, isHorizontal]);

  const connections = useMemo(() => {
    const conns: Array<{ from: number; to: number }> = [];

    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
      const currentLayer = layers[layerIdx];
      const nextLayer = layers[layerIdx + 1];
      const currentSize = currentLayer.length;
      const nextSize = nextLayer.length;

      if (currentSize <= 4 && nextSize <= 4) {
        currentLayer.forEach((fromId) => {
          nextLayer.forEach((toId) => {
            conns.push({ from: fromId, to: toId });
          });
        });
      } else {
        currentLayer.forEach((fromId, fromIdx) => {
          const connectionsPerNode = Math.min(4, nextSize);
          for (let i = 0; i < connectionsPerNode; i++) {
            const targetIdx =
              Math.floor(
                (fromIdx / Math.max(currentSize, 1)) * nextSize +
                  (i * nextSize) / connectionsPerNode,
              ) % nextSize;
            const toId = nextLayer[targetIdx];
            conns.push({ from: fromId, to: toId });
          }
        });

        const randomConnections = Math.floor(currentSize * 0.1);
        for (let i = 0; i < randomConnections; i++) {
          const fromId = currentLayer[Math.floor(Math.random() * currentSize)];
          const toId = nextLayer[Math.floor(Math.random() * nextSize)];
          conns.push({ from: fromId, to: toId });
        }
      }
    }

    return conns;
  }, [layers]);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Back button - LEFT GLITCH with RGB */}
        <div ref={backButtonRef}>
          <Button
            variant="outline"
            onClick={onBack}
            className="font-mono border-primary/50 bg-background/80 hover:bg-primary/90 hover:text-primary-foreground transition-all duration-200 backdrop-blur-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-6">
          {/* Badge - CENTER GLITCH with RGB */}
          <div ref={badgeRef} className="flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono"
            >
              <Terminal className="w-4 h-4 mr-2 animate-pulse-fast" />
              &lt;DEPARTMENT_VIEW /&gt;
            </Badge>
          </div>

          {/* Department title - CENTER GLITCH with RGB */}
          <div ref={headerRef}>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="text-primary">
                <IconComponent
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-mono leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  {department.name}
                </span>
              </h1>
            </div>
          </div>

          {/* Description - CENTER GLITCH with RGB */}
          <div ref={descriptionRef}>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed font-mono">
              <span className="text-primary animate-pulse-slow">&gt;_</span>{" "}
              {department.description}
            </p>

            {/* Member count badge */}
            <div className="mt-4">
              <Badge
                variant="outline"
                className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono"
              >
                <Users className="w-4 h-4 mr-2 inline" />
                {departmentMembers.length} MEMBER
                {departmentMembers.length !== 1 ? "S" : ""}
              </Badge>
            </div>
          </div>
        </div>

        <div
          ref={networkRef}
          className="relative w-full h-[750px] sm:h-[800px] md:h-[600px]"
        >
          {/* Connection lines */}
          <NetworkConnections
            nodes={memberPositions}
            connections={connections}
            animated={true}
          />

          {/* Member nodes */}
          {departmentMembers.map((member) => {
            const pos = memberPositions.find((p) => p.id === member.id);
            if (!pos) return null;

            return (
              <MemberNode
                key={member.id}
                member={member}
                roleInDepartment={member.roleInDepartment}
                isLead={member.isLeadInDepartment}
                onClick={() => onSelectMember(member.id)}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentExpanded;
