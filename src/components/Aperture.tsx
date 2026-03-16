const Aperture = () => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      {/* Outer ring - dashed, slow spin */}
      <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
      {/* Second ring - solid, reverse spin */}
      <div className="absolute inset-6 md:inset-8 border border-primary/30 rounded-full animate-spin-slow-reverse" />
      {/* Third ring - thicker, slow spin */}
      <div className="absolute inset-12 md:inset-16 border-2 border-primary/50 rounded-full animate-spin-slower" />
      {/* Fourth ring - reverse, faster */}
      <div className="absolute inset-[4.5rem] md:inset-24 border border-primary/40 rounded-full animate-spin-slow-reverse" style={{ animationDuration: '25s' }} />
      {/* Glow pulse */}
      <div className="absolute inset-20 md:inset-24 bg-primary rounded-full blur-[80px] opacity-20 animate-pulse" />
      {/* Tick marks on outer ring */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-0 w-px h-3 bg-primary/30 origin-[50%_calc(var(--size)/2)]"
          style={{
            transform: `rotate(${i * 30}deg)`,
            '--size': '100%',
            transformOrigin: '50% 144px',
          } as React.CSSProperties}
        />
      ))}
      {/* Center dot */}
      <div className="absolute inset-[45%] bg-primary rounded-full opacity-40 animate-pulse" style={{ animationDuration: '3s' }} />
    </div>
  );
};

export default Aperture;
