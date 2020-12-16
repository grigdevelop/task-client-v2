interface AppResponse {

}

export interface LoginInput {
    username: string;
    password: string;
}

export interface IAuthService {
    login(input: LoginInput): void;
}