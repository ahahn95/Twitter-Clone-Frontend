import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Auth } from "auth";
import { Login } from "components/Login/Login";
import { Home } from "components/Home/Home";

import styles from "./App.module.css";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(Auth.isUserAuthenticated());

  const signOut = () => {
    Auth.deauthenticateUser().then(() => setIsAuth(false));
  };

  return (
    <>
      {isAuth && (
        <header>
          <div>This is a header</div>
          <button onClick={signOut}>Sign Out</button>
        </header>
      )}
      <div id="main-content">
        {isAuth ? <Home /> : <Login setIsAuth={setIsAuth} />}
      </div>
      <footer>created by Alex Hahn (https://github.com/ahahn95)</footer>
    </>
  );
};

export default App;
