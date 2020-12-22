import { AuthState } from "../features/auth/store/auth.state";

export type AppState = {
    readonly auth: AuthState;
}