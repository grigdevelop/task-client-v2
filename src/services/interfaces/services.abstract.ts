import { AppResponse } from "./appResponse";

/*  Auth Service */
export interface LoginInput {
    username: string;
    password: string;
}

export interface UserInfo {
    username: string;
    id: number;
}

export interface LoginOutput {
    token: string;
    userInfo: UserInfo;
}

export interface IAuthService {

    login(input: LoginInput): Promise<AppResponse<LoginOutput>>;

}