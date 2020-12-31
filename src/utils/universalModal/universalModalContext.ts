import { createContext } from "react";

export type ModalContextType = {
    showModal: (comp: React.FunctionComponent) => void;
    hideModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    showModal: (comp) => { },
    hideModal: () => { }
});