
// data types
type UserInfo = {
    username: string;
}

// features types
type AuthState = {
    readonly user: UserInfo | null;
    readonly isLoading: boolean;
}

type AppState = {
    readonly auth: AuthState;
}