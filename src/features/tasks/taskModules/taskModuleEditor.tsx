import { useModal } from "../../../utils/universalModal";
import { TaskModulesType } from "../types";

type DialogViweProps = {
    children?: React.ReactNode,
    title: string,
    onSave: () => void
};

const DialogView = (props: DialogViweProps) => {
    const { children, title, onSave } = props;
    const { hideModal } = useModal();
    return (
        <>
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={onSave}>Save changes</button>
            </div>
        </>
    );
};

const NumerableEditorView = () => {

    const handleSave = () => {

    };

    return (
        <DialogView title="Numerable module for the task" onSave={handleSave}>
            <p>
                Here will be some form
            </p>
        </DialogView>
    );
};

const PeriodEditorView = () => {

    const handleSave = () => {

    };

    return (
        <DialogView title="Period module for the task" onSave={handleSave}>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae autem minima debitis accusantium sit temporibus necessitatibus
                ipsum veritatis veniam reiciendis illum quae tempora, odio sequi ipsa velit, saepe harum. Soluta!
            </p>
        </DialogView>
    );
};

export const getTaskModuleEditor = (taskModuleType: TaskModulesType) => {
    switch (taskModuleType) {
        case "numerable":
            return NumerableEditorView;
        case "period":
            return PeriodEditorView;
    }
}