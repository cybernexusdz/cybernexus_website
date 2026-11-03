import React, { useMemo, useState, useEffect } from "react";
import { Department, LeadershipRank, TeamMember } from "@/types/team.types";
import MemberNode from "./MemberNode";
import NetworkConnections from "./NetworkConnections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Terminal, Crown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

type EnrichedDepartmentMember = TeamMember & {
  roleInDepartment: string;
  isLeadInDepartment: boolean;
  leadershipRank?: LeadershipRank;
};

interface DepartmentExpandedProps {
  department: Department;
  departmentMembers: Array<EnrichedDepartmentMember>;
  onBack: () => void;
  onSelectMember: (memberId: number) => void;
}

const DESKTOP_QUERY = "(min-width: 1024px)";
const TABLET_QUERY = "(min-width: 640px)";

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

/**
 * Distributes regular members into a balanced Deep-Neural-Network topology
 * (taller hidden layers in the middle, tapered edges) that scales cleanly
 * to any number of future members without overcrowded columns.
 */
function buildNeuralRegularLayers(regularIds: number[]): number[][] {
  const n = regularIds.length;
  if (n === 0) return [];
  if (n <= 3) return [regularIds];

  // Hand-tuned diamond/neural distributions for common sizes, general formula for any N
  let layerSizes: number[] = [];
  if (n === 4) layerSizes = [2, 2];
  else if (n === 5) layerSizes = [3, 2];
  else if (n === 6) layerSizes = [3, 3];
  else if (n === 7) layerSizes = [2, 3, 2];
  else if (n === 8) layerSizes = [3, 3, 2];
  else if (n === 9) layerSizes = [3, 4, 2];
  else if (n === 10) layerSizes = [3, 4, 3];
  else if (n === 11) layerSizes = [3, 4, 4];
  else if (n === 12) layerSizes = [3, 4, 3, 2];
  else {
    // Scalable formula for 13+ members: max 4 per layer, arranged with larger layers in the middle
    const maxPerLayer = 4;
    const numLayers = Math.ceil(n / 3.4);
    const base = Math.floor(n / numLayers);
    const rem = n % numLayers;

    const rawSizes = Array.from({ length: numLayers }, (_, i) =>
      Math.min(maxPerLayer, base + (i < rem ? 1 : 0)),
    );

    // Arrange largest layers in the center for a classic diamond neural silhouette
    const sorted = [...rawSizes].sort((a, b) => b - a);
    const centered: number[] = new Array(numLayers);
    let left = Math.floor((numLayers - 1) / 2);
    let right = left + 1;
    sorted.forEach((size, idx) => {
      if (idx % 2 === 0 && left >= 0) {
        centered[left--] = size;
      } else if (right < numLayers) {
        centered[right++] = size;
      } else if (left >= 0) {
        centered[left--] = size;
      }
    });
    layerSizes = centered;
  }

  const result: number[][] = [];
  let cursor = 0;
  for (const size of layerSizes) {
    result.push(regularIds.slice(cursor, cursor + size));
    cursor += size;
  }
  return result;
}

const DepartmentExpanded: React.FC<DepartmentExpandedProps> = ({
  department,
  departmentMembers,
  onBack,
  onSelectMember,
}) => {
  const IconComponent =
    (LucideIcons as any)[department.icon] || LucideIcons.Box;

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

  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);

  const [isHorizontal, setIsHorizontal] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
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

    mq.addEventListener("change", handler);
    mqTablet.addEventListener("change", tabletHandler);

    return () => {
      mq.removeEventListener("change", handler);
      mqTablet.removeEventListener("change", tabletHandler);
    };
  }, []);

  const leaders = useMemo(
    () => departmentMembers.filter((m) => m.isLeadInDepartment),
    [departmentMembers],
  );

  // Calculate balanced neural layers and staggered positions
  const { memberPositions, layers } = useMemo(() => {
    const members = departmentMembers;
    const centerPct = 50;

    if (!members || members.length === 0)
      return { memberPositions: [], layers: [] };

    if (members.length === 1) {
      return {
        memberPositions: [
          {
            id: members[0].id,
            x: centerPct,
            y: centerPct,
            isLead: members[0].isLeadInDepartment,
          },
        ],
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
      const regularLayers = buildNeuralRegularLayers(regulars.map((m) => m.id));
      layerGroups.push(...regularLayers);
    }

    const positions: Array<{
      id: number;
      x: number;
      y: number;
      isLead: boolean;
    }> = [];
    const numLayers = layerGroups.length;

    // Main-axis span (X on desktop, Y on mobile/tablet)
    const availableMainSpan = isHorizontal ? 72 : isTablet ? 74 : 78;
    const maxMainSpacing = isHorizontal ? 26 : isTablet ? 28 : 32;
    const mainSpacing =
      numLayers <= 1
        ? 0
        : Math.min(
            maxMainSpacing,
            availableMainSpan / Math.max(numLayers - 1, 1),
          );

    const startMain = centerPct - ((numLayers - 1) * mainSpacing) / 2;

    layerGroups.forEach((layer, layerIdx) => {
      const layerCount = Math.max(layer.length, 1);

      // Cross-axis span (Y on desktop, X on mobile/tablet) — generous spacing so circles + nameplates never collide
      const crossAvailableSpan = isHorizontal ? 72 : isTablet ? 74 : 76;
      const maxCrossSpacing = isHorizontal ? 27 : isTablet ? 30 : 36;
      const crossSpacing =
        layerCount <= 1
          ? 0
          : Math.min(
              maxCrossSpacing,
              crossAvailableSpan / Math.max(layerCount - 1, 1),
            );

      // Staggered offset when two consecutive regular layers have the same node count
      let staggerOffset = 0;
      if (layerIdx > 0 && layerCount > 1) {
        const prevLayerCount = layerGroups[layerIdx - 1]?.length || 0;
        if (prevLayerCount === layerCount) {
          staggerOffset = layerIdx % 2 === 0 ? 4.5 : -4.5;
        }
      }

      const startCross =
        centerPct - ((layerCount - 1) * crossSpacing) / 2 + staggerOffset;
      const mainPos = clamp(startMain + layerIdx * mainSpacing, 10, 90);

      layer.forEach((id, idx) => {
        const crossPos = clamp(startCross + idx * crossSpacing, 11, 88);
        const isLeadNode = leads.some((l) => l.id === id);
        if (isHorizontal) {
          positions.push({ id, x: mainPos, y: crossPos, isLead: isLeadNode });
        } else {
          positions.push({ id, x: crossPos, y: mainPos, isLead: isLeadNode });
        }
      });
    });

    return { memberPositions: positions, layers: layerGroups };
  }, [departmentMembers, isHorizontal, isTablet]);

  // Build smart k-Nearest S-Curve Neural Connections + Intra-Layer Links
  const connections = useMemo(() => {
    const conns: Array<{
      from: number;
      to: number;
      type?: "primary" | "Cross" | "intra";
    }> = [];
    const posMap = new Map(memberPositions.map((p) => [p.id, p]));
    const addedPairs = new Set<string>();

    const addConn = (
      from: number,
      to: number,
      type: "primary" | "Cross" | "intra" = "primary",
    ) => {
      const key = `${from}->${to}`;
      if (!addedPairs.has(key)) {
        addedPairs.add(key);
        conns.push({ from, to, type });
      }
    };

    for (let layerIdx = 0; layerIdx < layers.length; layerIdx++) {
      const currentLayer = layers[layerIdx];

      // 1. Subtle intra-layer vertical/horizontal mesh between adjacent nodes in the same layer
      if (currentLayer.length > 1) {
        for (let i = 0; i < currentLayer.length - 1; i++) {
          addConn(currentLayer[i], currentLayer[i + 1], "intra");
        }
      }

      // 2. Inter-layer S-Curve synapses to next layer using k-Nearest cross-axis neighbors
      if (layerIdx < layers.length - 1) {
        const nextLayer = layers[layerIdx + 1];

        // If current layer is the Leader layer (1-2 nodes), connect Leader(s) to all nodes in Layer 1
        if (layerIdx === 0 && currentLayer.length <= 2) {
          currentLayer.forEach((fromId) => {
            nextLayer.forEach((toId) => {
              addConn(fromId, toId, "primary");
            });
          });
          continue;
        }

        // Each node in currentLayer connects to its 2 nearest cross-axis neighbors in nextLayer
        const kOut = Math.min(2, nextLayer.length);
        currentLayer.forEach((fromId) => {
          const fromPos = posMap.get(fromId);
          if (!fromPos) return;
          const fromCross = isHorizontal ? fromPos.y : fromPos.x;

          const sortedTargets = [...nextLayer].sort((a, b) => {
            const posA = posMap.get(a);
            const posB = posMap.get(b);
            const crossA = posA ? (isHorizontal ? posA.y : posA.x) : 50;
            const crossB = posB ? (isHorizontal ? posB.y : posB.x) : 50;
            return Math.abs(crossA - fromCross) - Math.abs(crossB - fromCross);
          });

          sortedTargets.slice(0, kOut).forEach((toId) => {
            addConn(fromId, toId, "primary");
          });
        });

        // Ensure every node in nextLayer also receives at least 2 incoming connections from its nearest neighbors in currentLayer
        const kIn = Math.min(2, currentLayer.length);
        nextLayer.forEach((toId) => {
          const toPos = posMap.get(toId);
          if (!toPos) return;
          const toCross = isHorizontal ? toPos.y : toPos.x;

          const sortedSources = [...currentLayer].sort((a, b) => {
            const posA = posMap.get(a);
            const posB = posMap.get(b);
            const crossA = posA ? (isHorizontal ? posA.y : posA.x) : 50;
            const crossB = posB ? (isHorizontal ? posB.y : posB.x) : 50;
            return Math.abs(crossA - toCross) - Math.abs(crossB - toCross);
          });

          sortedSources.slice(0, kIn).forEach((fromId) => {
            addConn(fromId, toId, "primary");
          });
        });
      }
    }

    return conns;
  }, [layers, memberPositions, isHorizontal]);

  // Identify all nodes connected to the hovered node so we can highlight them
  const { isLeaderHovered, connectedNodeIds } = useMemo(() => {
    if (hoveredMemberId === null) {
      return { isLeaderHovered: false, connectedNodeIds: new Set<number>() };
    }

    const leadHovered = leaders.some((l) => l.id === hoveredMemberId);
    if (leadHovered) {
      return {
        isLeaderHovered: true,
        connectedNodeIds: new Set(departmentMembers.map((m) => m.id)),
      };
    }

    const activeSet = new Set<number>([hoveredMemberId]);

    // Trace backward to leader(s)
    const backQ = [hoveredMemberId];
    while (backQ.length > 0) {
      const curr = backQ.shift()!;
      connections.forEach((c) => {
        if (c.type !== "intra" && c.to === curr && !activeSet.has(c.from)) {
          activeSet.add(c.from);
          backQ.push(c.from);
        }
      });
    }

    // Trace forward
    const fwdQ = [hoveredMemberId];
    while (fwdQ.length > 0) {
      const curr = fwdQ.shift()!;
      connections.forEach((c) => {
        if (c.type !== "intra" && c.from === curr && !activeSet.has(c.to)) {
          activeSet.add(c.to);
          fwdQ.push(c.to);
        }
      });
    }

    return { isLeaderHovered: false, connectedNodeIds: activeSet };
  }, [hoveredMemberId, leaders, departmentMembers, connections]);

  // Dynamic container height that scales automatically as more members/layers are added
  const dynamicContainerHeight = useMemo(() => {
    const maxLayerNodes = Math.max(...layers.map((l) => l.length), 1);
    const numLayers = Math.max(layers.length, 1);

    if (isHorizontal) {
      return `${Math.max(640, maxLayerNodes * 180)}px`;
    }
    if (isTablet) {
      return `${Math.max(680, numLayers * 210)}px`;
    }
    return `${Math.max(660, numLayers * 195)}px`;
  }, [layers, isHorizontal, isTablet]);

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

          {/* Back button, Member count, and Leader indicator */}
          <div ref={actionsRef}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <Button
                onClick={onBack}
                className="font-mono text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group px-4 py-2 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                BACK
              </Button>

              <Badge
                variant="outline"
                className="border-primary/50 bg-background/80 backdrop-blur-sm px-3.5 py-2.5 font-mono text-xs"
              >
                <Users className="w-3.5 h-3.5 mr-2 inline text-primary" />
                {departmentMembers.length} MEMBER
                {departmentMembers.length !== 1 ? "S" : ""}
              </Badge>

              {leaders.length > 0 && (
                <Badge
                  variant="outline"
                  className="border-amber-400/50 bg-amber-400/5 backdrop-blur-sm px-3.5 py-2.5 font-mono text-xs text-amber-300"
                >
                  <Crown className="w-3.5 h-3.5 mr-2 inline text-amber-400" />
                  LEAD: {leaders.map((l) => l.name).join(" & ")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Curved Layered Neural Network Canvas */}
        <div
          ref={networkRef}
          className="relative w-full transition-all duration-300"
          style={{ height: dynamicContainerHeight }}
        >
          {/* S-Curve Neural Synapses */}
          <NetworkConnections
            nodes={memberPositions}
            connections={connections}
            animated={true}
            isHorizontal={isHorizontal}
            curveMode="s-curve"
            highlightedNodeId={hoveredMemberId}
            highlightAll={isLeaderHovered}
          />

          {/* Member Nodes */}
          {departmentMembers.map((member) => {
            const pos = memberPositions.find((p) => p.id === member.id);
            if (!pos) return null;

            const isHighlighted =
              hoveredMemberId !== null && connectedNodeIds.has(member.id);
            const isDimmed =
              hoveredMemberId !== null && !connectedNodeIds.has(member.id);

            return (
              <MemberNode
                key={member.id}
                member={member}
                roleInDepartment={member.roleInDepartment}
                isLead={member.isLeadInDepartment}
                leadershipRank={
                  member.leadershipRank ||
                  (member.isLeadInDepartment ? "leader" : "member")
                }
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                onClick={() => onSelectMember(member.id)}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex:
                    hoveredMemberId === member.id
                      ? 35
                      : member.isLeadInDepartment
                        ? 25
                        : 20,
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
