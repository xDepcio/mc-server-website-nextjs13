// @ts-nocheck

'use client'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import leaderboard from './leaderboard'
import shop from './shop'

const rootReducer = combineReducers({
    leaderboard,
    shop
});

let enhancer: any;

type ExtendedWindow = typeof window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    if (typeof window !== 'undefined') {
        const composeEnhancers =
            (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    }
}

const configureStore = (preloadedState: any) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
