import { Dispatch } from 'react';
import { LoginInput, ThunkResult, actions as Auth } from '../types';
import { ApiContainer } from '../../../api/types';


function loginRequest(input: LoginInput): Promise<LoginInput> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(input);
        }, 2000);
    });
}

type ExternalArgumentType = {
    api: ApiContainer
};

const loginAsyncThunk = (input: LoginInput): ThunkResult<Promise<Auth.AuthActions | undefined>> => {
    return async (dispatch, getState, { api }: ExternalArgumentType) => {
        // TODO: dispatch show loading
        dispatch({ type: 'AUTH_LOADING' });
        const result = await api.authApi.login(input);
        dispatch({ type: 'AUTH_LOADED' });

        if (!result.success && result.error) {
            switch (result.error.type) {
                case "form":
                    return dispatch({
                        type: 'AUTH_LOGIN_ERROR', payload: {
                            username: result.error.formErrors['username'],
                            password: result.error.formErrors['password']
                        }
                    });

            }
        } else {
            // TODO: dispatch hide loading
            return dispatch({ type: "AUTH_LOGIN", payload: { username: result.data?.userInfo.username! } });
        }
    }
}

export const loginAsync = (dispatch: Dispatch<ThunkResult<Promise<Auth.AuthActions | undefined>>>) => {
    return (input: LoginInput) => dispatch(loginAsyncThunk(input));
};

export const cleanErrors = (): Auth.AuthActions => {
    return {
        type: "AUTH_CLEAN_ERRORS"
    };
};