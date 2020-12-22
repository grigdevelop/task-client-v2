import { Action } from 'redux';
import { LoginInput } from './../types';

interface LoginAction extends Action {
    type: 'AUTH_LOGIN';
    payload: LoginInput;
}

interface LogoutAction extends Action {
    type: 'AUTH_LOGOUT';
}

export type AuthActions = LoginAction | LogoutAction;
export type AuthActionTypes = PropType<AuthActions, "type">;