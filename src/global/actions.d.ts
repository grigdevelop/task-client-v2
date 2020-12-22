/*
 *  AUTH FEATURE ACTIONS
 */
type LoginActionPayloadType = {
    username: string;
}

type LoginActionType = {
    type: 'AUTH_LOGIN',
    payload: {
        username: string;
    }
};

type LogoutActionType = {
    type: 'AUTH_LOGOUT'
};

type AuthLoadingActionType = {
    type: 'AUTH_LOADING'
};

type AuthLoadedActionType = {
    type: 'AUTH_LOADED'
};

type AuthActions = LoginActionType | LogoutActionType | AuthLoadingActionType | AuthLoadedActionType;
type AuthActionTypes = PropType<AuthActions, "type">;

type AppActionTypes = AuthActionTypes;