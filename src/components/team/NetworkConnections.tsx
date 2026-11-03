import React, { useMemo } from "react";

interface NodePosition {
  id: string | number;
  x: number;
  y: number;
  isLead?: boolean;
}

interface Connection {
  from: string | number;
  to: string | number;
  type?: "primary" | "Cross" | "intra";
}

interface NetworkConnectionsProps {
  nodes: NodePosition[];
  connections: Connection[];
  animated?: boolean;
  isHorizontal?: boolean;
  curveMode?: "s-curve" | "radial";
  highlightedNodeId?: string | number | null;
  highlightAll?: boolean;
}

const NetworkConnections: React.FC<NetworkConnectionsProps> = ({
  nodes,
  connections,
  animated = true,
  isHorizontal = true,
  curveMode = "radial",
  highlightedNodeId = null,
  highlightAll = false,
}) => {
  const {
    basePaths,
    combinedBasePath,
    highlightedPaths,
    combinedHighlightPath,
    intraPaths,
  } = useMemo(() => {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    const primaryPaths: Array<{
      d: string;
      from: string | number;
      to: string | number;
      isLeadLink: boolean;
    }> = [];
    const intraLayerPaths: string[] = [];

    // Find all nodes & edges along the active neural signal chain when a node is hovered
    const activeEdges = new Set<string>();
    if (highlightedNodeId !== null && !highlightAll) {
      // Trace backward to leader(s)
      const backwardQueue: Array<string | number> = [highlightedNodeId];
      const visitedBack = new Set<string | number>([highlightedNodeId]);
      while (backwardQueue.length > 0) {
        const curr = backwardQueue.shift()!;
        for (const conn of connections) {
          if (conn.type === "intra") continue;
          if (conn.to === curr) {
            activeEdges.add(`${conn.from}->${conn.to}`);
            if (!visitedBack.has(conn.from)) {
              visitedBack.add(conn.from);
              backwardQueue.push(conn.from);
            }
          }
        }
      }

      // Trace forward from hovered node
      const forwardQueue: Array<string | number> = [highlightedNodeId];
      const visitedFwd = new Set<string | number>([highlightedNodeId]);
      while (forwardQueue.length > 0) {
        const curr = forwardQueue.shift()!;
        for (const conn of connections) {
          if (conn.type === "intra") continue;
          if (conn.from === curr) {
            activeEdges.add(`${conn.from}->${conn.to}`);
            if (!visitedFwd.has(conn.to)) {
              visitedFwd.add(conn.to);
              forwardQueue.push(conn.to);
            }
          }
        }
      }
    }

    for (const { from, to, type } of connections) {
      const fromNode = nodeMap.get(from);
      const toNode = nodeMap.get(to);
      if (!fromNode || !toNode) continue;

      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;

      let pathD = "";

      if (type === "intra") {
        // Subtle arc connecting neighbor nodes within the same layer
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        const offset = isHorizontal ? 2.2 : 0;
        const offsetY = isHorizontal ? 0 : 2.2;
        pathD = `M${fromNode.x},${fromNode.y} Q${midX + offset},${midY + offsetY} ${toNode.x},${toNode.y}`;
        intraLayerPaths.push(pathD);
        continue;
      }

      if (curveMode === "s-curve") {
        // True Cubic Bezier S-Curve tangential to the layer flow direction
        if (isHorizontal) {
          const tension = 0.52;
          const cx1 = fromNode.x + dx * tension;
          const cy1 = fromNode.y;
          const cx2 = toNode.x - dx * tension;
          const cy2 = toNode.y;
          pathD = `M${fromNode.x},${fromNode.y} C${cx1},${cy1} ${cx2},${cy2} ${toNode.x},${toNode.y}`;
        } else {
          const tension = 0.52;
          const cx1 = fromNode.x;
          const cy1 = fromNode.y + dy * tension;
          const cx2 = toNode.x;
          const cy2 = toNode.y - dy * tension;
          pathD = `M${fromNode.x},${fromNode.y} C${cx1},${cy1} ${cx2},${cy2} ${toNode.x},${toNode.y}`;
        }
      } else {
        // Gentle curved arc for radial / hub-spoke layouts (DepartmentGrid)
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        const normalX = -dy * 0.08;
        const normalY = dx * 0.08;
        pathD = `M${fromNode.x},${fromNode.y} Q${midX + normalX},${midY + normalY} ${toNode.x},${toNode.y}`;
      }

      primaryPaths.push({
        d: pathD,
        from,
        to,
        isLeadLink: Boolean(fromNode.isLead),
      });
    }

    const activePathStrings = highlightAll
      ? primaryPaths.map((p) => p.d)
      : primaryPaths
          .filter((p) => activeEdges.has(`${p.from}->${p.to}`))
          .map((p) => p.d);

    return {
      basePaths: primaryPaths,
      combinedBasePath: primaryPaths.map((p) => p.d).join(" "),
      highlightedPaths: activePathStrings,
      combinedHighlightPath: activePathStrings.join(" "),
      intraPaths: intraLayerPaths.join(" "),
    };
  }, [
    nodes,
    connections,
    curveMode,
    isHorizontal,
    highlightedNodeId,
    highlightAll,
  ]);

  // Select paths for synaptic travelling particles
  const particlePaths = useMemo(() => {
    const source =
      highlightedPaths.length > 0
        ? highlightedPaths
        : basePaths.map((p) => p.d);
    if (source.length === 0) return [];
    const maxParticles = Math.min(10, Math.max(4, Math.ceil(source.length / 2)));
    const step = Math.max(1, Math.floor(source.length / maxParticles));
    return source.filter((_, i) => i % step === 0).slice(0, maxParticles);
  }, [basePaths, highlightedPaths]);

  if (connections.length === 0 || !combinedBasePath) return null;

  const hasActiveHighlight =
    highlightAll || (highlightedNodeId !== null && highlightedPaths.length > 0);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="neuralSynapseGrad"
          x1={isHorizontal ? "0%" : "0%"}
          y1={isHorizontal ? "0%" : "0%"}
          x2={isHorizontal ? "100%" : "0%"}
          y2={isHorizontal ? "0%" : "100%"}
        >
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.75" />
          <stop
            offset="35%"
            stopColor="rgb(var(--secondary))"
            stopOpacity="0.55"
          />
          <stop
            offset="100%"
            stopColor="rgb(var(--primary))"
            stopOpacity="0.45"
          />
        </linearGradient>

        <linearGradient
          id="signalPulseGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.95" />
          <stop
            offset="80%"
            stopColor="rgb(var(--primary))"
            stopOpacity="0.9"
          />
          <stop
            offset="100%"
            stopColor="rgb(var(--primary))"
            stopOpacity="0"
          />
        </linearGradient>

        <filter id="synapseGlow" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g>
        {/* Subtle intra-layer vertical mesh links */}
        {intraPaths && (
          <path
            d={intraPaths}
            stroke="rgb(var(--primary))"
            strokeWidth="1"
            strokeDasharray="3 5"
            fill="none"
            vectorEffect="non-scaling-stroke"
            opacity={hasActiveHighlight ? "0.12" : "0.22"}
            className="transition-opacity duration-300"
          />
        )}

        {/* Outer soft glow on all neural synapses */}
        <path
          d={combinedBasePath}
          stroke="url(#neuralSynapseGrad)"
          strokeWidth="3.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          opacity={hasActiveHighlight ? "0.08" : "0.16"}
          className="transition-opacity duration-300"
        />

        {/* Crisp base neural synapses */}
        <path
          d={combinedBasePath}
          stroke={
            curveMode === "s-curve"
              ? "url(#neuralSynapseGrad)"
              : "rgb(var(--primary))"
          }
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          opacity={hasActiveHighlight ? "0.22" : "0.52"}
          className="transition-opacity duration-300"
        />

        {/* Animated synaptic flow along base network */}
        {animated && (
          <path
            d={combinedBasePath}
            stroke="url(#signalPulseGrad)"
            strokeWidth="2"
            strokeDasharray="8 65"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            className="cyber-circuit-line"
            opacity={hasActiveHighlight ? "0.3" : "0.75"}
          />
        )}

        {/* High-intensity highlighted neural pathway when hovering a node */}
        {combinedHighlightPath && (
          <>
            <path
              d={combinedHighlightPath}
              stroke="#fbbf24"
              strokeWidth="4.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              opacity="0.28"
            />
            <path
              d={combinedHighlightPath}
              stroke="url(#neuralSynapseGrad)"
              strokeWidth="2.6"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              opacity="0.98"
            />
            <path
              d={combinedHighlightPath}
              stroke="#fbbf24"
              strokeWidth="2.8"
              strokeDasharray="10 35"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              className="cyber-circuit-line"
              opacity="1"
            />
          </>
        )}

        {/* Travelling synaptic energy particles */}
        {animated &&
          particlePaths.map((d, index) => (
            <circle
              key={`particle-${index}`}
              r="0.45"
              fill={index % 2 === 0 ? "#fbbf24" : "rgb(var(--primary))"}
              opacity="0"
              style={{
                offsetPath: `path('${d}')`,
                animation: `particle-move 3.6s ease-in-out infinite`,
                animationDelay: `${index * 0.4}s`,
              }}
            />
          ))}
      </g>
    </svg>
  );
};

export default NetworkConnections;
