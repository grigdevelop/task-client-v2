import { useContext } from "react";
import { ModalContext } from "./universalModalContext";

export const useModal = () => {
    const context = useContext(ModalContext);
    return {
        showModal: context.showModal,
        hideModal: context.hideModal
    };
};