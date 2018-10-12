import { coreReducer, CoreState } from '@openware/core-data';
import { combineReducers } from 'redux';
import { uiReducer, UIState } from './ui';

export { selectWalletsItems } from './wallets';
export { selectHistoryItems, selectOpenOrdersItems } from './trading';
export { toggleSidebar } from './ui';

export * from './wallets';
export * from './trading';

export interface RootState {
    coreData: CoreState;
    ui: UIState;
}

export const rootReducer = combineReducers({
    coreData: coreReducer,
    ui: uiReducer,
});
