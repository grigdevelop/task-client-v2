import { AppResponse, IAuthService, LoginInput, LoginOutput } from "./interfaces";

export class AuthService implements IAuthService {

    async login(input: LoginInput): Promise<AppResponse<LoginOutput>> {
        throw new Error("Method not implemented.");
    }

}