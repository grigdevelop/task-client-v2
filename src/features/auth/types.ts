import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../app';

export type LoginInput = {
    username: string;
    password: string;
};

export type AuthState = {
    readonly user: {
        username: string
    } | null,
    readonly isLoading: boolean,
    errors: {
        username: string | null;
        password: string | null;
    } | null
}

export namespace actions {

    export type LoginActionType = {
        type: 'AUTH_LOGIN',
        payload: {
            username: string;
        }
    };

    export type LogoutActionType = {
        type: 'AUTH_LOGOUT'
    };

    export type AuthLoadingActionType = {
        type: 'AUTH_LOADING'
    };

    export type AuthLoadedActionType = {
        type: 'AUTH_LOADED'
    };

    export type LoginErrorType = {
        type: 'AUTH_LOGIN_ERROR',
        payload: {
            username: string | null;
            password: string | null;
        }
    }

    export type Auth_CleanErrorType = {
        type: 'AUTH_CLEAN_ERRORS'
    };

    export type AuthActions = LoginActionType | LogoutActionType |
        AuthLoadingActionType | AuthLoadedActionType |
        LoginErrorType | Auth_CleanErrorType;
    export type AuthActionTypes = PropType<AuthActions, "type">;
}

export type ThunkResult<R> = ThunkAction<R, AppState, { api: any }, actions.AuthActions>;