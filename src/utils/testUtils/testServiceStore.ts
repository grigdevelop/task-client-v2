import { IAuthService, LoginInput } from "../../services/interfaces";
import { ServiceStore } from "../../store/servicesStore";

// use test data for test services
export class TestAuthService implements IAuthService {

    constructor() {

    }

    login(input: LoginInput): void {

    }

}

export const createTestServiceStore = (): ServiceStore => {
    throw "Not implemented";
};
