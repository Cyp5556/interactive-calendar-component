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
      style={{ height: "clamp(220px, 40vh, 380px)" }}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image
        src={imageSrc}
        alt={`${month} ${year} calendar hero`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="object-cover"
      />

      {/* Gradient overlay with month/year */}
      <div className="hero-overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p
            className="text-white/70 text-sm font-medium tracking-widest uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {year}
          </p>
          <h2
            className="text-white text-3xl md:text-4xl font-bold tracking-tight mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {month}
          </h2>
        </motion.div>
      </div>

      {/* Decorative calendar pin */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-40">
        <div className="w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 shadow-md" />
        <div className="w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 shadow-md" />
      </div>
    </motion.div>
  );
}
