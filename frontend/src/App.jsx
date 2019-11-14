import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';


export const AppContext = createContext()

function App() {

  const [user, setUser] = useState({
    loggedIn: false,
    username: ''
  });

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
      {/*<Route path="/main" exact component={MainPage} />*/}
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
        <Redirect from="/" to="/signin" />
      </Switch>
    );
  return (
    <AppContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <div className="App">
          {router}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}


export default App;
