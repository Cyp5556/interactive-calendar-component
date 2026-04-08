"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/** Map month index (0–11) to its hero image path */
const MONTH_IMAGES: Record<number, string> = {
  0: "/hero-january.png",
  1: "/hero-february.png",
  2: "/hero-march.png",
  3: "/hero-april.png",
  4: "/hero-may.png",
  5: "/hero-june.png",
  6: "/hero-july.png",
  7: "/hero-august.png",
  8: "/hero-september.png",
  9: "/hero-october.png",
  10: "/hero-november.png",
  11: "/hero-december.png",
};

interface HeroImageProps {
  month: string;
  year: number;
  monthIndex: number;
}

export default function HeroImage({ month, year, monthIndex }: HeroImageProps) {
  const imageSrc = MONTH_IMAGES[monthIndex] ?? "/hero-april.png";

  return (
    <motion.div
      className="hero-image-wrapper w-full"
      style={{ height: "clamp(160px, 24vh, 260px)" }}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Crossfade hero image on month change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`hero-${monthIndex}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Image
            src={imageSrc}
            alt={`${month} ${year} calendar hero`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            priority={monthIndex === new Date().getMonth()}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay with month/year */}
      <div className="hero-overlay">
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${monthIndex}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Year label */}
            <p
              className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              ── {year} ──
            </p>

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
              className="mt-2.5 h-[2px] rounded-full bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative calendar binding holes */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-[30%] pt-2.5 pointer-events-none">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full border-2 border-white/25 bg-black/10 backdrop-blur-[2px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
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
