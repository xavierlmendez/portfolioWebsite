export type Ticker = { id: string };

export type Indicator = {
    id: string;
    indicatorName: string;
    trigger: 'Buy' | 'Sell';
};

export type NewIndicator = {
    indicatorName: string
    trigger: 'Buy' | 'Sell'
}

export type TimePeriod = {
    start: Date
    stop: Date
}