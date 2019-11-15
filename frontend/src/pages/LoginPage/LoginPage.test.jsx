import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import App, { AppContext } from '../../App';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  let login;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    function onLoggedIn() {
      setUser({ loggedIn: true, username: '' });
    }

    login = (
      <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
        <BrowserRouter>
          <Route path="/signin" exact component={LoginPage} />
        </BrowserRouter>
      </AppContext.Provider>
    );
  });


  test('when loggedIn is true', () => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    const component = mount(
      <AppContext.Provider value={{ user, setUser }}>
        <App />
      </AppContext.Provider>,
    );
    expect(component.length).toBe(1);
  });


  test('renders without errors', () => {
    const component = mount(login);
    expect(component.length).toBe(1);
  });

  test('login form should be rendered', () => {
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);

    const submitButton = component.find('button');
    expect(submitButton.length).toBe(1);
  });

  test('login should fail with wrong input', () => {
    const username = 'test_user';
    const password = 'password';
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    const submitButton = component.find('button');

    usernameInputWrapper.value = username;
    passwordInputWrapper.value = password;

    submitButton.simulate('submit');
  });

  test('login should success with correct input', () => {
    const username = 'yunmo';
    const password = 'a';
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    const submitButton = component.find('button');

    usernameInputWrapper.value = username;
    passwordInputWrapper.value = password;

    submitButton.simulate('submit');
  });
});
