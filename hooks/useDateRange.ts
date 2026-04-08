"use client";

import { useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface DateRangeState {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
}

export interface UseDateRangeReturn {
    /** Currently selected start date */
    startDate: Dayjs | null;
    /** Currently selected end date */
    endDate: Dayjs | null;
    /** Handle a day click — implements the 3-click cycle */
    handleDateClick: (date: Dayjs) => void;
    /** Reset selection to empty */
    resetSelection: () => void;
    /** Check if a given date is the start date */
    isStartDate: (date: Dayjs) => boolean;
    /** Check if a given date is the end date */
    isEndDate: (date: Dayjs) => boolean;
    /** Check if a given date falls within the selected range (exclusive of start/end) */
    isInRange: (date: Dayjs) => boolean;
    /** Whether a complete range (both start and end) is selected */
    hasRange: boolean;
}

export function useDateRange(): UseDateRangeReturn {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const resetSelection = useCallback(() => {
        setStartDate(null);
        setEndDate(null);
    }, []);

    const handleDateClick = useCallback(
        (date: Dayjs) => {
            // Case 1: Nothing selected → set start date
            if (!startDate) {
                setStartDate(date);
                setEndDate(null);
                return;
            }

            // Case 2: Start is selected but no end yet
            if (startDate && !endDate) {
                // Clicking the same date → reset
                if (date.isSame(startDate, "day")) {
                    resetSelection();
                    return;
                }

                // If clicked date is before start, swap them
                if (date.isBefore(startDate, "day")) {
                    setEndDate(startDate);
                    setStartDate(date);
                } else {
                    setEndDate(date);
                }
                return;
            }

            // Case 3: Both start and end are selected → reset and start new selection
            if (startDate && endDate) {
                setStartDate(date);
                setEndDate(null);
                return;
            }
        },
        [startDate, endDate, resetSelection]
    );

    const isStartDate = useCallback(
        (date: Dayjs) => {
            return startDate !== null && date.isSame(startDate, "day");
        },
        [startDate]
    );

    const isEndDate = useCallback(
        (date: Dayjs) => {
            return endDate !== null && date.isSame(endDate, "day");
        },
        [endDate]
    );

    const isInRange = useCallback(
        (date: Dayjs) => {
            if (!startDate || !endDate) return false;
            return date.isAfter(startDate, "day") && date.isBefore(endDate, "day");
        },
        [startDate, endDate]
    );

    const hasRange = startDate !== null && endDate !== null;

    return {
        startDate,
        endDate,
        handleDateClick,
        resetSelection,
        isStartDate,
        isEndDate,
        isInRange,
        hasRange,
    };
}
