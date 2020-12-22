import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthState } from "../store/auth.state";
import * as authActions from './../store/action.creators';
import { connect } from "react-redux";
import { AppState } from "../../../store/app.state";

// redux
const mapStateToProps = (state: AppState): AuthState => {
    console.log("logins state: ", state);
    return state.auth;
};

// const dispatchProps = {
//     login: authActions.login,
//     loginAsync: authActions.loginAsync
// };

const dispatchProps = (dispatch: Dispatch<any>) => ({
    login: authActions.login,
    loginAsync: authActions.loginAsync(dispatch)
});

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof dispatchProps>;

interface LoginData {
    username: string;
    password: string;
}

const formValidatorScheme: yup.SchemaOf<LoginData> = yup.object().shape({
    username: yup.string().required('username is required').min(3).max(15),
    password: yup.string().required('password is required'),
});

const Component = (props: Props) => {
    const { login, loginAsync } = props;
    const { register, handleSubmit, errors, setError } = useForm<LoginData>({
        resolver: yupResolver(formValidatorScheme)
    });

    // and this is how i'm writing the text
    const handleOnSumbmit = async (data: LoginData) => {
        loginAsync(data);
        // const result = await authService.login(data);
        // if (result.success) {
        //   alert("login done!");
        // } else {
        //   switch (result.error?.type) {
        //     case "form":
        //       for (const field in result.error.formErrors) {
        //         setError(field as Extract<keyof LoginData, string>, { message: result.error.formErrors[field], type: 'validate', shouldFocus: true });
        //       }
        //       break;
        //   }
        // }
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
                        placeholder="Enter password"
                    />
                    <p data-testid="password-error">{errors.password && errors.password.message}</p>
                </div>
                <button data-testid="submit" type="submit" className="btn btn-primary">
                    Login
        </button>
            </form>
        </>
    );
};

const connected = connect(mapStateToProps, dispatchProps)(Component);

export { connected as LoginComponent };
