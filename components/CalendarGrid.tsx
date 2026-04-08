"use client";

import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import DayCell from "./DayCell";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
    /** The month to display (0-indexed: 0 = January) */
    month: number;
    /** The year to display */
    year: number;
    /** Handle date click from parent */
    onDateClick: (date: Dayjs) => void;
    /** Check if date is range start */
    isStartDate: (date: Dayjs) => boolean;
    /** Check if date is range end */
    isEndDate: (date: Dayjs) => boolean;
    /** Check if date is in range */
    isInRange: (date: Dayjs) => boolean;
    /** Check if a date has a saved note */
    dateHasNote: (date: Dayjs) => boolean;
    /** Get truncated note preview for a date */
    getNotePreview: (date: Dayjs) => string | null;
}

/**
 * Generates the grid cells for a given month.
 * Returns an array of (Dayjs | null) where null = empty padding cell.
 */
function generateMonthGrid(year: number, month: number): (Dayjs | null)[] {
    const firstDay = dayjs().year(year).month(month).startOf("month");
    const daysInMonth = firstDay.daysInMonth();
    const startDayOfWeek = firstDay.day(); // 0 = Sunday

    const cells: (Dayjs | null)[] = [];

    // Leading empty cells
    for (let i = 0; i < startDayOfWeek; i++) {
        cells.push(null);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push(dayjs().year(year).month(month).date(d));
    }

    // Trailing empty cells to complete the last row
    const remaining = cells.length % 7;
    if (remaining > 0) {
        for (let i = 0; i < 7 - remaining; i++) {
            cells.push(null);
        }
    }

    return cells;
}

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

export default function CalendarGrid({
    month,
    year,
    onDateClick,
    isStartDate,
    isEndDate,
    isInRange,
    dateHasNote,
    getNotePreview,
}: CalendarGridProps) {
    const today = dayjs();
    const cells = generateMonthGrid(year, month);

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
                key={`${year}-${month}`}
            >
                {cells.map((cellDate, index) => {
                    const day = cellDate ? cellDate.date() : null;
                    const isCurrentDay = cellDate
                        ? cellDate.isSame(today, "day")
                        : false;
                    const col = index % 7;
                    const isWeekend = col === 0 || col === 6;

                    return (
                        <DayCell
                            key={`${year}-${month}-${index}`}
                            date={cellDate}
                            day={day}
                            isToday={isCurrentDay}
                            isWeekend={isWeekend}
                            isStart={cellDate ? isStartDate(cellDate) : false}
                            isEnd={cellDate ? isEndDate(cellDate) : false}
                            inRange={cellDate ? isInRange(cellDate) : false}
                            hasNote={cellDate ? dateHasNote(cellDate) : false}
                            notePreview={cellDate ? getNotePreview(cellDate) : null}
                            onClick={onDateClick}
                        />
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
