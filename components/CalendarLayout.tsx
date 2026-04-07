"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

export default function CalendarLayout() {
    const currentMonth = "April";
    const currentYear = 2026;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
            <motion.div
                className="w-full max-w-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Main Grid: Hero+Calendar (left) | Notes (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
                    {/* ─── Left Panel: Calendar Card ─── */}
                    <div className="calendar-card">
                        {/* Hero Image */}
                        <HeroImage
                            month={currentMonth}
                            year={currentYear}
                            imageSrc="/hero-april.png"
                        />

                        {/* Month Navigation */}
                        <div className="flex items-center justify-between px-5 py-3 border-b"
                            style={{ borderColor: "var(--card-border)" }}
                        >
                            <button className="month-nav-btn" aria-label="Previous month">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>

                            <h3
                                className="text-lg font-bold tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {currentMonth} {currentYear}
                            </h3>

                            <button className="month-nav-btn" aria-label="Next month">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <CalendarGrid />
                    </div>

                    {/* ─── Right Panel: Notes ─── */}
                    <div className="lg:sticky lg:top-8">
                        <NotesPanel />
                    </div>
                </div>

                {/* Footer branding */}
                <motion.p
                    className="text-center text-xs mt-6 tracking-wider"
                    style={{ color: "var(--muted)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    ✦ Interactive Calendar Component
                </motion.p>
            </motion.div>
        </div>
    );
}
