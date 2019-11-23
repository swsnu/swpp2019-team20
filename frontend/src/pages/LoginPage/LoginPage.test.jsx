import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import App, { AppContext } from '../../App';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  let login;
  // eslint-disable-next-line
  let onSubmitSpy;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    const [user, setUser] = useStateSpy({
      loggedIn: false,
      username: '',
    });

    function onLoggedIn() {
      setUser({ loggedIn: true, username: '' });
    }

    login = (
      <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AppContext.Provider>
    );

    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 204,
        };
        return Promise.resolve(result);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  test('fetch error', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 401,
        };
        return Promise.resolve(result);
      });
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);

    const submitButton = component.find('#login-submit-button button');
    expect(submitButton.length).toBe(1);

    submitButton.simulate('submit');
  });



  test('fetch success', () => {
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);

    const submitButton = component.find('#login-submit-button button');
    expect(submitButton.length).toBe(1);

    submitButton.simulate('submit');
  });
});
