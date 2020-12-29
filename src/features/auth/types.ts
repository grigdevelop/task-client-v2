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

export namespace AuthActions {

    export type Auth_LoginAction = {
        type: 'AUTH_LOGIN',
        payload: {
            username: string;
        }
    };

    export type Auth_LogoutAction = {
        type: 'AUTH_LOGOUT'
    };

    export type Auth_LoadingAction = {
        type: 'AUTH_LOADING'
    };

    export type Auth_LoadedAction = {
        type: 'AUTH_LOADED'
    };

    export type Auth_LoginErrorsAction = {
        type: 'AUTH_LOGIN_ERROR',
        payload: {
            username: string | null;
            password: string | null;
        }
    }

    export type Auth_CleanErrorsAction = {
        type: 'AUTH_CLEAN_ERRORS'
    };


}

export type AuthAction = AuthActions.Auth_LoginAction
    | AuthActions.Auth_LogoutAction
    | AuthActions.Auth_LoadingAction
    | AuthActions.Auth_LoadedAction
    | AuthActions.Auth_LoginErrorsAction
    | AuthActions.Auth_CleanErrorsAction;

export type AuthActionTypes = PropType<AuthAction, "type">;

export type ThunkResult<R> = ThunkAction<R, AppState, { api: any }, AuthAction>;