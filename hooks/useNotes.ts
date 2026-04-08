"use client";

import { useState, useEffect, useCallback } from "react";
import { Dayjs } from "dayjs";

const STORAGE_KEY = "calendar-notes";

/** Shape of all stored notes: { [rangeKey]: noteText } */
interface NotesMap {
    [key: string]: string;
}

export interface UseNotesReturn {
    /** Current note text for the active selection */
    noteText: string;
    /** Update the note text (does NOT auto-save) */
    setNoteText: (text: string) => void;
    /** Save the current note to localStorage */
    saveNote: () => void;
    /** Delete the note for the current selection */
    deleteNote: () => void;
    /** Whether the note has been modified since last save */
    isDirty: boolean;
    /** Whether a note was just saved (for toast feedback) */
    justSaved: boolean;
    /** The storage key for the current selection */
    activeKey: string | null;
    /** Check if a specific date has any note associated */
    dateHasNote: (date: Dayjs) => boolean;
    /** Get a truncated preview of the note for a given date */
    getNotePreview: (date: Dayjs) => string | null;
    /** Total number of saved notes */
    noteCount: number;
}

/**
 * Generate a storage key from the selected date range.
 * Single date: "2026-04-05"
 * Range: "2026-04-05_2026-04-18"
 */
function getRangeKey(startDate: Dayjs | null, endDate: Dayjs | null): string | null {
    if (!startDate) return null;
    const startKey = startDate.format("YYYY-MM-DD");
    if (!endDate) return startKey;
    return `${startKey}_${endDate.format("YYYY-MM-DD")}`;
}

/**
 * Read all notes from localStorage.
 */
function loadAllNotes(): NotesMap {
    if (typeof window === "undefined") return {};
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

/**
 * Write all notes to localStorage.
 */
function saveAllNotes(notes: NotesMap): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
        console.warn("Failed to save notes to localStorage");
    }
}

export function useNotes(
    startDate: Dayjs | null,
    endDate: Dayjs | null
): UseNotesReturn {
    const [allNotes, setAllNotes] = useState<NotesMap>({});
    const [noteText, setNoteText] = useState("");
    const [savedText, setSavedText] = useState("");
    const [justSaved, setJustSaved] = useState(false);

    const activeKey = getRangeKey(startDate, endDate);

    // Load all notes from localStorage on mount
    useEffect(() => {
        setAllNotes(loadAllNotes());
    }, []);

    // When the active key changes, load the corresponding note
    useEffect(() => {
        if (activeKey && allNotes[activeKey]) {
            setNoteText(allNotes[activeKey]);
            setSavedText(allNotes[activeKey]);
        } else {
            setNoteText("");
            setSavedText("");
        }
        setJustSaved(false);
    }, [activeKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const isDirty = noteText !== savedText;

    const saveNote = useCallback(() => {
        if (!activeKey) return;

        const trimmed = noteText.trim();
        const updated = { ...allNotes };

        if (trimmed.length === 0) {
            // Delete empty notes
            delete updated[activeKey];
        } else {
            updated[activeKey] = trimmed;
        }

        setAllNotes(updated);
        saveAllNotes(updated);
        setSavedText(trimmed);
        setJustSaved(true);

        // Reset "just saved" indicator after 2 seconds
        setTimeout(() => setJustSaved(false), 2000);
    }, [activeKey, noteText, allNotes]);

    const deleteNote = useCallback(() => {
        if (!activeKey) return;

        const updated = { ...allNotes };
        delete updated[activeKey];

        setAllNotes(updated);
        saveAllNotes(updated);
        setNoteText("");
        setSavedText("");
    }, [activeKey, allNotes]);

    const dateHasNote = useCallback(
        (date: Dayjs): boolean => {
            const dateStr = date.format("YYYY-MM-DD");
            // Check if this date appears in any stored key (as single date or part of a range)
            return Object.keys(allNotes).some((key) => {
                if (key === dateStr) return true;
                if (key.includes("_")) {
                    const [start, end] = key.split("_");
                    return dateStr >= start && dateStr <= end;
                }
                return false;
            });
        },
        [allNotes]
    );

    const getNotePreview = useCallback(
        (date: Dayjs): string | null => {
            const dateStr = date.format("YYYY-MM-DD");
            for (const [key, text] of Object.entries(allNotes)) {
                if (key === dateStr) {
                    return text.length > 60 ? text.slice(0, 60) + "…" : text;
                }
                if (key.includes("_")) {
                    const [start, end] = key.split("_");
                    if (dateStr >= start && dateStr <= end) {
                        return text.length > 60 ? text.slice(0, 60) + "…" : text;
                    }
                }
            }
            return null;
        },
        [allNotes]
    );

    const noteCount = Object.keys(allNotes).length;

    return {
        noteText,
        setNoteText,
        saveNote,
        deleteNote,
        isDirty,
        justSaved,
        activeKey,
        dateHasNote,
        getNotePreview,
        noteCount,
    };
}
