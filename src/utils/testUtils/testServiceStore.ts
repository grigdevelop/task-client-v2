import { AppResponse, IAuthService, LoginInput, LoginOutput } from "../../services/interfaces";
import { ServiceStore } from "../../store/servicesStore";
import { DT_User, Repository } from "./repository";
import { resolveTestDatabase } from "./testDatabase";

// use test data for test services
export class TestAuthService implements IAuthService {

    constructor(
        private readonly usersRepo: Repository<DT_User>
    ) {

    }

    async login(input: LoginInput): Promise<AppResponse<LoginOutput>> {
        try {
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

}

export const createTestServiceStore = (): ServiceStore => {
    const database = resolveTestDatabase();
    return {
        authService: new TestAuthService(new Repository(database.users))
    };
};
