import React, { useState } from "react";
import { useModal } from "../../../utils/universalModal";
import { getTaskModuleEditor } from "../taskModules/taskModuleEditor";
import { TaskModule } from "../types";

interface TaskModuleListItemComponentProps {
    module: TaskModule;
    onClick?: (taskModule: TaskModule) => void;
}

const TaskModuleListItemComponent = (props: TaskModuleListItemComponentProps) => {
    const { module, onClick } = props;

    const handleClick = () => {
        if (onClick) {
            onClick(module);
        }
    };

    //let modal: Modal;   
    return (
        <>
            <button className="list-group-item list-group-item-action btn" onClick={handleClick}>
                <strong className="mb-1"> {module.name} </strong>
                <br />
                <small>{module.desc}</small>
            </button>
        </>
    );
};

interface TaskModuleListComponentProps {
    taskModules: TaskModule[];
    onItemClick?: (selectedItem: TaskModule) => void;
}

const TaskModuleListComponent = (props: TaskModuleListComponentProps) => {
    const { taskModules, onItemClick } = props;

    const handleClick = (item: TaskModule) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <>
            <div className="list-group">
                {taskModules.map(module => <TaskModuleListItemComponent key={module.id} module={module} onClick={() => handleClick(module)} />)}
            </div>
        </>
    )
};

export const TaskModulePanelComponent = (props: { taskModules: TaskModule[] }) => {

    const [taskModules, setTaskModules] = useState(props.taskModules);
    const { showModal } = useModal();

    const updateTaskModules = (searchQuery: string) => {
        searchQuery = searchQuery.toLowerCase();
        setTaskModules(props.taskModules.filter(x => x.name.toLowerCase().includes(searchQuery)));
    };

    const handleItemClick = (taskModule: TaskModule) => {
        const View = getTaskModuleEditor(taskModule.type);
        showModal(View);
    };

    return (
        <>
            <div className="form-group">
                <input id="search_module" placeholder="type to search in modules" className="form-control form-control-sm" type="text"
                    onChange={(e) => { updateTaskModules(e.target.value) }} />
            </div>
            <hr />
            <TaskModuleListComponent taskModules={taskModules} onItemClick={handleItemClick} />

        </>
    );
};