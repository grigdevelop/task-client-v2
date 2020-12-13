import { AuthService } from "../services";
import { ServiceStore } from "./servicesStore";

export const createServices = (): ServiceStore => {
    return {
        authService: new AuthService()
    }
};