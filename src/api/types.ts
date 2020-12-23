import { AuthApi } from "./interfaces/auth.api"

export interface ErrorMessage {
    message: string;
}

export interface FormError {
    [id: string]: string;
}

export interface AppError {
    type: 'message' | 'form' | 'request';
}

export interface AppErrorMessage extends AppError {
    type: 'message' | 'request';
    message: string;
}

export interface AppErrorForm extends AppError {
    type: 'form';
    formErrors: FormError;
}

export interface AppResponse<TData> {
    data?: TData;
    success: boolean;
    error?: AppErrorMessage | AppErrorForm;
}

export interface ApiContainer {
    authApi: AuthApi;
}

export namespace apiData {

    export type LoginInput = {
        username: string;
        password: string;
    }

    export type LoginOutput = {
        token: string,
        userInfo: {
            username: string,
            id: number
        }
    }
}