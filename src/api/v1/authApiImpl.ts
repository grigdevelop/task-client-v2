import { AuthApi } from "../interfaces/auth.api";
import { apiData, AppResponse } from "../types";

export class AuthApiImpl implements AuthApi {

    login(input: apiData.LoginInput): Promise<AppResponse<apiData.LoginOutput>> {
        throw new Error("Method not implemented.");
    }

}