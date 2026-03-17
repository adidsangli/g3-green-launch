"use client";

import { motion } from "framer-motion";
import Aperture from "@/components/Aperture";
import WaitlistForm from "@/components/WaitlistForm";
import Image from "next/image";
import logo from "../../public/logo.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export default function IndexPage() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background">
      {/* Nav */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[95%] max-w-10xl">
        <div className="relative flex items-center justify-between h-14 md:h-16 px-4 md:px-6 rounded-full border border-border/50 bg-background/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl font-semibold tracking-tighter leading-none">
              G<span className="text-teal-700">3</span>
            </span>
            <div className="w-px h-6 bg-border" />
            <Image src={logo} alt="G3" width={60} height={60} />
          </div>

          {/* Center label — hidden on small screens to prevent overflow */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono-label text-[16px] tracking-[0.2em] uppercase leading-[1.8] text-muted-foreground pointer-events-none whitespace-nowrap">
            GLOBAL GREEN GRID
          </div>

          <div className="flex-1 min-w-0" aria-hidden />
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 relative flex items-center justify-center md:justify-start px-6 md:px-8 w-full min-h-0">

        {/* Animation:
            mobile  → fills full screen, dimmed so text stays readable
            desktop → right-side column */}
        <motion.div
          className="absolute inset-0 md:inset-auto md:right-0 md:top-24 md:bottom-0 md:w-[60%] pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: ease as unknown as [number, number, number, number], delay: 0.2 }}
        >
          {/* Inner wrapper keeps resting opacity low on mobile without fighting framer-motion */}
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
          </div>
        </motion.div>
      </main>
    </div>
  );
}
