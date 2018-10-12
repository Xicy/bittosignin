import { UI_TOGGLE_SIDEBAR } from './constants';

interface UIState {
    sidebarVisible: boolean;
}

const initialState: UIState = {
    sidebarVisible: false,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarVisible: !state.sidebarVisible,
            };
        default:
            return state;
    }
};

export {
    uiReducer,
    UIState,
};
