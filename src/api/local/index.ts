import { ApiContainer } from "../types";
import { AuthApiLocal } from "./authApiLocal";
import { DT_User, Repository } from "./repository";

export const createLocalApi = (): ApiContainer => {
    const users: DT_User[] = [{
        id: 1,
        username: 'john.smith',
        password: 'password'
    }];

    const usersRepo = new Repository<DT_User>(users);

    return {
        authApi: new AuthApiLocal(usersRepo)
    }
};