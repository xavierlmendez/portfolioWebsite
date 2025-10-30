'use client';

import { useState } from 'react';
import type { Indicator } from '../types';

export function useIndicators(initial?: Indicator[]) {
    const [indicators, setIndicators] = useState<Indicator[]>(
        initial ?? [
            { id: '1', indicatorName: 'RMSE', trigger: 'Buy' },
            { id: '2', indicatorName: 'Percent Amt.', trigger: 'Sell' },
        ]
    );

    const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
    const [draftIndicator, setDraftIndicator] = useState<{ indicatorName: string; trigger: 'Buy' | 'Sell' }>({
        indicatorName: '',
        trigger: 'Buy',
    });

    const openIndicatorModal = () => setIsIndicatorModalOpen(true);
    const closeIndicatorModal = () => {
        setIsIndicatorModalOpen(false);
        setDraftIndicator({ indicatorName: '', trigger: 'Buy' });
    };

    const addIndicator = () => {
        if (!draftIndicator.indicatorName.trim()) return;
        const newItem: Indicator = {
            id: Date.now().toString(),
            indicatorName: draftIndicator.indicatorName.trim(),
            trigger: draftIndicator.trigger,
        };
        setIndicators(prev => [...prev, newItem]);
        close();
    };

    const removeIndicator = (id: string) => setIndicators(prev => prev.filter(i => i.id !== id));

    return { indicators, isIndicatorModalOpen, openIndicatorModal, closeIndicatorModal, draftIndicator, setDraftIndicator, addIndicator, removeIndicator };
}