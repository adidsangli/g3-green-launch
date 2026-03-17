"use client";

import { motion } from "framer-motion";

const NODE_COUNT_OUTER = 12;
const NODE_COUNT_MID = 8;
const NODE_COUNT_INNER = 6;

// Mist & rose palette
const MIST_BASE   = "#0f766e"; // teal-700
const MIST_DIM    = "#115e59"; // teal-800
const ROSE_BRIGHT = "#648085"; // rose-800

const CENTER_RING_R = 4; // radius of circle around icon; data converges to this ring

const getPos = (i: number, total: number, radius: number) => ({
  x: 50 + radius * Math.cos((2 * Math.PI * i) / total - Math.PI / 2),
  y: 50 + radius * Math.sin((2 * Math.PI * i) / total - Math.PI / 2),
});

// Point on the center ring (circle) in the direction from center toward (px, py)
const pointOnCenterRing = (px: number, py: number) => {
  const cx = 50, cy = 50;
  const dx = px - cx, dy = py - cy;
  const d = Math.hypot(dx, dy) || 1;
  return { x: cx + (CENTER_RING_R * dx) / d, y: cy + (CENTER_RING_R * dy) / d };
};

const Aperture = () => {
  const outerNodes = Array.from({ length: NODE_COUNT_OUTER }, (_, i) => getPos(i, NODE_COUNT_OUTER, 46));
  const midNodes = Array.from({ length: NODE_COUNT_MID }, (_, i) => getPos(i, NODE_COUNT_MID, 32));
  const innerNodes = Array.from({ length: NODE_COUNT_INNER }, (_, i) => getPos(i, NODE_COUNT_INNER, 18));
  const center = { x: 50, y: 50 };

  // Build connections: outer↔mid, mid↔inner, inner↔center ring (data converges to circle)
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  outerNodes.forEach((o, i) => {
    const mi = Math.floor((i / NODE_COUNT_OUTER) * NODE_COUNT_MID);
    connections.push({ x1: o.x, y1: o.y, x2: midNodes[mi].x, y2: midNodes[mi].y });
    connections.push({ x1: o.x, y1: o.y, x2: midNodes[(mi + 1) % NODE_COUNT_MID].x, y2: midNodes[(mi + 1) % NODE_COUNT_MID].y });
  });
  midNodes.forEach((m, i) => {
    const ii = Math.floor((i / NODE_COUNT_MID) * NODE_COUNT_INNER);
    connections.push({ x1: m.x, y1: m.y, x2: innerNodes[ii].x, y2: innerNodes[ii].y });
    connections.push({ x1: m.x, y1: m.y, x2: innerNodes[(ii + 1) % NODE_COUNT_INNER].x, y2: innerNodes[(ii + 1) % NODE_COUNT_INNER].y });
  });
  innerNodes.forEach((n) => {
    const ringPoint = pointOnCenterRing(n.x, n.y);
    connections.push({ x1: n.x, y1: n.y, x2: ringPoint.x, y2: ringPoint.y });
  });

  return (
    <div className="relative w-full h-full">

      {/* Spinning orbit rings — mist tones */}
      <motion.div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{ border: "1px solid hsl(207 38% 40% / 0.15)" }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full animate-spin-slow-reverse"
        style={{ border: "1px solid hsl(206 35% 45% / 0.20)" }}
        animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <div
        className="absolute inset-[34%] rounded-full animate-spin-slower"
        style={{ border: "1px solid hsl(205 32% 50% / 0.25)" }}
      />

      {/* SVG neural network overlay */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none">
        {/* Data pulse connections */}
        {connections.map((c, i) => {
          const isRose = i % 7 === 0;
          const pulseColor = isRose
            ? `${ROSE_BRIGHT.replace(")", " / 0.70)")}`
            : `${MIST_BASE.replace(")", " / 0.50)")}`;
          const baseColor = isRose
            ? "hsl(348 74% 32% / 0.10)"
            : "hsl(204 30% 45% / 0.09)";
          return (
            <g key={`c-${i}`}>
              <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={baseColor} strokeWidth="0.25" />
              <motion.line
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke={pulseColor}
                strokeWidth={isRose ? "0.45" : "0.35"}
                strokeDasharray="2 16"
                animate={{ strokeDashoffset: [18, 0] }}
                transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.08 }}
              />
            </g>
          );
        })}

        {/* Outer nodes — mist */}
        {outerNodes.map((n, i) => (
          <motion.circle
            key={`on-${i}`}
            cx={n.x} cy={n.y} r={1.4}
            fill={`${MIST_DIM.replace(")", " / 0.55)")}`}
            animate={{ opacity: [0.3, 1, 0.3], r: [1.1, 1.9, 1.1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Mid nodes — mist with every 3rd as rose */}
        {midNodes.map((n, i) => {
          const isRose = i % 3 === 1;
          return (
            <motion.circle
              key={`mn-${i}`}
              cx={n.x} cy={n.y} r={1.7}
              fill={isRose ? `${ROSE_BRIGHT.replace(")", " / 0.75)")}` : `${MIST_BASE.replace(")", " / 0.65)")}`}
              animate={{ opacity: [0.4, 1, 0.4], r: isRose ? [1.3, 2.4, 1.3] : [1.2, 2.0, 1.2] }}
              transition={{ duration: isRose ? 1.8 : 2.0, repeat: Infinity, delay: i * 0.25 }}
            />
          );
        })}

        {/* Inner nodes — brighter mist with rose accents */}
        {innerNodes.map((n, i) => {
          const isRose = i % 2 === 1;
          return (
            <motion.circle
              key={`in-${i}`}
              cx={n.x} cy={n.y} r={2.0}
              fill={isRose ? `${ROSE_BRIGHT.replace(")", " / 0.85)")}` : `${MIST_BASE.replace(")", " / 0.80)")}`}
              animate={{ opacity: [0.5, 1, 0.5], r: isRose ? [1.6, 2.9, 1.6] : [1.5, 2.5, 1.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          );
        })}

        {/* Center — circle data converges to + server rack icon */}
        <circle cx={50} cy={50} r={CENTER_RING_R} fill="hsl(0 0% 100% / 0.2)" stroke="hsl(207 38% 60% / 0.35)" strokeWidth="0.4" />
        <rect x={47.5} y={47.5} width={5} height={1} rx={0.3} fill={`${MIST_BASE.replace(")", " / 0.70)")}`} />
        <rect x={47.5} y={49.2} width={5} height={1} rx={0.3} fill={`${MIST_DIM.replace(")", " / 0.50)")}`} />
        <rect x={47.5} y={50.9} width={5} height={1} rx={0.3} fill={`${MIST_BASE.replace(")", " / 0.70)")}`} />
        {/* Rose-900 blinking LED */}
        <motion.circle
          cx={51.5} cy={48} r={0.5}
          fill={ROSE_BRIGHT}
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

export default Aperture;
