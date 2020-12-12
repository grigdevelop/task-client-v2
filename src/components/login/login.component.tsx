import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';



interface Props {
  onSubmit: (loginData: LoginData) => void;
  loginErrors: LoginErrorsType | null;
}

interface LoginData {
  username: string;
  password: string;
}

interface LoginErrorsType {
  usernameError: string;
  passwordError: string;
}
const formValidatorScheme: yup.SchemaOf<LoginData> = yup.object().shape({
  username: yup.string().required('username is required').min(3).max(15),
  password: yup.string().required('password is required'),
});

const LoginComponent = (props: Props) => {
  const { onSubmit, loginErrors } = props;
  const { register, handleSubmit, errors, setError } = useForm<LoginData>({
    resolver: yupResolver(formValidatorScheme)
  });

  // setup errors
  if (loginErrors) {
    setError("username", {
      message: loginErrors.usernameError,
      type: "validate",
    });
    setError("password", {
      message: loginErrors.passwordError,
      type: "validate",
    });
  }

  const handleOnSumbmit = (data: LoginData) => {
    //TODO: check errors
    onSubmit(data);
  };
  return (
    <>
      <h2>Log in</h2>
      <form data-testid='login-form' className="input-gropu" onSubmit={handleSubmit(handleOnSumbmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            data-testid="username"
            ref={register}
            type="text"
            placeholder="Enter username"
          />
          <p data-testid="username-error">{errors.username && errors.username.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            data-testid="password"
            ref={register}
            type="password"
            placeholder="Enter password"
          />
          <p data-testid="password-error">{errors.password && errors.password.message}</p>
        </div>
        <button data-testid="submit" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

const TestLoginComponent = () => {
  const [loginErrors, setLoginErrors] = useState<null | LoginErrorsType>(null);

  const handleSubmit = (loginData: LoginData) => {
    console.log(loginData);
  };

  return <LoginComponent loginErrors={loginErrors} onSubmit={handleSubmit} />;
};

export { LoginComponent, TestLoginComponent };
