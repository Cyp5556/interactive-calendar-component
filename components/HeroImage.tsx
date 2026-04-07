"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroImageProps {
  month: string;
  year: number;
  imageSrc: string;
}

export default function HeroImage({ month, year, imageSrc }: HeroImageProps) {
  return (
    <motion.div
      className="hero-image-wrapper w-full"
      style={{ height: "clamp(240px, 42vh, 400px)" }}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image
        src={imageSrc}
        alt={`${month} ${year} calendar hero`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
        priority
        className="object-cover"
      />

      {/* Gradient overlay with month/year */}
      <div className="hero-overlay">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Year label */}
          <motion.p
            className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            ── {year} ──
          </motion.p>

          {/* Month name — large and prominent */}
          <h2
            className="text-white text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight mt-1 leading-none"
            style={{
              fontFamily: "var(--font-display)",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            {month}
          </h2>

          {/* Decorative line under month */}
          <motion.div
            className="mt-2.5 h-[2px] w-12 rounded-full bg-white/40"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Decorative calendar binding holes */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-[30%] pt-2.5 pointer-events-none">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Ring / hole */}
            <div className="w-5 h-5 rounded-full border-2 border-white/25 bg-black/10 backdrop-blur-[2px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
            {/* Wire hint going up */}
            <div className="w-[1px] h-1.5 bg-white/15 -mt-0.5" />
          </div>
        ))}
      </div>

      {/* Subtle inner shadow at bottom edge for depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.08), transparent)",
        }}
      />
    </motion.div>
  );
}
