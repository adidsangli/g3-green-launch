"use client";

import { motion } from "framer-motion";
import Aperture from "@/components/Aperture";
import Image from "next/image";
import logo from "../../public/logo.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export default function IndexPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">

      {/* ── Nav ──────────────────────────────────────────────────── */}
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

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <main className="relative flex-1 flex items-center justify-center md:justify-start px-6 md:px-8 overflow-hidden">

        {/* Aperture — smaller, entrance + continuous float */}
        <motion.div
          className="absolute inset-0 md:inset-auto md:right-0 md:top-16 md:bottom-0 md:w-[46%] pointer-events-none"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: ease as unknown as [number, number, number, number], delay: 0.15 }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          >
            <div className="w-full h-full opacity-[0.12] md:opacity-100">
              <Aperture />
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="relative z-10 w-full max-w-lg [&_h1]:m-0 [&_p]:m-0"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: ease as unknown as [number, number, number, number], delay: 0.3 }}
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
          </div>
        </motion.div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-teal-950 px-8 md:px-14 py-6 flex-shrink-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <span className="text-white text-2xl font-semibold tracking-tighter leading-none">
              G<span className="text-teal-400">3</span>
            </span>
            <div className="w-px h-5 bg-teal-700/50" />
            <Image src={logo} alt="G3" width={36} height={36} className="rounded-sm opacity-80" />
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 text-teal-100/40 text-[11px]">
            {["Privacy", "Terms", "Contact"].map((item, i) => (
              <span key={item} className="flex items-center gap-1">
                {i > 0 && <span className="opacity-30">·</span>}
                <span className="hover:text-teal-300 transition-colors cursor-pointer">{item}</span>
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-teal-100/25 text-[11px] tracking-wide">
            © {new Date().getFullYear()} Global Green Grid. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
