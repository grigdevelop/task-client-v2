import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { ModalContext, ModalContextType } from "./universalModalContext";

interface UniverstalModalProviderProps {
    children?: React.ReactNode;
}

export const UniverstalModalProvider = (props: UniverstalModalProviderProps) => {

    const [ModalContent, setModalContent] = useState<React.FunctionComponent>(() => () => (<></>));

    const modalRef = useRef<HTMLDivElement>(null);

    const [modal, setModal] = useState<Modal>();

    useEffect(() => {
        const m = new Modal(modalRef.current!);
        modalRef.current?.addEventListener('hidden.bs.modal', () => {
            setModalContent(() => () => (<></>));
        });
        setModal(m);
        return () => {
            m.dispose();
        };
    }, []);

    const context: ModalContextType = {
        showModal: (comp) => {
            setModalContent(() => comp);
            modal?.show();
        },
        hideModal: () => {
            modal?.hide();
        }
    }

    return (
        <ModalContext.Provider value={context}>
            <>
                {props.children}
                <div ref={modalRef} className="modal show fade" aria-modal="true" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <ModalContent />
                        </div>
                    </div>
                </div>
            </>
        </ModalContext.Provider>

    );
};