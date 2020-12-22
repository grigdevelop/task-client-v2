import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../features/auth/store/reducer';

const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(reducers, applyMiddleware(thunk));