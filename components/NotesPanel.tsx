"use client";

import { motion } from "framer-motion";
import {
    EditOutlined,
    PushpinOutlined,
    SaveOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

export default function NotesPanel() {
    return (
        <motion.div
            className="notes-panel p-5 sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
        >
            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-5 pt-1">
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
                            Monthly Memo
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
                    April 2026
                </span>
            </div>

            {/* ── Divider ── */}
            <div
                className="h-px mb-4"
                style={{ background: "var(--card-border)" }}
            />

            {/* ── Pinned hint card ── */}
            <motion.div
                className="notes-pin-card mb-5"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
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
                        Select dates on the calendar to attach notes
                    </p>
                    <p
                        className="text-[11px] mt-1 leading-relaxed flex items-center gap-1"
                        style={{ color: "var(--muted)" }}
                    >
                        <InfoCircleOutlined style={{ fontSize: "10px" }} />
                        Your notes are saved locally in your browser
                    </p>
                </div>
            </motion.div>

            {/* ── Textarea ── */}
            <div className="relative mb-4">
                <label
                    className="block text-[11px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--muted)" }}
                >
                    Your memo
                </label>
                <textarea
                    className="notes-textarea"
                    placeholder="Write your notes for this month..."
                    rows={5}
                    disabled
                />
            </div>

            {/* ── Save Button ── */}
            <motion.button
                className="notes-save-btn flex items-center justify-center gap-2"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                disabled
            >
                <SaveOutlined style={{ fontSize: "14px" }} />
                Save Note
            </motion.button>

            {/* ── Footer info ── */}
            <motion.p
                className="text-center text-[10px] mt-3 tracking-widest uppercase font-medium"
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
