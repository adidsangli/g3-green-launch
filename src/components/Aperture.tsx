import { motion } from "framer-motion";

const NODE_COUNT_OUTER = 12;
const NODE_COUNT_MID = 8;
const NODE_COUNT_INNER = 6;

const getPos = (i: number, total: number, radius: number) => ({
  x: 50 + radius * Math.cos((2 * Math.PI * i) / total - Math.PI / 2),
  y: 50 + radius * Math.sin((2 * Math.PI * i) / total - Math.PI / 2),
});

const Aperture = () => {
  const outerNodes = Array.from({ length: NODE_COUNT_OUTER }, (_, i) => getPos(i, NODE_COUNT_OUTER, 46));
  const midNodes = Array.from({ length: NODE_COUNT_MID }, (_, i) => getPos(i, NODE_COUNT_MID, 32));
  const innerNodes = Array.from({ length: NODE_COUNT_INNER }, (_, i) => getPos(i, NODE_COUNT_INNER, 18));
  const center = { x: 50, y: 50 };

  // Build connections: outer↔mid, mid↔inner, inner↔center
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  // Outer to nearest mid
  outerNodes.forEach((o, i) => {
    const mi = Math.floor((i / NODE_COUNT_OUTER) * NODE_COUNT_MID);
    connections.push({ ...o, x2: midNodes[mi].x, y2: midNodes[mi].y, x1: o.x, y1: o.y });
    connections.push({ ...o, x2: midNodes[(mi + 1) % NODE_COUNT_MID].x, y2: midNodes[(mi + 1) % NODE_COUNT_MID].y, x1: o.x, y1: o.y });
  });
  // Mid to nearest inner
  midNodes.forEach((m, i) => {
    const ii = Math.floor((i / NODE_COUNT_MID) * NODE_COUNT_INNER);
    connections.push({ x1: m.x, y1: m.y, x2: innerNodes[ii].x, y2: innerNodes[ii].y });
    connections.push({ x1: m.x, y1: m.y, x2: innerNodes[(ii + 1) % NODE_COUNT_INNER].x, y2: innerNodes[(ii + 1) % NODE_COUNT_INNER].y });
  });
  // Inner to center
  innerNodes.forEach((n) => {
    connections.push({ x1: n.x, y1: n.y, x2: center.x, y2: center.y });
  });

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
      {/* Large ambient glow */}
      <div className="absolute inset-8 bg-primary rounded-full blur-[100px] opacity-15 animate-pulse" />

      {/* Spinning orbit rings */}
      <div className="absolute inset-0 border border-primary/10 rounded-full animate-spin-slow" />
      <div className="absolute inset-[18%] border border-primary/15 rounded-full animate-spin-slow-reverse" />
      <div className="absolute inset-[34%] border border-primary/20 rounded-full animate-spin-slower" />

      {/* SVG neural network overlay */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none">
        {/* Data pulse connections */}
        {connections.map((c, i) => (
          <g key={`c-${i}`}>
            <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="hsl(160 84% 39% / 0.08)" strokeWidth="0.2" />
            <motion.line
              x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
              stroke="hsl(160 84% 39% / 0.4)"
              strokeWidth="0.3"
              strokeDasharray="2 16"
              animate={{ strokeDashoffset: [18, 0] }}
              transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.08 }}
            />
          </g>
        ))}

        {/* Outer ring orbit */}
        <circle cx={50} cy={50} r={46} stroke="hsl(160 84% 39% / 0.06)" strokeWidth="0.3" />
        {/* Mid ring */}
        <circle cx={50} cy={50} r={32} stroke="hsl(160 84% 39% / 0.08)" strokeWidth="0.3" />
        {/* Inner ring */}
        <circle cx={50} cy={50} r={18} stroke="hsl(160 84% 39% / 0.1)" strokeWidth="0.3" />

        {/* Outer nodes */}
        {outerNodes.map((n, i) => (
          <motion.circle
            key={`on-${i}`}
            cx={n.x} cy={n.y} r={1.2}
            fill="hsl(160 84% 39% / 0.5)"
            animate={{ opacity: [0.3, 1, 0.3], r: [1, 1.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Mid nodes */}
        {midNodes.map((n, i) => (
          <motion.circle
            key={`mn-${i}`}
            cx={n.x} cy={n.y} r={1.5}
            fill="hsl(160 84% 39% / 0.65)"
            animate={{ opacity: [0.4, 1, 0.4], r: [1.2, 2, 1.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

        {/* Inner nodes */}
        {innerNodes.map((n, i) => (
          <motion.circle
            key={`in-${i}`}
            cx={n.x} cy={n.y} r={1.8}
            fill="hsl(160 84% 39% / 0.8)"
            animate={{ opacity: [0.5, 1, 0.5], r: [1.5, 2.5, 1.5] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Center core - large pulsing hub */}
        <motion.circle
          cx={50} cy={50} r={6}
          fill="hsl(160 84% 39% / 0.06)"
          animate={{ r: [5, 8, 5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx={50} cy={50} r={4}
          fill="hsl(160 84% 39% / 0.15)"
          stroke="hsl(160 84% 39% / 0.4)"
          strokeWidth="0.4"
          animate={{ r: [3.5, 4.5, 3.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Server rack icon at center */}
        <rect x={47.5} y={47.5} width={5} height={1} rx={0.3} fill="hsl(160 84% 39% / 0.7)" />
        <rect x={47.5} y={49.2} width={5} height={1} rx={0.3} fill="hsl(160 84% 39% / 0.5)" />
        <rect x={47.5} y={50.9} width={5} height={1} rx={0.3} fill="hsl(160 84% 39% / 0.7)" />
        {/* Blinking LED */}
        <motion.circle
          cx={51.5} cy={48} r={0.4}
          fill="hsl(160 84% 39%)"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </svg>

      {/* Label beneath */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono-label text-[10px] tracking-[0.25em] uppercase text-muted-foreground whitespace-nowrap">
        AI · Data Centre · Infrastructure
      </span>
    </div>
  );
};

export default Aperture;
