import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import './App.css';

function App() {
  const loggedIn = false;
  // console.log(loggedIn);

  const router = loggedIn ? (
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
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/index" exact component={IndexPage} />
      <Route path="/signin" exact component={LoginPage} />
      <Route
        path="/signup"
        exact
        component={SignupPage}
      />
      <Redirect from="/" to="/index" />
    </Switch>
  );
  return (
    <BrowserRouter>
      <div className="App">{router}</div>
    </BrowserRouter>
  );
}

export default App;
