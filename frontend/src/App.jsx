import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';

function App() {
  const loggedIn = true;
  // console.log(loggedIn);

  const router = loggedIn ? (
    <Switch>
      <Redirect exact from="/" to="/signin" />
      <Route
        path="/signup"
        exact
        component={SignupPage}
      />
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/profile" exact component={ProfilePage} />
      <Route
        path="/index"
        exact
        component={IndexPage}
      />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/signin" exact component={LoginPage} />
      <Redirect from="/" to="/signin" />
    </Switch>
  );
  return (
    <BrowserRouter>
      <div className="App">{router}</div>
    </BrowserRouter>
  );
}

export default App;
