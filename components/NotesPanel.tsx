"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    EditOutlined,
    PushpinOutlined,
    SaveOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

interface NotesPanelProps {
    /** Formatted range label like "Apr 5 – Apr 18, 2026" or null */
    rangeLabel: string | null;
    /** Whether a complete range (start + end) is selected */
    hasRange: boolean;
    /** Whether any date is selected at all */
    hasSelection: boolean;
    /** Current note text */
    noteText: string;
    /** Set the note text */
    onNoteChange: (text: string) => void;
    /** Save the note */
    onSave: () => void;
    /** Delete the note */
    onDelete: () => void;
    /** Whether the note has unsaved changes */
    isDirty: boolean;
    /** Whether note was just saved (for feedback) */
    justSaved: boolean;
    /** Total count of saved notes */
    noteCount: number;
    /** Month label for display */
    monthLabel: string;
}

export default function NotesPanel({
    rangeLabel,
    hasRange,
    hasSelection,
    noteText,
    onNoteChange,
    onSave,
    onDelete,
    isDirty,
    justSaved,
    noteCount,
    monthLabel,
}: NotesPanelProps) {
    const canSave = hasSelection && noteText.trim().length > 0 && isDirty;

    return (
        <motion.div
            className="notes-panel p-4 sm:p-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-3.5 pt-0.5">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="flex items-center justify-center w-9 h-9 rounded-xl"
                        style={{ background: "var(--accent-light)" }}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <EditOutlined
                            style={{ color: "var(--accent)", fontSize: "15px" }}
                        />
                    </motion.div>
                    <div>
                        <h3
                            className="text-base font-bold tracking-tight leading-none"
                            style={{ color: "var(--foreground)" }}
                        >
                            Notes
                        </h3>
                        <p
                            className="text-[10px] font-medium mt-0.5 tracking-wide uppercase"
                            style={{ color: "var(--muted)" }}
                        >
                            {noteCount > 0 ? `${noteCount} saved` : "Monthly Memo"}
                        </p>
                    </div>
                </div>
                <span
                    className="text-[11px] px-3 py-1.5 rounded-full font-semibold"
                    style={{
                        background: "var(--surface)",
                        color: "var(--muted)",
                        border: "1px solid var(--card-border)",
                    }}
                >
                    {monthLabel}
                </span>
            </div>

            {/* ── Divider ── */}
            <div
                className="h-px mb-3"
                style={{ background: "var(--card-border)" }}
            />

            {/* ── Context Card: shows selected range or hint ── */}
            <AnimatePresence mode="wait">
                {hasSelection ? (
                    <motion.div
                        key="selection-info"
                        className="notes-pin-card mb-4"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CalendarOutlined
                            style={{
                                color: "var(--accent)",
                                marginTop: "1px",
                                fontSize: "14px",
                                flexShrink: 0,
                            }}
                        />
                        <div>
                            <p
                                className="text-[13px] font-semibold leading-snug"
                                style={{ color: "var(--accent-dark)" }}
                            >
                                {hasRange ? "Date Range" : "Single Date"} Selected
                            </p>
                            <p
                                className="text-[12px] mt-0.5 font-medium"
                                style={{ color: "var(--foreground)" }}
                            >
                                {rangeLabel}
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="no-selection"
                        className="notes-pin-card mb-4"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PushpinOutlined
                            style={{
                                color: "var(--accent)",
                                marginTop: "1px",
                                fontSize: "14px",
                                flexShrink: 0,
                            }}
                        />
                        <div>
                            <p
                                className="text-[13px] font-semibold leading-snug"
                                style={{ color: "var(--accent-dark)" }}
                            >
                                Select dates to attach notes
                            </p>
                            <p
                                className="text-[11px] mt-1 leading-relaxed flex items-center gap-1"
                                style={{ color: "var(--muted)" }}
                            >
                                <InfoCircleOutlined style={{ fontSize: "10px" }} />
                                Notes are saved locally in your browser
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Textarea ── */}
            <div className="relative mb-3">
                <label
                    className="block text-[11px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--muted)" }}
                >
                    {hasSelection ? "Your note" : "Your memo"}
                </label>
                <textarea
                    className="notes-textarea"
                    placeholder={
                        hasSelection
                            ? `Write a note for ${rangeLabel}...`
                            : "Select a date first to write notes..."
                    }
                    rows={4}
                    value={noteText}
                    onChange={(e) => onNoteChange(e.target.value)}
                    disabled={!hasSelection}
                />

                {/* Character count */}
                {hasSelection && noteText.length > 0 && (
                    <motion.span
                        className="absolute bottom-2 right-3 text-[10px] font-medium"
                        style={{ color: "var(--muted-light)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {noteText.length} chars
                    </motion.span>
                )}
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex gap-2">
                {/* Save button */}
                <motion.button
                    className="notes-save-btn flex-1 flex items-center justify-center gap-2"
                    whileHover={canSave ? { scale: 1.015 } : undefined}
                    whileTap={canSave ? { scale: 0.985 } : undefined}
                    disabled={!canSave}
                    onClick={onSave}
                >
                    {justSaved ? (
                        <>
                            <CheckCircleOutlined style={{ fontSize: "14px" }} />
                            Saved!
                        </>
                    ) : (
                        <>
                            <SaveOutlined style={{ fontSize: "14px" }} />
                            {isDirty ? "Save Changes" : "Save Note"}
                        </>
                    )}
                </motion.button>

                {/* Delete button — only show when there's a saved note */}
                {hasSelection && noteText.trim().length > 0 && !isDirty && (
                    <motion.button
                        className="flex items-center justify-center w-10 rounded-[10px] transition-all"
                        style={{
                            border: "1.5px solid var(--card-border)",
                            color: "var(--muted)",
                            background: "var(--card-bg)",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDelete}
                        title="Delete this note"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#e74c3c";
                            e.currentTarget.style.color = "#e74c3c";
                            e.currentTarget.style.background = "#fdf2f2";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--card-border)";
                            e.currentTarget.style.color = "var(--muted)";
                            e.currentTarget.style.background = "var(--card-bg)";
                        }}
                    >
                        <DeleteOutlined style={{ fontSize: "13px" }} />
                    </motion.button>
                )}
            </div>

            {/* ── Save Feedback Toast ── */}
            <AnimatePresence>
                {justSaved && (
                    <motion.div
                        className="flex items-center justify-center gap-1.5 mt-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                        style={{
                            background: "#f0fdf4",
                            color: "#16a34a",
                            border: "1px solid #bbf7d0",
                        }}
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <CheckCircleOutlined style={{ fontSize: "12px" }} />
                        Note saved successfully
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Footer info ── */}
            <motion.p
                className="text-center text-[10px] mt-2.5 tracking-widest uppercase font-medium"
                style={{ color: "var(--muted-light)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Stored in browser · No server needed
            </motion.p>
        </motion.div>
    );
}
