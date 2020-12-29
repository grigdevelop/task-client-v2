import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ApiContainer } from '../api/types';

import { authReducer } from '../features/auth/store/auth.reducer';

export function configureStore(api: ApiContainer) {
    const reducers = combineReducers({
        auth: authReducer
    });

    const composeEnhencers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, composeEnhencers(
        applyMiddleware(thunk.withExtraArgument({ api })
        )));

    return store;
}
