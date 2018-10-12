import { WalletItemProps } from '@openware/components';
import { selectAccountWallets } from '@openware/core-data';
import { RootState } from '../index';

export const selectWalletsItems = (state: RootState): WalletItemProps[] =>
    selectAccountWallets(state).map(w => ({ ...w, active: false }));
