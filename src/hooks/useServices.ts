import { useContext } from "react";
import { TaskuAppContext } from "../store";

export const useServices = () => {
    const context = useContext(TaskuAppContext);
    return context.services;
};