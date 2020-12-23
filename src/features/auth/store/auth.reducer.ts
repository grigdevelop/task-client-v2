import { AuthState, AuthAction } from '../types';


const initialState: AuthState = {
    user: null,
    isLoading: false,
    errors: null
};

export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {

    switch (action.type) {
        case "AUTH_LOGIN":
            return { ...state, user: { username: action.payload.username } };
        case "AUTH_LOGOUT":
            return { ...state, user: null };
        case "AUTH_LOADING":
            return { ...state, isLoading: true };
        case "AUTH_LOADED":
            return { ...state, isLoading: false };
        case "AUTH_LOGIN_ERROR":
            return { ...state, errors: action.payload };
        case "AUTH_CLEAN_ERRORS":
            return { ...state, errors: null };
        default:
            return state;
    }
}