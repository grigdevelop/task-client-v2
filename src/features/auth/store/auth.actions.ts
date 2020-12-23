import { LoginInput, AuthAction } from '../types';
import { History, ApiExternalArgument, ThunkResult } from '../../../utils';

export const loginAsync = (input: LoginInput, history: History): ThunkResult<AuthAction> => {
    return async (dispatch, getState, { api }: ApiExternalArgument) => {

        // api request with loading
        dispatch({ type: 'AUTH_LOADING' });
        const result = await api.authApi.login(input);
        dispatch({ type: 'AUTH_LOADED' });

        // validating result
        if (!result.success && result.error) {
            switch (result.error.type) {
                case "form":
                    return dispatch({
                        type: 'AUTH_LOGIN_ERROR', payload: {
                            username: result.error.formErrors['username'],
                            password: result.error.formErrors['password']
                        }
                    });
                case "message":
                    throw new Error("Not implemented.");
                case "request":
                    throw new Error("Not implemented.");
            }
        } else {

            // successfully logged in 
            history.push('/');
            return dispatch({ type: "AUTH_LOGIN", payload: { username: result.data?.userInfo.username! } });
        }
    }
}

export const cleanErrors = (): AuthAction => {
    return {
        type: "AUTH_CLEAN_ERRORS"
    };
};