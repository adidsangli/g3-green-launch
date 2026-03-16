const Aperture = () => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow" />
      <div className="absolute inset-8 md:inset-10 border border-primary/40 rounded-full animate-spin-slow-reverse" />
      <div className="absolute inset-16 md:inset-20 border border-primary/60 rounded-full animate-spin-slower" />
      <div className="absolute inset-20 md:inset-24 bg-primary rounded-full blur-[80px] opacity-20" />
      <div className="absolute inset-[45%] bg-primary rounded-full opacity-30" />
    </div>
  );
};

export default Aperture;
