import { createContext } from 'react';
import { createServices } from './createServices';
import { ServiceStore } from "./servicesStore";

export interface AppContext {
    services: ServiceStore;
}


export const createAppContext = (services: ServiceStore) => {
    const context = createContext<AppContext>({
        services
    });
    return context;
}

export const TaskuAppContext = createAppContext(createServices());