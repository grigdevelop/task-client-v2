// external
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";

// internal
import * as authActions from './../store/action.creators';
import { AuthState } from "../types";

// internal external
import { AppState } from "../../../app";

interface LoginData {
    username: string;
    password: string;
}

const formValidatorScheme: yup.SchemaOf<LoginData> = yup.object().shape({
    username: yup.string().required('username is required').min(3).max(15),
    password: yup.string().required('password is required'),
});

export const LoginComponent = () => {
    const { isLoading, errors: authErrors } = useSelector<AppState, AuthState>(state => state.auth);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm<LoginData>({
        resolver: yupResolver(formValidatorScheme),
    });

    if (authErrors) {
        if (authErrors.username) {
            errors.username = {
                type: "validate",
                message: authErrors.username,
            };
        }

        if (authErrors.password) {
            errors.password = {
                type: "validate",
                message: authErrors.password
            };
        }
    }

    // and this is how i'm writing the text
    const handleOnSumbmit = async (data: LoginData) => {
        authActions.loginAsync(dispatch)(data);
    };

    const inputChanged = () => {
        if (authErrors) {
            dispatch(authActions.cleanErrors());
        }
    };

    return (
        <>
            <h2>Log in</h2>
            <form data-testid='login-form' onSubmit={handleSubmit(handleOnSumbmit)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        name="username"
                        className="form-control"
                        data-testid="username"
                        ref={register}
                        type="text"
                        disabled={isLoading}
                        onChange={inputChanged}
                        placeholder="Enter username"
                    />
                    <p data-testid="username-error">{errors.username && errors.username.message}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        className="form-control"
                        data-testid="password"
                        ref={register}
                        type="password"
                        disabled={isLoading}
                        onChange={inputChanged}
                        placeholder="Enter password"
                    />
                    <p data-testid="password-error">{errors.password && errors.password.message}</p>
                </div>
                <button disabled={isLoading} data-testid="submit" type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </>
    );
};
