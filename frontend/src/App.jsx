import React, { createContext, useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import Loading from './components/subcomponents/Loading/Loading.jsx'
import './App.css';


export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
  });
  const [userID, setUserID] = useState(0);
  const [isLoading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user.loggedIn) {
      getLogin();
    }
    setLoading(false);
  }, [isLoading]);

  const router = user.loggedIn ? (
    <Switch>
      <Route path="/profile/:userID" exact component={ProfilePage} />
      <Redirect exact from="/profile" to={`/profile/${userID}`} />
      <Route path="/main" exact component={MainPage} />
      <Route path="/" exact component={MainPage} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/index" exact component={IndexPage} />
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
    </Switch>
  );

  return isLoading ? <Loading /> : (
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
