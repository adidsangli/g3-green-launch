"use client";

import { motion } from "framer-motion";
import Aperture from "@/components/Aperture";
import WaitlistForm from "@/components/WaitlistForm";

const ease = [0.16, 1, 0.3, 1] as const;

const FOOTER_H = 220;

export default function IndexPage() {
  return (
    <>
      {/* Footer is fixed at the bottom, behind everything */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-0 bg-teal-950 flex flex-col justify-between px-8 md:px-16 py-10"
        style={{ height: FOOTER_H }}
      >
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-teal-300 text-xs tracking-[0.25em] uppercase font-mono mb-2">
              Global Green Grid
            </p>
            <p className="text-teal-100/40 text-xs max-w-xs leading-relaxed">
              Next-generation data centre infrastructure built for the intelligence era.
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-2 text-right">
            <span className="text-teal-100/40 text-xs tracking-widest uppercase">G3</span>
            <span className="text-teal-100/25 text-[10px]">Coming Soon</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-teal-800/50 pt-6">
          <p className="text-teal-100/30 text-[11px] tracking-wide">
            © {new Date().getFullYear()} Global Green Grid. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <span
                key={item}
                className="text-teal-100/40 text-[11px] tracking-wide hover:text-teal-300 transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* Hero — sits above the footer; scrolls away to reveal it */}
      <div className="relative z-10 bg-background" style={{ minHeight: `calc(100vh + ${FOOTER_H}px)` }}>
        {/* Nav */}
        <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[95%] max-w-10xl">
          <div className="relative flex items-center justify-between h-14 md:h-16 px-4 md:px-6 rounded-full border border-border/50 bg-background/70 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-2xl font-semibold tracking-tighter leading-none">
                G<span className="text-teal-700">3</span>
              </span>
              <div className="w-px h-6 bg-border" />
              <div className="font-mono-label text-[7px] tracking-[0.2em] uppercase leading-[1.8] text-muted-foreground">
                Global<br />Green<br />Grid
              </div>
            </div>
            <div className="flex-1 min-w-0" aria-hidden />
          </div>
        </nav>

        {/* Main — fills exactly the viewport height */}
        <main className="relative flex items-center justify-center md:justify-start px-6 md:px-8 w-full" style={{ height: "100vh" }}>
          {/* Aperture animation */}
          <motion.div
            className="absolute inset-0 md:inset-auto md:right-0 md:top-24 md:bottom-0 md:w-[60%] pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: ease as unknown as [number, number, number, number], delay: 0.2 }}
          >
            <div className="w-full h-full opacity-[0.15] md:opacity-100">
              <Aperture />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="relative z-10 w-full max-w-lg [&_h1]:m-0 [&_p]:m-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease as unknown as [number, number, number, number] }}
          >
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground">
                Coming Soon
              </p>
              <h1 className="text-foreground text-[clamp(2.8rem,10vw,5.5rem)] font-semibold leading-[0.9] tracking-tighter pt-6 md:pt-8">
                Data Centre{" "}
                <br />
                <span className="text-teal-700">Reimagined.</span>
              </h1>
              <p className="text-muted-foreground max-w-xs md:max-w-sm text-base leading-relaxed pt-5 md:pt-6">
                Infrastructure that thinks.
              </p>
              <br />
              <p className="font-mono-label text-xs tracking-widest uppercase text-muted-foreground">
                AI . DATA CENTRE . INFRASTRUCTURE
              </p>
              <WaitlistForm />
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
