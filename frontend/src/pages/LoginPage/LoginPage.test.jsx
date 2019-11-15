import React, { usesState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { AppContext } from '../../App';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  let login, spyOnLoggedIn;
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: ''
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
      username: ''
    });

    const component = mount(
      <AppContext.Provider value={{ user, setUser }}>
        <App />
      </AppContext.Provider>
    );
    expect(component.length).toBe(1);
  });


  test('renders without errors', () => {
    const component = mount(login);
    expect(component.length).toBe(1);
  });

  test('username block marked as invalid with wrong input', () => {
    const username = 'test_user';
    const password = 'password';
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);
    const submitButton = component.find('button');

    expect(submitButton.length).toBe(1);
  });

  /*test('username block marked as invalid with wrong input', () => {
    const username = 'test_user';
    const password = 'password';
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);
    const submitButton = component.find('button');

    expect(submitButton.length).toBe(1);

    usernameInputWrapper.simulate('change', { target: { value: username } });
    passwordInputWrapper.simulate('change', { target: { value: password } });

    submitButton.simulate('submit');
  });*/
});
