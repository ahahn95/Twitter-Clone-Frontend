import React, { useState } from "react";
import { signInRequest, ISignInRequest } from "api/api";
import { Auth } from "auth";
import { Switcher, Center, Stack } from "every-layout-react";
import Modal from "react-modal";
import { useFormik } from "formik";

import reactLogo from "../../assets/react.png";
import everyLayoutLogo from "../../assets/every-layout.png";
import typescriptLogo from "../../assets/typescript.png";
import dotnetcoreLogo from "../../assets/dotnetcore.png";
import cleanArchitectureLogo from "../../assets/cleanarchitecture.jpg";
import mysql from "../../assets/mysql.png";

import styles from "./Login.module.css";

interface Props {
  setIsAuth: any;
}

export const Login: React.FC<Props> = props => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      login_email: "",
      login_password: ""
    },
    onSubmit: values =>
      handleSignIn({
        email: values.login_email,
        password: values.login_password
      })
  });

  const logOut = () => {
    Auth.deauthenticateUser();
  };

  const handleSignIn = (request: ISignInRequest) => {
    setLoginLoading(true);
    signInRequest(request)
      .then(() => {
        setLoginLoading(false);
        props.setIsAuth(true);
      })
      .catch(statusText => {
        setLoginError(statusText);
      });
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
  };

  const handleReset = (e: any) => {
    setLoginLoading(false);
    setLoginError(false);
  };

  const renderProjectInfo = () => {
    return (
      <div className={styles["section-container"]}>
        <Center max="65ch" intrinsic andText>
          <h1>Twitter Clone</h1>
          <h2>frontend</h2>
          <Switcher
            className={styles["icon-container"]}
            threshold="50px"
            space="50px"
          >
            <img src={reactLogo} alt="react" />
            <img src={everyLayoutLogo} alt="every-layout" />
            <img src={typescriptLogo} alt="typescript" />
          </Switcher>
          <h2>backend</h2>
          <Switcher
            className={styles["icon-container"]}
            threshold="50px"
            space="50px"
          >
            <img src={dotnetcoreLogo} />
            <img src={cleanArchitectureLogo} />
            <img src={mysql} />
          </Switcher>
        </Center>
      </div>
    );
  };

  const renderSignIn = () => {
    return (
      <div className={styles["section-container"]}>
        <Center max="80ch" andText intrinsic>
          <h2>Sign In</h2>
          <form onSubmit={loginForm.handleSubmit}>
            <Switcher className={styles["login-form"]} threshold="50px">
              <input
                name="login_email"
                type="email"
                required
                placeholder="email"
                onChange={loginForm.handleChange}
              ></input>
              <input
                name="login_password"
                type="password"
                required
                placeholder="password"
                onChange={loginForm.handleChange}
              ></input>
              <button type="submit">Sign In</button>
            </Switcher>
          </form>

          <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <Stack>
                <input
                  name="signup_name"
                  type="text"
                  placeholder="name"
                  required
                ></input>
                <input
                  name="singup_email"
                  type="email"
                  placeholder="email"
                  required
                ></input>
                <input
                  name="signup_password"
                  type="password"
                  placeholder="password"
                  required
                ></input>
                <input
                  name="singup_verify"
                  type="password"
                  placeholder="verify"
                  required
                ></input>
                <button type="submit">Sign Up</button>
              </Stack>
            </form>
          </div>
        </Center>
      </div>
    );
  };

  return (
    <>
      {loginLoading && (
        <Modal isOpen={true} className={styles["modal"]}>
          {loginError ? (
            <Stack>
              <div>{loginError}</div>
              <button onClick={handleReset}>Reset</button>
            </Stack>
          ) : (
            <div className="spinner"></div>
          )}
        </Modal>
      )}
      <Switcher className={styles["login-container"]}>
        {renderProjectInfo()}
        {renderSignIn()}
      </Switcher>
    </>
  );
};
