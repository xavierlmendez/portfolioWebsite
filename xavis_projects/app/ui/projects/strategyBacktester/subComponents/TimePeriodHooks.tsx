'use client';

import { useState } from 'react';
import { TimePeriod } from '../types';

// Assume TimePeriod = { start: Date; stop: Date }
export function useTimePeriod(initialTimePeriod: TimePeriod) {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>(initialTimePeriod);

    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);

    const [startDate, setStartDate] = useState<Date>(initialTimePeriod.start);
    const [stopDate, setStopDate] = useState<Date>(initialTimePeriod.stop);

    const openStartModal = () => setIsStartModalOpen(true);
    const openStopModal = () => setIsStopModalOpen(true);

    const closeStartModal = () => setIsStartModalOpen(false);
    const closeStopModal = () => setIsStopModalOpen(false);

    // (optional) keep timePeriod in sync
    const applyStart = (d: Date) => {
        setStartDate(d);
        setTimePeriod(prev => ({ ...prev, start: d }));
    };
    const applyStop = (d: Date) => {
        setStopDate(d);
        setTimePeriod(prev => ({ ...prev, stop: d }));
    };

    return {
        timePeriod,
        isStartModalOpen,
        isStopModalOpen,
        openStartModal,
        openStopModal,
        closeStartModal,
        closeStopModal,
        startDate,
        setStartDate: applyStart, // expose the synced setters
        stopDate,
        setStopDate: applyStop,
    };
}