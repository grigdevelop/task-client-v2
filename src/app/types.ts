import { AuthAction, AuthState } from '../features/auth/types';

export type AppState = {
    auth: AuthState
};

export type AppAction = AuthAction;