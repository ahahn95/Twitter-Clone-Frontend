import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { User } from "interfaces/User";

import styles from "./App.module.css";
import { signInRequest, getUsers } from "api/api";
import { Auth } from "auth";

const HomePage: React.FC = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [s, ss] = useState(Auth.isUserAuthenticated());
  const [users, setUsers] = useState<User[]>([]);

  const signIn = () => {
    signInRequest(email, password)
      .then(() => void ss(true))
      .then(getUserInfo)
      .catch(void ss(false));
  };

  const getUserInfo = () => {
    getUsers().then(setUsers);
  };

  const logOut = () => {
    Auth.deauthenticateUser().then(() => {
      setUsers([]);
      ss(false);
    });
  };

  return (
    <div>
      <div className="sign-in">
        <h1>Twitter Clone</h1>
        <h2>Sign In</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
        <button onClick={logOut}>Log Out</button>
      </div>
      <div>{s ? "Logged in" : "Not logged in"}</div>
      <div>JWT: {Auth.getToken()}</div>
      <h2>Users</h2>
      <div>
        {users.map((user: User) => {
          return <div>{user.name}</div>;
        })}
      </div>
      <h2 className="sign-up"></h2>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return <>{isAuth ? null : <HomePage />}</>;
};

export default App;
