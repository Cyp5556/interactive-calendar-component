"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

export default function CalendarLayout() {
    const currentMonth = "April";
    const currentYear = 2026;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:p-10 lg:p-12">
            <motion.div
                className="w-full max-w-[1100px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* ── Title ── */}
                <motion.div
                    className="text-center mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <p
                        className="text-[11px] font-semibold tracking-[0.3em] uppercase"
                        style={{ color: "var(--muted)" }}
                    >
                        Interactive Calendar
                    </p>
                </motion.div>

                {/* ── Main Grid: Calendar (left) | Notes (right) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-5 sm:gap-6 lg:gap-7 items-start">
                    {/* ─── Left Panel: Wall Calendar Card ─── */}
                    <motion.div
                        className="calendar-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        {/* Hero Image */}
                        <HeroImage
                            month={currentMonth}
                            year={currentYear}
                            imageSrc="/hero-april.png"
                        />

                        {/* Separator — tear-edge effect */}
                        <div className="calendar-separator" />

                        {/* Month Navigation Bar */}
                        <div className="month-nav-bar">
                            <motion.button
                                className="month-nav-btn"
                                aria-label="Previous month"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </motion.button>

                            <div className="text-center">
                                <h3
                                    className="text-xl sm:text-2xl font-bold tracking-tight"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {currentMonth}
                                </h3>
                                <p
                                    className="text-[11px] font-medium tracking-widest uppercase -mt-0.5"
                                    style={{ color: "var(--muted)" }}
                                >
                                    {currentYear}
                                </p>
                            </div>

                            <motion.button
                                className="month-nav-btn"
                                aria-label="Next month"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Calendar Grid */}
                        <CalendarGrid />
                    </motion.div>

                    {/* ─── Right Panel: Notes ─── */}
                    <motion.div
                        className="lg:sticky lg:top-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        <NotesPanel />
                    </motion.div>
                </div>

                {/* ── Footer ── */}
                <motion.div
                    className="text-center mt-7 sm:mt-9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                >
                    <p
                        className="text-[10px] tracking-[0.25em] uppercase font-medium"
                        style={{ color: "var(--muted-light)" }}
                    >
                        ✦ Built with Next.js · Ant Design · Framer Motion ✦
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
