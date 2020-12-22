const initialState: AuthState = {
    user: null,
    isLoading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    // log
    console.log("authReducer:", state);

    switch (action.type) {
        case "AUTH_LOGIN":
            return { ...state, user: { username: action.payload.username } };
        case "AUTH_LOGOUT":
            return { ...state, user: null };
        case "AUTH_LOADING":
            return { ...state, isLoading: true };
        case "AUTH_LOADED":
            return { ...state, isLoading: false };
        default:
            return state;
    }
}