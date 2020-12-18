/*
ERROR SAMPLES
message: { message: 'user not found'}
form: {'username': 'user with this name already exists', 'text': 'text for this task is too long'}
request: { message: 'unable to connect to the server'}
*/

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