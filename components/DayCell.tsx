"use client";

import { motion } from "framer-motion";
import { Dayjs } from "dayjs";

interface DayCellProps {
    /** The date this cell represents, or null for empty padding cells */
    date: Dayjs | null;
    /** Day number to display */
    day: number | null;
    /** Whether this is the current day */
    isToday: boolean;
    /** Whether this falls on a weekend column (Sun or Sat) */
    isWeekend: boolean;
    /** Whether this is the selected start date */
    isStart: boolean;
    /** Whether this is the selected end date */
    isEnd: boolean;
    /** Whether this falls within the selected range */
    inRange: boolean;
    /** Whether this date has a saved note */
    hasNote: boolean;
    /** Click handler */
    onClick: (date: Dayjs) => void;
}

const cellVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.85 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    },
};

export default function DayCell({
    date,
    day,
    isToday,
    isWeekend,
    isStart,
    isEnd,
    inRange,
    hasNote,
    onClick,
}: DayCellProps) {
    const isEmpty = day === null || date === null;

    // Build class list based on state
    const classes = [
        "day-cell",
        isEmpty ? "day-cell--disabled" : "",
        isToday && !isStart && !isEnd ? "day-cell--today" : "",
        isWeekend && !isToday && !isStart && !isEnd && !inRange
            ? "day-cell--weekend"
            : "",
        isStart ? "day-cell--selected-start" : "",
        isEnd ? "day-cell--selected-end" : "",
        inRange ? "day-cell--in-range" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleClick = () => {
        if (!isEmpty && date) {
            onClick(date);
        }
    };

    return (
        <motion.div
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
            className={classes}
            onClick={handleClick}
            role={!isEmpty ? "button" : undefined}
            tabIndex={!isEmpty ? 0 : undefined}
            aria-label={
                date
                    ? `${date.format("MMMM D, YYYY")}${isStart ? " (start of range)" : ""}${isEnd ? " (end of range)" : ""}${inRange ? " (in selected range)" : ""}`
                    : undefined
            }
            onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isEmpty && date) {
                    e.preventDefault();
                    onClick(date);
                }
            }}
        >
            {day}
            {/* Note indicator dot */}
            {hasNote && !isStart && !isEnd && !isToday && (
                <span
                    className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full"
                    style={{ background: "var(--accent)" }}
                />
            )}
        </motion.div>
    );
}
