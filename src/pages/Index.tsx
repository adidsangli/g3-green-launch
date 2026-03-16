import { motion } from "framer-motion";
import Aperture from "@/components/Aperture";
import WaitlistForm from "@/components/WaitlistForm";

const ease = [0.16, 1, 0.3, 1] as const;

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <span className="text-xl font-semibold tracking-tighter text-foreground">
          G<span className="text-primary">3</span>
        </span>
        <span className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground">
          Washington, D.C.
        </span>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-[10vh] lg:py-[15vh]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease as unknown as [number, number, number, number] }}
          >
            <p className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground mb-8">
              Est. 2024 · Coming Soon
            </p>
            <h1 className="text-foreground text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.9] tracking-tighter">
              Governance{" "}
              <br />
              <span className="text-primary">Redefined.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-sm text-base leading-relaxed">
              Next-generation data centre infrastructure for the capital region. G3 is deploying in Washington, D.C.
            </p>
            <WaitlistForm />
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: ease as unknown as [number, number, number, number], delay: 0.2 }}
          >
            <Aperture />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full border-t border-border">
        <span className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground">
          G3 / DC
        </span>
        <div className="flex gap-6">
          <a href="#" className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            Twitter
          </a>
          <a href="#" className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
