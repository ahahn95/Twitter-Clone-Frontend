import React, { useState, useRef } from "react";
import { signInRequest, getUsers, ISignUpRequest } from "api/api";
import { User } from "interfaces/User";
import { Auth } from "auth";
import { Switcher, Center, Stack } from "every-layout-react";

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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const inputel = useRef<any>(null);

  const logOut = () => {
    Auth.deauthenticateUser();
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInRequest(email, password).then(() => props.setIsAuth(true));
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    console.log(new FormData(inputel.current).getAll("signup_name"));
  };

  const renderProjectInfo = () => {
    return (
      <div className={styles.asdf}>
        <Center gutters={100} max="50ch" intrinsic andText>
          <h1>Twitter Clone</h1>
          <h2>frontend</h2>
          <div className={styles["icon-container"]}>
            <img src={reactLogo} />
            <img src={everyLayoutLogo} />
            <img src={typescriptLogo} />
          </div>
          <h2>backend</h2>
          <div className={styles["icon-container"]}>
            <img src={dotnetcoreLogo} />
            <img src={cleanArchitectureLogo} />
            <img src={mysql} />
          </div>
        </Center>
      </div>
    );
  };

  const renderSignIn = () => {
    return (
      <div>
        <Center max="50ch" andText className={styles["signin-container"]}>
          <Switcher>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div className={styles["login__form"]}>
                <input
                  name="login_email"
                  type="email"
                  required
                  placeholder="email"
                ></input>
                <input
                  name="login_password"
                  type="password"
                  required
                  placeholder="password"
                ></input>
                <button type="submit">Sign In</button>
              </div>
            </form>
          </Switcher>
          <div className={styles["signUp__container"]}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} ref={inputel}>
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
                  onChange={e => setEmail(e.target.value)}
                  required
                ></input>
                <input
                  name="signup_password"
                  type="password"
                  placeholder="password"
                  onChange={e => setPassword(e.target.value)}
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
    <Switcher
      className={styles["container-wrapper"]}
      containerClassName={styles["container-intermidiate-wrapper"]}
    >
      {renderProjectInfo()}
      {renderSignIn()}
    </Switcher>
  );
};
