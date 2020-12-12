import React, { useState } from "react";
import { useForm, ErrorOption } from "react-hook-form";

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
// @types/

const LoginComponent = (props: Props) => {
  const { onSubmit, loginErrors } = props;
  const { register, handleSubmit, errors, setError } = useForm<LoginData>();

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
      <form className="input-gropu" onSubmit={handleSubmit(handleOnSumbmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            ref={register({ required: true })}
            type="text"
            placeholder="Enter username"
          />
          <p id="usernameError">{errors.username && "Username is required"}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            ref={register({ required: true })}
            type="password"
            placeholder="Enter password"
          />
          <p>{errors.password && "Password is required"}</p>
        </div>
        <button id="submitBtn" type="submit">
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
