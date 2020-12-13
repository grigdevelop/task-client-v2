import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  onSubmit: (loginData: LoginData) => void;
  errorMessage: string;
}

interface LoginData {
  username: string;
  password: string;
}

const formValidatorScheme: yup.SchemaOf<LoginData> = yup.object().shape({
  username: yup.string().required('username is required').min(3).max(15),
  password: yup.string().required('password is required'),
});

const LoginComponent = (props: Props) => {
  const { onSubmit, errorMessage } = props;
  const { register, handleSubmit, errors, setError } = useForm<LoginData>({
    resolver: yupResolver(formValidatorScheme)
  });

  // and this is how i'm writing the text
  const handleOnSumbmit = (data: LoginData) => {
    //TODO: check errors
    onSubmit(data);
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
        <div>
          <p>{errorMessage}</p>
        </div>
        <button data-testid="submit" type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

const TestLoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (loginData: LoginData) => {
    console.log(loginData);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <LoginComponent errorMessage={errorMessage} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export { LoginComponent, TestLoginComponent };
