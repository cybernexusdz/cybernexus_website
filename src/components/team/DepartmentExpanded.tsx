import React, { useMemo, useState, useEffect } from "react";
import { Department, TeamMember } from "@/types/team.types";
import MemberNode from "./MemberNode";
import NetworkConnections from "./NetworkConnections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Terminal } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

interface DepartmentExpandedProps {
  department: Department;
  departmentMembers: Array<
    TeamMember & { roleInDepartment: string; isLeadInDepartment: boolean }
  >;
  onBack: () => void;
  onSelectMember: (memberId: number) => void;
}

const DESKTOP_QUERY = "(min-width: 1024px)";
const TABLET_QUERY = "(min-width: 640px)";

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
  const badgeRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.2,
    once: true,
  });

  const titleRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.3,
    once: true,
  });

  const descriptionRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.4,
    once: true,
  });

  const actionsRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.5,
    once: true,
  });

  const networkRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.4,
    delay: 0.6,
    once: true,
  });

  const [isHorizontal, setIsHorizontal] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });

  const [isTablet, setIsTablet] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(TABLET_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(DESKTOP_QUERY);
    const mqTablet = window.matchMedia(TABLET_QUERY);

    const handler = (ev: MediaQueryListEvent | MediaQueryList) => {
      setIsHorizontal(ev.matches);
    };

    const tabletHandler = (ev: MediaQueryListEvent | MediaQueryList) => {
      setIsTablet(ev.matches);
    };

    handler(mq);
    tabletHandler(mqTablet);

    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler);
      mqTablet.addEventListener("change", tabletHandler);
    } else {
      // @ts-ignore
      mq.addListener(handler);
      mqTablet.addListener(tabletHandler);
    }

    return () => {
      if ("removeEventListener" in mq) {
        mq.removeEventListener("change", handler);
        mqTablet.removeEventListener("change", tabletHandler);
      } else {
        // @ts-ignore
        mq.removeListener(handler);
        mqTablet.removeListener(tabletHandler);
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

    const availableSpan = isHorizontal ? 60 : isTablet ? 70 : 78;
    const maxSpacing = isHorizontal ? 22 : isTablet ? 30 : 38;
    const spacing =
      numLayers <= 1
        ? 0
        : Math.min(maxSpacing, availableSpan / Math.max(numLayers - 1, 1));

    const startMain = centerPct - ((numLayers - 1) * spacing) / 2;

    layerGroups.forEach((layer, layerIdx) => {
      const layerCount = Math.max(layer.length, 1);

      const crossAvailableSpan = isHorizontal ? 70 : isTablet ? 75 : 82;
      const maxCrossSpacing = isHorizontal ? 25 : isTablet ? 32 : 42;
      const crossSpacing =
        layerCount <= 1
          ? 0
          : Math.min(
              maxCrossSpacing,
              crossAvailableSpan / Math.max(layerCount - 1, 1),
            );

      const startCross = centerPct - ((layerCount - 1) * crossSpacing) / 2;
      const mainPos = clamp(startMain + layerIdx * spacing, 8, 92);

      layer.forEach((id, idx) => {
        const crossPos = clamp(startCross + idx * crossSpacing, 8, 92);
        if (isHorizontal) {
          positions.push({ id, x: mainPos, y: crossPos });
        } else {
          positions.push({ id, x: crossPos, y: mainPos });
        }
      });
    });

    return { memberPositions: positions, layers: layerGroups };
  }, [departmentMembers, isHorizontal, isTablet]);

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
    <section className="relative min-h-screen py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Badge */}
          <div ref={badgeRef} className="flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs"
            >
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-pulse-fast" />
              &lt;DEPARTMENT_VIEW /&gt;
            </Badge>
          </div>

          {/* Department title */}
          <div ref={titleRef}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
              <div className="text-primary flex-shrink-0">
                <IconComponent
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  {department.name}
                </span>
              </h1>
            </div>
          </div>

          {/* Description */}
          <div ref={descriptionRef}>
            <p className="text-sm sm:text-base lg:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed font-mono px-4">
              <span className="text-primary animate-pulse-slow">&gt;_</span>{" "}
              {department.description}
            </p>
          </div>

          {/* Back button and Member count */}
          <div ref={actionsRef}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <Button
                onClick={onBack}
                className="font-mono text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                BACK
              </Button>

              <Badge
                variant="outline"
                className="border-primary/50 bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-2.5 font-mono text-xs w-full sm:w-auto justify-center"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 inline" />
                {departmentMembers.length} MEMBER
                {departmentMembers.length !== 1 ? "S" : ""}
              </Badge>
            </div>
          </div>
        </div>

        <div
          ref={networkRef}
          className="relative w-full h-[600px] sm:h-[700px] md:h-[650px] lg:h-[600px]"
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
