/* eslint-env browser, node */
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger'; // (Use when required)
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

export const history = createHashHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (initialState = {}) => {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [thunk, reactRouterMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger); //(Use when required)
    }

    return createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
};
export default configureStore;
