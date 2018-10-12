import { HistoryProps } from '@openware/components';
// import { selectAccountWallets } from '@openware/core-data';
import { RootState } from '../index';

const data = [
    ['10:40', 'Market', 'BTC/USDT', 'Buy', '9.400,0', '0, 4005', '3.459'],
    ['10:40', 'Market', 'BTC/USDT', 'Sell', '9.400,0', '0, 4005', '3.459'],
    ['10:40', 'Limit', 'BTC/USDT', 'Buy', '9.400,0', '0, 4005', '3.459'],
    ['10:40', 'Market', 'BTC/USDT', 'Sell', '9.400,0', '0, 4005', '3.459'],
    ['10:40', 'Limit', 'BTC/USDT', 'Buy', '9.400,0', '0, 4005', '3.459'],
    ['10:40', 'Market', 'BTC/USDT', 'Sell', '9.400,0', '0, 4005', '3.459'],
    ['10:40', 'Limit', 'BTC/USDT', 'Buy', '9.400,0', '0, 4005', '3.459'],
];

const openOrdersData = [
    ['10:40', '9.400,0', '3.459', 'buy'],
    ['10:40', '9.400,0', '3.459', 'buy'],
    ['10:40', '9.400,0', '0, 4005', 'sell'],
    ['10:40', '9.400,0', '0, 4005', 'sell'],
    ['10:40', '9.400,0', '3.459', 'buy'],
];

export const selectHistoryItems = (state: RootState): HistoryProps =>
    ({ data });

export const selectOpenOrdersItems = (state: RootState): string[][] =>
    openOrdersData;
