import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLocalApi } from '../api/local';

import { authReducer } from '../features/auth/store/reducer';

const reducers = combineReducers({
    auth: authReducer
})

const api = createLocalApi();

const composeEnhencers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhencers(
    applyMiddleware(thunk.withExtraArgument({ api })
    )));