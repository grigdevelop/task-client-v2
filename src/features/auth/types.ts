import { ThunkAction } from 'redux-thunk';

export type LoginInput = {
    username: string;
    password: string;
};

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AuthActions>;