'use client';

import { useState, useCallback } from 'react';
import type { Ticker } from '../types';

export function useTickers(initTickers: Ticker[]) {
    const [tickers, setTickers] = useState<Ticker[]>(initTickers);
    const [isTickersOpen, setTickersOpen] = useState(false);

    const openTickers = () => setTickersOpen(true);
    const closeTickers = () => setTickersOpen(false);

    const addTicker = useCallback((symbol: string) => {
        const cleaned = symbol.trim().toUpperCase();
        setTickers(prev => (prev.some(t => t.id === cleaned) ? prev : [...prev, { id: cleaned }]));
    }, []);

    const removeTicker = useCallback((id: string) => {
        setTickers(prev => prev.filter(t => t.id !== id));
    }, []);

    return { tickers, addTicker, removeTicker, isTickersOpen, openTickers, closeTickers };
}