'use client'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tweet from './tweet'
import leaderboard from './leaderboard'
import shop from './shop'

const rootReducer = combineReducers({
  leaderboard,
  shop
});

// @ts-ignore
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// @ts-ignore
const configureStore = (preloadedState) => {
  // @ts-ignore
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
