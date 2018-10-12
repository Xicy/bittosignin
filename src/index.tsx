import { coreEpic, coreMiddleware, initCoreData } from '@openware/core-data';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { App } from './App';
import './index.css';
import { rootReducer } from './modules';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const API_BARONG_URL = process.env.REACT_APP_API_BARONG_URL || '';
const API_PEATIO_URL = process.env.REACT_APP_API_PEATIO_URL || '';
const API_APPLOGIC_URL = process.env.REACT_APP_API_APPLOGIC_URL || '';
const PUSHER_WS_HOST = process.env.REACT_APP_PUSHER_WS_HOST || '';
const PUSHER_HTTP_HOST = process.env.REACT_APP_PUSHER_HTTP_HOST || '';
export const APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID || '';
export const PUSHER_KEY = process.env.REACT_APP_API_PUSHER_KEY || '';

initCoreData(
    APPLICATION_ID,
    API_APPLOGIC_URL,
    API_BARONG_URL,
    API_PEATIO_URL,
    PUSHER_WS_HOST,
    PUSHER_HTTP_HOST,
    PUSHER_KEY,
);

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(
            coreMiddleware,
        ),
    ),
);

coreMiddleware.run(coreEpic);

const render = () => ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root') as HTMLElement,
);

render();
registerServiceWorker();
