import React, { createContext, useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import './App.css';


export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
  });

  function onLoggedIn() {
    setUser({ loggedIn: true, username: '' });
  }

  const getLogin = async () => {
    const response = await fetch('/account/user', {
      method: 'GET',
      credential: 'include',
    });

    if (response.status === 204) {
      onLoggedIn();
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const router = user.loggedIn ? (
    <Switch>
      <Redirect exact from="/" to="/index" />
      <Route
        path="/signup"
        exact
        component={SignupPage}
      />
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/profile" exact component={ProfilePage} />
      <Route path="/main" exact component={MainPage} />
      <Route
        path="/index"
        exact
        component={IndexPage}
      />
    </Switch>
  ) : (
    <Switch>
      <Route path="/index" exact component={IndexPage} />
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
      <Redirect from="/" to="/signin" />
    </Switch>
  );

  return (
    <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
      <BrowserRouter>
        <div className="App">
          {router}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}


export default App;
