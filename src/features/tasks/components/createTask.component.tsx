import { TaskModule } from "../types";
import { TaskModulePanelComponent } from "./taskModulePanel.component";

/* ******************************
    Create Task Form Component
   ****************************** */
const CreateTaskFormComponent = () => {

    return (
        <>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter your task title" />
            </div>
        </>
    );
};


export const CreateTaskComponent = () => {
    const taskModules: TaskModule[] = [
        { id: 1, name: 'Numerable / Countable', desc: 'Lorem ipsum dolor sit amet', type: 'numerable' },
        { id: 2, name: 'Daily', desc: 'Lorem ipsum dolor sit amet', type: 'numerable' },
        { id: 3, name: 'Deadline', desc: 'Lorem ipsum dolor sit amet', type: 'numerable' },
        { id: 4, name: 'Time period', desc: 'Lorem ipsum dolor sit amet', type: 'period' },
        { id: 5, name: 'Repeatable', desc: 'Lorem ipsum dolor sit amet', type: 'numerable' }
    ];

    return (
        <>
            <div className="row">
                <div className="col-8">
                    <p>Here should be task creating</p>
                    <CreateTaskFormComponent />
                </div>
                <div className="col-3">
                    <h5>Available modules</h5>
                    <hr />
                    <TaskModulePanelComponent taskModules={taskModules} />
                </div>
            </div>
        </>
    );
}