import { LoginInput } from '../types';
import { AuthActions} from './actions';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../store/app.state';
import { Dispatch } from 'react';

export const login = (input : LoginInput) : AuthActions => ({type: "AUTH_LOGIN", payload: input});
export const logout = () : AuthActions => ({type: "AUTH_LOGOUT"});

type ThunkResult<R> = ThunkAction<R, AppState, undefined, AuthActions>;

function loginRequest(input: LoginInput) : Promise<LoginInput>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(input);
        }, 2000);
    });
}

const loginAsyncThunk = ( input: LoginInput ) : ThunkResult<Promise<AuthActions>> => {
    return async (dispatch, getState) => {
        // TODO: dispatch show loading
        const result = await loginRequest(input);        
        // TODO: dispatch hide loading
        return dispatch({type: "AUTH_LOGIN", payload: result});        
    }
}

export const loginAsync = (dispatch : Dispatch<ThunkResult<Promise<AuthActions>>>) => {
    return (input: LoginInput) => dispatch(loginAsyncThunk(input));
};
