"use client";

import { motion } from "framer-motion";
import dayjs from "dayjs";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export default function CalendarLayout() {
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    // Date range selection state
    const {
        startDate,
        endDate,
        handleDateClick,
        resetSelection,
        isStartDate,
        isEndDate,
        isInRange,
        hasRange,
    } = useDateRange();

    // Notes persistence (linked to current selection)
    const {
        noteText,
        setNoteText,
        saveNote,
        deleteNote,
        isDirty,
        justSaved,
        dateHasNote,
        noteCount,
    } = useNotes(startDate, endDate);

    const monthName = MONTH_NAMES[currentMonth];
    const monthLabel = `${monthName} ${currentYear}`;
    const hasSelection = startDate !== null;

    // Format the selected range for display
    const rangeLabel = (() => {
        if (!startDate) return null;
        if (!endDate) return startDate.format("MMM D, YYYY");
        return `${startDate.format("MMM D")} – ${endDate.format("MMM D, YYYY")}`;
    })();

    return (
        <div className="min-h-screen flex items-start justify-center px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-6 lg:px-12 lg:py-8">
            <motion.div
                className="w-full max-w-[1100px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* ── Title ── */}
                <motion.div
                    className="text-center mb-4 sm:mb-5"
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
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-4 sm:gap-5 lg:gap-6 items-start">
                    {/* ─── Left Panel: Wall Calendar Card ─── */}
                    <motion.div
                        className="calendar-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        {/* Hero Image */}
                        <HeroImage
                            month={monthName}
                            year={currentYear}
                            imageSrc="/hero-april.png"
                        />

                        {/* Separator */}
                        <div className="calendar-separator" />

                        {/* Month Navigation Bar */}
                        <div className="month-nav-bar">
                            <motion.button
                                className="month-nav-btn"
                                aria-label="Previous month"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </motion.button>

                            <div className="text-center">
                                <h3
                                    className="text-xl sm:text-2xl font-bold tracking-tight"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {monthName}
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
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Calendar Grid */}
                        <CalendarGrid
                            month={currentMonth}
                            year={currentYear}
                            onDateClick={handleDateClick}
                            isStartDate={isStartDate}
                            isEndDate={isEndDate}
                            isInRange={isInRange}
                            dateHasNote={dateHasNote}
                        />

                        {/* ── Selected Range Indicator ── */}
                        {rangeLabel && (
                            <motion.div
                                className="flex items-center justify-center gap-3 px-4 py-2 border-t"
                                style={{ borderColor: "var(--card-border)" }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p
                                    className="text-xs font-semibold tracking-wide"
                                    style={{ color: "var(--accent-dark)" }}
                                >
                                    {hasRange ? "📅" : "📌"} {rangeLabel}
                                </p>
                                <button
                                    onClick={() => {
                                        resetSelection();
                                    }}
                                    className="text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors"
                                    style={{
                                        background: "var(--surface)",
                                        color: "var(--muted)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "var(--accent-light)";
                                        e.currentTarget.style.color = "var(--accent-dark)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "var(--surface)";
                                        e.currentTarget.style.color = "var(--muted)";
                                    }}
                                >
                                    Clear
                                </button>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* ─── Right Panel: Notes ─── */}
                    <motion.div
                        className="lg:sticky lg:top-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        <NotesPanel
                            rangeLabel={rangeLabel}
                            hasRange={hasRange}
                            hasSelection={hasSelection}
                            noteText={noteText}
                            onNoteChange={setNoteText}
                            onSave={saveNote}
                            onDelete={deleteNote}
                            isDirty={isDirty}
                            justSaved={justSaved}
                            noteCount={noteCount}
                            monthLabel={monthLabel}
                        />
                    </motion.div>
                </div>

                {/* ── Footer ── */}
                <motion.div
                    className="text-center mt-5 sm:mt-6"
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
