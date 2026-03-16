import { motion } from "framer-motion";

const NODE_COUNT_OUTER = 16;
const NODE_COUNT_MID = 10;
const NODE_COUNT_INNER = 6;
const NODE_COUNT_MICRO = 4;

const getPos = (i: number, total: number, radius: number) => ({
  x: 50 + radius * Math.cos((2 * Math.PI * i) / total - Math.PI / 2),
  y: 50 + radius * Math.sin((2 * Math.PI * i) / total - Math.PI / 2),
});

const Aperture = () => {
  const outerNodes = Array.from({ length: NODE_COUNT_OUTER }, (_, i) => getPos(i, NODE_COUNT_OUTER, 46));
  const midNodes = Array.from({ length: NODE_COUNT_MID }, (_, i) => getPos(i, NODE_COUNT_MID, 33));
  const innerNodes = Array.from({ length: NODE_COUNT_INNER }, (_, i) => getPos(i, NODE_COUNT_INNER, 20));
  const microNodes = Array.from({ length: NODE_COUNT_MICRO }, (_, i) => getPos(i, NODE_COUNT_MICRO, 9));
  const center = { x: 50, y: 50 };

  // Cross-connections within the same ring for complexity
  const ringConnections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  // Outer ring cross-links (every other node)
  outerNodes.forEach((n, i) => {
    const next = outerNodes[(i + 2) % NODE_COUNT_OUTER];
    ringConnections.push({ x1: n.x, y1: n.y, x2: next.x, y2: next.y });
  });
  // Mid ring cross-links
  midNodes.forEach((n, i) => {
    const next = midNodes[(i + 2) % NODE_COUNT_MID];
    ringConnections.push({ x1: n.x, y1: n.y, x2: next.x, y2: next.y });
  });

  // Radial connections: outer→mid, mid→inner, inner→micro, micro→center
  const radialConnections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  outerNodes.forEach((o, i) => {
    const mi = Math.floor((i / NODE_COUNT_OUTER) * NODE_COUNT_MID);
    radialConnections.push({ x1: o.x, y1: o.y, x2: midNodes[mi].x, y2: midNodes[mi].y });
    radialConnections.push({ x1: o.x, y1: o.y, x2: midNodes[(mi + 1) % NODE_COUNT_MID].x, y2: midNodes[(mi + 1) % NODE_COUNT_MID].y });
  });
  midNodes.forEach((m, i) => {
    const ii = Math.floor((i / NODE_COUNT_MID) * NODE_COUNT_INNER);
    radialConnections.push({ x1: m.x, y1: m.y, x2: innerNodes[ii].x, y2: innerNodes[ii].y });
    radialConnections.push({ x1: m.x, y1: m.y, x2: innerNodes[(ii + 1) % NODE_COUNT_INNER].x, y2: innerNodes[(ii + 1) % NODE_COUNT_INNER].y });
  });
  innerNodes.forEach((n, i) => {
    const mi = Math.floor((i / NODE_COUNT_INNER) * NODE_COUNT_MICRO);
    radialConnections.push({ x1: n.x, y1: n.y, x2: microNodes[mi].x, y2: microNodes[mi].y });
    radialConnections.push({ x1: n.x, y1: n.y, x2: microNodes[(mi + 1) % NODE_COUNT_MICRO].x, y2: microNodes[(mi + 1) % NODE_COUNT_MICRO].y });
  });
  microNodes.forEach((n) => {
    radialConnections.push({ x1: n.x, y1: n.y, x2: center.x, y2: center.y });
  });

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
      {/* Subtle spinning orbit rings — no glow */}
      <div className="absolute inset-0 border border-primary/5 rounded-full animate-spin-slow" />
      <div className="absolute inset-[14%] border border-primary/6 rounded-full animate-spin-slow-reverse" />
      <div className="absolute inset-[30%] border border-primary/7 rounded-full animate-spin-slower" />
      <div className="absolute inset-[44%] border border-primary/5 rounded-full animate-spin-slow" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="line-fade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(160 84% 39%)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Ring orbit lines */}
        <circle cx={50} cy={50} r={46} stroke="hsl(160 84% 39% / 0.04)" strokeWidth="0.15" />
        <circle cx={50} cy={50} r={33} stroke="hsl(160 84% 39% / 0.05)" strokeWidth="0.15" />
        <circle cx={50} cy={50} r={20} stroke="hsl(160 84% 39% / 0.06)" strokeWidth="0.15" />
        <circle cx={50} cy={50} r={9} stroke="hsl(160 84% 39% / 0.07)" strokeWidth="0.15" />

        {/* Ring cross-connections — thin geometric web */}
        {ringConnections.map((c, i) => (
          <g key={`rc-${i}`}>
            <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="hsl(160 84% 39% / 0.04)" strokeWidth="0.12" />
            <motion.line
              x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
              stroke="hsl(160 84% 39% / 0.2)"
              strokeWidth="0.15"
              strokeDasharray="1 12"
              animate={{ strokeDashoffset: [13, 0] }}
              transition={{ duration: 4 + (i % 3) * 1.5, repeat: Infinity, ease: "linear", delay: i * 0.12 }}
            />
          </g>
        ))}

        {/* Radial connections — data flow lines */}
        {radialConnections.map((c, i) => (
          <g key={`rd-${i}`}>
            <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="hsl(160 84% 39% / 0.05)" strokeWidth="0.12" />
            <motion.line
              x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
              stroke="hsl(160 84% 39% / 0.25)"
              strokeWidth="0.18"
              strokeDasharray="1.5 14"
              animate={{ strokeDashoffset: [15.5, 0] }}
              transition={{ duration: 3 + (i % 5) * 0.6, repeat: Infinity, ease: "linear", delay: i * 0.06 }}
            />
          </g>
        ))}

        {/* Outer nodes — tiny precise dots */}
        {outerNodes.map((n, i) => (
          <motion.circle
            key={`on-${i}`}
            cx={n.x} cy={n.y} r={0.6}
            fill="hsl(160 84% 39% / 0.35)"
            stroke="hsl(160 84% 39% / 0.15)"
            strokeWidth="0.15"
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 3 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}

        {/* Mid nodes */}
        {midNodes.map((n, i) => (
          <motion.circle
            key={`mn-${i}`}
            cx={n.x} cy={n.y} r={0.8}
            fill="hsl(160 84% 39% / 0.4)"
            stroke="hsl(160 84% 39% / 0.2)"
            strokeWidth="0.15"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5 + (i % 3) * 0.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Inner nodes */}
        {innerNodes.map((n, i) => (
          <motion.circle
            key={`in-${i}`}
            cx={n.x} cy={n.y} r={0.9}
            fill="hsl(160 84% 39% / 0.5)"
            stroke="hsl(160 84% 39% / 0.25)"
            strokeWidth="0.15"
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

        {/* Micro nodes */}
        {microNodes.map((n, i) => (
          <motion.circle
            key={`mcn-${i}`}
            cx={n.x} cy={n.y} r={0.7}
            fill="hsl(160 84% 39% / 0.55)"
            stroke="hsl(160 84% 39% / 0.3)"
            strokeWidth="0.15"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Center — clean geometric core, no glow */}
        <circle cx={50} cy={50} r={3.5} stroke="hsl(160 84% 39% / 0.12)" strokeWidth="0.2" fill="none" />
        <circle cx={50} cy={50} r={2.2} stroke="hsl(160 84% 39% / 0.2)" strokeWidth="0.15" fill="none" />
        {/* Server rack icon */}
        <rect x={48.2} y={48.2} width={3.6} height={0.7} rx={0.2} fill="hsl(160 84% 39% / 0.5)" />
        <rect x={48.2} y={49.3} width={3.6} height={0.7} rx={0.2} fill="hsl(160 84% 39% / 0.35)" />
        <rect x={48.2} y={50.4} width={3.6} height={0.7} rx={0.2} fill="hsl(160 84% 39% / 0.5)" />
        {/* Blinking LED */}
        <motion.circle
          cx={51} cy={48.55} r={0.25}
          fill="hsl(160 84% 39% / 0.9)"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />

        {/* Tiny decorative tick marks on outer ring */}
        {Array.from({ length: 36 }, (_, i) => {
          const angle = (2 * Math.PI * i) / 36 - Math.PI / 2;
          const inner = 44.5;
          const outer = 46;
          return (
            <line
              key={`tick-${i}`}
              x1={50 + inner * Math.cos(angle)}
              y1={50 + inner * Math.sin(angle)}
              x2={50 + outer * Math.cos(angle)}
              y2={50 + outer * Math.sin(angle)}
              stroke={`hsl(160 84% 39% / ${i % 3 === 0 ? 0.12 : 0.05})`}
              strokeWidth="0.1"
            />
          );
        })}
      </svg>

      {/* Label beneath */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono-label text-[10px] tracking-[0.25em] uppercase text-muted-foreground whitespace-nowrap">
        AI · Data Centre · Infrastructure
      </span>
    </div>
  );
};

export default Aperture;
