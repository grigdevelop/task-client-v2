import { useState } from "react";

interface TaskModule {
    id: number;
    title: string;
    desc: string;
}

export const TaskModuleComponent = (props: { module: TaskModule }) => {
    const { module } = props;
    return (
        <>
            <button className="list-group-item list-group-item-action btn">
                <strong className="mb-1"> {module.title} </strong>
                <br />
                <small>{module.desc}</small>
            </button>
        </>
    );
};

export const TaskModulesListComponent = (props: { taskModules: TaskModule[] }) => {
    const { taskModules } = props;
    return (
        <>
            <div className="list-group">
                {taskModules.map(module => <TaskModuleComponent key={module.id} module={module} />)}
            </div>
        </>
    )
};

export const TaskModulePanel = (props: { taskModules: TaskModule[] }) => {

    const [taskModules, setTaskModules] = useState(props.taskModules);

    const updateTaskModules = (searchQuery: string) => {
        searchQuery = searchQuery.toLowerCase();
        setTaskModules(props.taskModules.filter(x => x.title.toLowerCase().includes(searchQuery)));
    };

    return (
        <>
            <div className="form-group">
                <input id="search_module" placeholder="type to search in modules" className="form-control form-control-sm" type="text"
                    onChange={(e) => { updateTaskModules(e.target.value) }} />
            </div>
            <hr />
            <TaskModulesListComponent taskModules={taskModules} />
        </>
    );
};

export const CreateTaskComponent = () => {
    const taskModules: TaskModule[] = [
        { id: 1, title: 'Numerable / Countable', desc: 'Lorem ipsum dolor sit amet' },
        { id: 2, title: 'Daily', desc: 'Lorem ipsum dolor sit amet' },
        { id: 3, title: 'Deadline', desc: 'Lorem ipsum dolor sit amet' },
        { id: 4, title: 'Time period', desc: 'Lorem ipsum dolor sit amet' },
        { id: 5, title: 'Repeatable', desc: 'Lorem ipsum dolor sit amet' }
    ];

    return (
        <>
            <div className="row">
                <div className="col-8">
                    <p>Here should be task creating</p>
                </div>
                <div className="col-3">
                    <h5>Available modules</h5>
                    <hr />
                    <TaskModulePanel taskModules={taskModules} />
                </div>
            </div>
        </>
    );
}