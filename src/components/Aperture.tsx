import { motion } from "framer-motion";

const NODE_COUNT = 8;
const DATA_STREAMS = 6;

const Aperture = () => {
  return (
    <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
      {/* Ambient glow */}
      <div className="absolute inset-16 bg-primary rounded-full blur-[100px] opacity-15 animate-pulse" />

      {/* Outer orbit ring with nodes */}
      <div className="absolute inset-0 border border-primary/15 rounded-full animate-spin-slow">
        {[...Array(NODE_COUNT)].map((_, i) => (
          <motion.div
            key={`outer-${i}`}
            className="absolute w-2 h-2 bg-primary/60 rounded-full"
            style={{
              top: `${50 - 50 * Math.cos((2 * Math.PI * i) / NODE_COUNT)}%`,
              left: `${50 + 50 * Math.sin((2 * Math.PI * i) / NODE_COUNT)}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>

      {/* Second orbit - reverse */}
      <div className="absolute inset-10 md:inset-14 border border-primary/25 rounded-full animate-spin-slow-reverse">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`mid-${i}`}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full"
            style={{
              top: `${50 - 50 * Math.cos((2 * Math.PI * i) / 6)}%`,
              left: `${50 + 50 * Math.sin((2 * Math.PI * i) / 6)}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Inner processing ring */}
      <div className="absolute inset-20 md:inset-28 border-2 border-primary/40 rounded-full animate-spin-slower" />

      {/* Data stream lines radiating from center */}
      {[...Array(DATA_STREAMS)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-primary/50 to-transparent origin-left"
          style={{
            width: "45%",
            transform: `rotate(${i * (360 / DATA_STREAMS)}deg)`,
          }}
          animate={{ opacity: [0.1, 0.6, 0.1], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Core hub - server icon */}
      <div className="absolute inset-[38%] md:inset-[40%] flex items-center justify-center">
        <motion.div
          className="w-full h-full rounded-xl bg-primary/10 border border-primary/40 backdrop-blur-sm flex flex-col items-center justify-center gap-1"
          animate={{ boxShadow: ["0 0 20px hsl(160 84% 39% / 0.1)", "0 0 40px hsl(160 84% 39% / 0.25)", "0 0 20px hsl(160 84% 39% / 0.1)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Server rack lines */}
          <div className="w-6 h-px bg-primary/60" />
          <div className="w-6 h-px bg-primary/40" />
          <div className="w-6 h-px bg-primary/60" />
          {/* Blinking status light */}
          <motion.div
            className="w-1 h-1 bg-primary rounded-full mt-1"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Corner labels */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono-label text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        Data Centre Infrastructure
      </span>
    </div>
  );
};

export default Aperture;
