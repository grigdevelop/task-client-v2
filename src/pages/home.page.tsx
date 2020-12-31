import { useState } from "react";
import { useModal } from "../utils/universalModal";


const ComponentWithModal = () => {
    const { showModal, hideModal } = useModal();

    const handleShowModal = () => {
        const ModalContent = () => {
            const [counter, setCounter] = useState(0);
            return (
                <>
                    <p>This is the modal content</p>
                    <p>Counter: {counter}</p>
                    <button onClick={() => setCounter(counter + 1)}>increment</button>
                    <button onClick={() => hideModal()}>Close</button>
                </>
            );
        };
        showModal(ModalContent);
    };

    return (
        <>
            <button onClick={handleShowModal}>show modal</button>
        </>
    );
};

export const HomePage = () => (
    <>
        <div className="row">
            <div className="col">
                <p>this is a home page</p>
                <ComponentWithModal />
            </div>
        </div>
    </>
);