import { createStore } from 'redux';
import { authReducer } from './reducer';

export const authStore = createStore(authReducer);