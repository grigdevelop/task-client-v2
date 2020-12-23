import { ApiContainer } from "../types";
import { AuthApiLocal } from "./authApiLocal";
import { DT_User, Repository } from "./repository";

export const createLocalApi = (): ApiContainer => {
    const users: DT_User[] = [];

    const usersRepo = new Repository<DT_User>(users);

    return {
        authApi: new AuthApiLocal(usersRepo)
    }
};