"use client";

import { motion } from "framer-motion";
import { EditOutlined, PushpinOutlined } from "@ant-design/icons";

export default function NotesPanel() {
    return (
        <motion.div
            className="notes-panel p-5 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                        style={{ background: "var(--accent-light)" }}
                    >
                        <EditOutlined
                            style={{ color: "var(--accent)", fontSize: "14px" }}
                        />
                    </div>
                    <h3
                        className="text-base font-semibold tracking-tight"
                        style={{ color: "var(--foreground)" }}
                    >
                        Notes
                    </h3>
                </div>
                <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                        background: "var(--surface)",
                        color: "var(--muted)",
                    }}
                >
                    April 2026
                </span>
            </div>

            {/* Pinned note placeholder */}
            <motion.div
                className="flex items-start gap-2.5 p-3 rounded-xl mb-4"
                style={{
                    background: "var(--accent-light)",
                    border: "1px solid var(--accent)",
                    borderColor: "rgba(201, 123, 90, 0.2)",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
            >
                <PushpinOutlined
                    style={{ color: "var(--accent)", marginTop: "2px", fontSize: "13px" }}
                />
                <div>
                    <p
                        className="text-sm font-medium"
                        style={{ color: "var(--accent-dark)" }}
                    >
                        Select dates on the calendar to attach notes
                    </p>
                    <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--muted)" }}
                    >
                        Your notes are saved locally
                    </p>
                </div>
            </motion.div>

            {/* Textarea */}
            <textarea
                className="notes-textarea"
                placeholder="Write your notes here..."
                rows={5}
                disabled
            />

            {/* Save button placeholder */}
            <motion.button
                className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide cursor-not-allowed"
                style={{
                    background: "var(--accent)",
                    color: "#fff",
                    opacity: 0.5,
                    border: "none",
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled
            >
                Save Note
            </motion.button>

            <p
                className="text-center text-xs mt-2.5 tracking-wide"
                style={{ color: "var(--muted)" }}
            >
                Notes are stored in your browser
            </p>
        </motion.div>
    );
}
