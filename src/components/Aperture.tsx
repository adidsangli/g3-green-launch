import { motion } from "framer-motion";

const Aperture = () => {
  // Neural network nodes in a brain-like constellation
  const nodes = [
    // Core cluster
    { x: 50, y: 50, size: 8, delay: 0 },
    // Inner ring
    { x: 35, y: 30, size: 4, delay: 0.2 },
    { x: 65, y: 28, size: 5, delay: 0.4 },
    { x: 72, y: 50, size: 4, delay: 0.6 },
    { x: 62, y: 72, size: 5, delay: 0.8 },
    { x: 38, y: 70, size: 4, delay: 1.0 },
    { x: 28, y: 48, size: 5, delay: 1.2 },
    // Outer ring
    { x: 20, y: 20, size: 3, delay: 0.3 },
    { x: 50, y: 12, size: 3, delay: 0.5 },
    { x: 80, y: 22, size: 3, delay: 0.7 },
    { x: 85, y: 55, size: 3, delay: 0.9 },
    { x: 75, y: 82, size: 3, delay: 1.1 },
    { x: 45, y: 88, size: 3, delay: 1.3 },
    { x: 18, y: 75, size: 3, delay: 1.5 },
    { x: 12, y: 42, size: 3, delay: 0.1 },
  ];

  // Connections between nodes (index pairs)
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
    [1, 7], [1, 8], [2, 8], [2, 9], [3, 9], [3, 10],
    [4, 10], [4, 11], [5, 11], [5, 12], [6, 12], [6, 13], [6, 14], [1, 7],
    [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 7],
  ];

  return (
    <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
      {/* Deep ambient glow */}
      <div className="absolute inset-12 bg-primary rounded-full blur-[120px] opacity-10" />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
      >
        {/* Connection lines with data pulse animation */}
        {connections.map(([a, b], i) => (
          <g key={`conn-${i}`}>
            {/* Base line */}
            <motion.line
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="hsl(160 84% 39% / 0.12)"
              strokeWidth="0.3"
            />
            {/* Animated pulse traveling along the line */}
            <motion.line
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="hsl(160 84% 39% / 0.5)"
              strokeWidth="0.4"
              strokeDasharray="3 20"
              animate={{
                strokeDashoffset: [23, 0],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.15,
              }}
            />
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Node glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.8}
              fill="hsl(160 84% 39% / 0.08)"
              animate={{
                r: [node.size * 0.6, node.size * 1, node.size * 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
            {/* Node core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={i === 0 ? 2.5 : node.size * 0.3}
              fill={i === 0 ? "hsl(160 84% 39% / 0.9)" : "hsl(160 84% 39% / 0.6)"}
              animate={{
                opacity: [0.5, 1, 0.5],
                r: i === 0 ? [2, 3, 2] : undefined,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
            {/* Server rack indicator on core node */}
            {i === 0 && (
              <>
                <rect x={47} y={47} width={6} height={1} rx={0.3} fill="hsl(160 84% 39% / 0.7)" />
                <rect x={47} y={49} width={6} height={1} rx={0.3} fill="hsl(160 84% 39% / 0.5)" />
                <rect x={47} y={51} width={6} height={1} rx={0.3} fill="hsl(160 84% 39% / 0.7)" />
              </>
            )}
          </g>
        ))}

        {/* "AI" label at center */}
        <motion.text
          x={50}
          y={59}
          textAnchor="middle"
          fill="hsl(160 84% 39% / 0.4)"
          fontSize="3"
          fontFamily="Space Mono, monospace"
          letterSpacing="0.15em"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          AI
        </motion.text>
      </svg>

      {/* Label */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono-label text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        AI · Data Centre · Infrastructure
      </span>
    </div>
  );
};

export default Aperture;
