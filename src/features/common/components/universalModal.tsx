import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";

interface UniversalModalProps {
    children: React.ReactNode;
    show: boolean;
}

export const UniversalModal = ({ children, show }: UniversalModalProps) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [showDialog, setShowDialog] = useState(show);

    useEffect(() => {
        if (modalRef.current) {
            const modal = new Modal(modalRef.current);
            modal.show();
            modalRef.current.addEventListener('hidden.bs.modal', () => {
                setShowDialog(false);
            });
        }
    });

    return (
        <>{showDialog &&
            <div ref={modalRef} className="modal show fade" aria-modal="true" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>}
        </>
    );
};