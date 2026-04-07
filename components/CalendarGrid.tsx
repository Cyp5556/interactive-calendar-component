"use client";

import { motion } from "framer-motion";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Static placeholder for April 2026
const PLACEHOLDER_DAYS: (number | null)[] = [
    // Row 1: April starts on Wednesday (index 3)
    null, null, null, 1, 2, 3, 4,
    // Row 2
    5, 6, 7, 8, 9, 10, 11,
    // Row 3
    12, 13, 14, 15, 16, 17, 18,
    // Row 4
    19, 20, 21, 22, 23, 24, 25,
    // Row 5
    26, 27, 28, 29, 30, null, null,
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.02,
            delayChildren: 0.15,
        },
    },
};

const cellVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.85 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 25 },
    },
};

export default function CalendarGrid() {
    const today = 8; // April 8, 2026

    /**
     * Check if a given index falls on a weekend column (Sun=0, Sat=6)
     */
    const isWeekend = (index: number) => {
        const col = index % 7;
        return col === 0 || col === 6;
    };

    return (
        <div className="px-4 py-2.5 sm:px-5 md:px-6 md:py-3">
            {/* Weekday headers */}
            <div className="calendar-grid-header mb-1">
                {DAYS_OF_WEEK.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            {/* Day cells */}
            <motion.div
                className="calendar-grid-body"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {PLACEHOLDER_DAYS.map((day, index) => {
                    const isEmpty = day === null;
                    const isToday = day === today;
                    const isWeekendDay = !isEmpty && isWeekend(index);

                    return (
                        <motion.div
                            key={index}
                            variants={cellVariants}
                            whileHover={
                                !isEmpty
                                    ? { scale: 1.12, transition: { duration: 0.15 } }
                                    : undefined
                            }
                            whileTap={
                                !isEmpty
                                    ? { scale: 0.9, transition: { duration: 0.1 } }
                                    : undefined
                            }
                            className={[
                                "day-cell",
                                isEmpty ? "day-cell--disabled" : "",
                                isToday ? "day-cell--today" : "",
                                isWeekendDay && !isToday ? "day-cell--weekend" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {day}
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Selection hint */}
            <motion.div
                className="flex items-center justify-center gap-2 mt-3 mb-0.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
            >
                <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: "var(--muted-light)" }}
                />
                <p
                    className="text-xs tracking-wider font-medium"
                    style={{ color: "var(--muted)" }}
                >
                    Click dates to select a range
                </p>
                <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: "var(--muted-light)" }}
                />
            </motion.div>
        </div>
    );
}
