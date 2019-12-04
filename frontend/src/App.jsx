import React, { createContext, useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
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
  const [userID, setUserID] = useState(0);

  function onLoggedIn() { // set if current user is logged in
    setUser({ loggedIn: true, username: '' });
  }

  async function getID() { // set current user(logged in)'s ID
    const res = await fetch('/account/user/me', {
      method: 'GET',
      credential: 'include',
    });
    const info = await res.json();
    setUserID(info.id);
  }

  const getLogin = async () => {
    const response = await fetch('/account/user', {
      method: 'GET',
      credential: 'include',
    });

    if (response.status === 204) {
      await getID();
      onLoggedIn();
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  const router = user.loggedIn ? (
    <Switch>
      <Route path="/profile/:userID" exact component={ProfilePage} />
      <Redirect exact from="/profile" to={`/profile/${userID}`} />
      <Route path="/main" exact component={MainPage} />
      {/* eslint-disable-next-line */}
      <Route exact path="/" exact component={MainPage} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/index" exact component={IndexPage} />
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
      {/* eslint-disable-next-line */}
      <Route exact path="/" exact component={IndexPage} />
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
