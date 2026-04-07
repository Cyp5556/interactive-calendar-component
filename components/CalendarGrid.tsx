"use client";

import { motion } from "framer-motion";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Static placeholder for April 2026
const PLACEHOLDER_DAYS = [
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
            staggerChildren: 0.015,
            delayChildren: 0.2,
        },
    },
};

const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
};

export default function CalendarGrid() {
    const today = 8; // April 8, 2026 — current date

    return (
        <div className="px-4 py-3 md:px-5 md:py-4">
            {/* Weekday headers */}
            <div className="calendar-grid-header mb-2">
                {DAYS_OF_WEEK.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            {/* Day cells - static placeholder */}
            <motion.div
                className="calendar-grid-body"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {PLACEHOLDER_DAYS.map((day, index) => (
                    <motion.div
                        key={index}
                        variants={cellVariants}
                        className={`day-cell ${day === null ? "day-cell--disabled invisible" : ""
                            } ${day === today ? "day-cell--today" : ""}`}
                    >
                        {day}
                    </motion.div>
                ))}
            </motion.div>

            {/* Selection hint */}
            <motion.p
                className="text-center text-muted text-xs mt-4 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                Click dates to select a range
            </motion.p>
        </div>
    );
}
