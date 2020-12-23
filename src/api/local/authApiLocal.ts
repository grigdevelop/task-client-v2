import { AuthApi } from "../interfaces/auth.api";
import { apiData, AppResponse } from "../types";
import { DT_User, Repository } from "./repository";

export class AuthApiLocal implements AuthApi {

    constructor(
        private readonly usersRepo: Repository<DT_User>
    ) {

    }

    async login(input: apiData.LoginInput): Promise<AppResponse<apiData.LoginOutput>> {
        await this.sleep(2000);

        try {
            console.log(input);
            const user = await this.usersRepo.findOne(x => x.username == input.username);
            if (!user) return {
                success: false,
                error: {
                    type: 'form',
                    formErrors: { 'username': 'User not found.' }
                }
            }

            if (user.password !== input.password) {
                return {
                    success: false,
                    error: {
                        type: 'form',
                        formErrors: { 'password': 'Invalid password.' }
                    }
                }
            }

            return {
                success: true,
                data: {
                    token: 'test_auth_token',
                    userInfo: {
                        username: user.username,
                        id: user.id
                    }
                }
            }

        } catch (err) {
            return {
                success: false,
                error: { type: 'message', message: 'Unhandled error' }
            };
        }
    }


    private sleep(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
}