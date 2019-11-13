import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage/IndexPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Store from './store/store';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    }
  }

  onLogin = () => {
    this.setState({
      loggedIn: true
    });
  }

  onLogout = () => {
    this.setState({
      loggedIn: false
    });
  }

  render() {
    const { logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            {(this.state.loggedIn) &&
              <Switch>
                <Redirect exact from="/" to="/main" />
                <Route path="/signup" exact component={SignupPage} />
                <Route path="/signin" exact component={LoginPage} />
                <Route path="/profile" exact component={ProfilePage} />
                <Route path="/index" exact component={IndexPage} />
                <Route render={() => <h1>Not Found</h1>} />
              </Switch>}
            {!(this.state.loggedIn) &&
              <Switch>
                <Route path="/signin" exact component={LoginPage} />
                <Route path="/index" exact component={IndexPage} />
                <Route render={() => <h1>Not Found</h1>} />
              </Switch>}
          </div>
        </BrowserRouter>
      </Store.Provider>
    );
  }
}

/*
function App() {
  const loggedIn = true;
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
      <Redirect from="/" to="/signin" />
    </Switch>
  );
  return (
    <BrowserRouter>
      <div className="App">{router}</div>
    </BrowserRouter>
  );
}*/

export default App;
