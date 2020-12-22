import { stat } from "fs";
import { AuthActions } from "./actions";
import { AuthState } from "./auth.state";

const initialState: AuthState = {
    user: 'no user'
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    // log
    console.log("authReducer:", state);

    switch (action.type) {
        case "AUTH_LOGIN":
            return { ...state, user: action.payload.username };
        case "AUTH_LOGOUT":
            return { ...state, user: 'no user' };
        default:
            return state;
    }
}