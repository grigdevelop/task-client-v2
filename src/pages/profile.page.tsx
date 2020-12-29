import { useSelector } from "react-redux";
import { AppState } from "../app";
import { AuthState } from "../features/auth/types";
import { CreateTaskComponent } from "../features/tasks/components/createTask.component";


export const ProfilePage = () => {
    const user = useSelector<AppState, PropType<AuthState, "user">>(state => state.auth.user);

    return (
        <>
            <p>Welcome to your profile page {user?.username}</p>
            <CreateTaskComponent />
        </>
    );
};