import { apiData, AppResponse } from '../types';


export interface AuthApi {

    login(input: apiData.LoginInput): Promise<AppResponse<apiData.LoginOutput>>;

}