import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import withNavbar from './components/subcomponents/Header/Header';
import './App.css';

function App() {
  const loggedIn = true;
  console.log(loggedIn);

  const router = loggedIn ? (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route
        path="/signup"
        exact
        component={withNavbar(SignupPage)}
      />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/profile" exact component={withNavbar(ProfilePage)} />
      <Route
        path="/index"
        exact
        component={withNavbar(IndexPage)}
      />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" exact component={LoginPage} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
  return (
    <BrowserRouter>
      <div className="App">{router}</div>
    </BrowserRouter>
  );
}

export default App;
