import React, { useMemo } from "react";

interface NodePosition {
  id: string | number;
  x: number;
  y: number;
}

interface NetworkConnectionsProps {
  nodes: NodePosition[];
  connections: Array<{ from: string | number; to: string | number }>;
  animated?: boolean;
}

const NetworkConnections: React.FC<NetworkConnectionsProps> = ({
  nodes,
  connections,
  animated = true,
}) => {
  // Generate smooth curved paths - optimized
  const { paths, combinedPath } = useMemo(() => {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    const pathsArray: Array<{ d: string; strength: number }> = [];
    const allPaths: string[] = [];

    for (const { from, to } of connections) {
      const fromNode = nodeMap.get(from);
      const toNode = nodeMap.get(to);
      if (!fromNode || !toNode) continue;

      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Simpler bezier curve - control points offset along the connection line
      // This works better with non-uniform scaling (preserveAspectRatio="none")
      const controlOffset = 0.3; // 30% along the line

      const cx1 = fromNode.x + dx * controlOffset;
      const cy1 = fromNode.y + dy * controlOffset;
      const cx2 = toNode.x - dx * controlOffset;
      const cy2 = toNode.y - dy * controlOffset;

      const pathD = `M${fromNode.x},${fromNode.y} C${cx1},${cy1} ${cx2},${cy2} ${toNode.x},${toNode.y}`;

      // Calculate connection strength based on distance
      const strength = Math.max(0.3, 1 - distance / 100);

      pathsArray.push({ d: pathD, strength });
      allPaths.push(pathD);
    }

    return {
      paths: pathsArray,
      combinedPath: allPaths.join(" "),
    };
  }, [nodes, connections]);

  // Select only a few paths for particles to reduce load
  const particlePaths = useMemo(() => {
    const maxParticles = Math.min(8, Math.floor(paths.length / 3));
    return paths
      .filter((_, i) => i % Math.ceil(paths.length / maxParticles) === 0)
      .slice(0, maxParticles);
  }, [paths]);

  if (connections.length === 0 || !combinedPath) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, willChange: "auto" }}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0.1" />
          <stop
            offset="50%"
            stopColor="rgb(var(--primary))"
            stopOpacity="0.3"
          />
          <stop
            offset="100%"
            stopColor="rgb(var(--primary))"
            stopOpacity="0.1"
          />
        </linearGradient>

        <linearGradient id="signalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(var(--secondary))" stopOpacity="0" />
          <stop
            offset="50%"
            stopColor="rgb(var(--secondary))"
            stopOpacity="0.8"
          />
          <stop
            offset="100%"
            stopColor="rgb(var(--secondary))"
            stopOpacity="0"
          />
        </linearGradient>

        <filter id="softGlow" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g>
        {/* Single combined path for all base connections - huge performance boost */}
        <path
          d={combinedPath}
          stroke="rgb(var(--primary))"
          strokeWidth="0.35"
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Single animated signal layer - much more efficient */}
        {animated && (
          <path
            d={combinedPath}
            stroke="url(#signalGrad)"
            strokeWidth="1"
            strokeDasharray="10 90"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            className="cyber-circuit-line"
            opacity="0.6"
          />
        )}

        {/* Limited particles on selected paths only */}
        {animated &&
          particlePaths.map((path, index) => (
            <circle
              key={`particle-${index}`}
              r="0.4"
              fill="rgb(var(--secondary))"
              opacity="0"
              style={{
                offsetPath: `path('${path.d}')`,
                animation: `particle-move 4s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          ))}
      </g>
    </svg>
  );
};

export default NetworkConnections;
