import { Dispatch } from 'react';
import { LoginInput, ThunkResult } from '../types';


function loginRequest(input: LoginInput): Promise<LoginInput> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(input);
        }, 2000);
    });
}

const loginAsyncThunk = (input: LoginInput): ThunkResult<Promise<AuthActions>> => {
    return async (dispatch, getState) => {
        // TODO: dispatch show loading
        dispatch({ type: 'AUTH_LOADING' });
        const result = await loginRequest(input);
        dispatch({ type: 'AUTH_LOADED' });
        // TODO: dispatch hide loading
        return dispatch({ type: "AUTH_LOGIN", payload: { username: result.username } });
    }
}

export const loginAsync = (dispatch: Dispatch<ThunkResult<Promise<AuthActions>>>) => {
    return (input: LoginInput) => dispatch(loginAsyncThunk(input));
};
