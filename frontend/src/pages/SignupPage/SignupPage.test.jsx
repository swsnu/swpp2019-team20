import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App, { AppContext } from '../../App';
import SignUpPage from './SignupPage';

describe('SignUpPage', () => {
  let signup;
  // eslint-disable-next-line
  let onSubmitSpy;
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

    signup = (
      <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </AppContext.Provider>
    );

    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 201,
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
    const component = mount(signup);
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
    const component = mount(signup);
    expect(component.length).toBe(1);
    const usernameInputWrapper = component.find('#signup-username-input input');
    const firstnameInputWrapper = component.find('#signup-fisrtname-input input');
    const lastnameInputWrapper = component.find('#signup-lastname-input input');
    const emailInputWrapper = component.find('#signup-email-input input');
    const passwordInputWrapper = component.find('#signup-password-input input');
    const kakaoidInputWrapper = component.find('#signup-kakaoid-input input');
    const phoneInputWrapper = component.find('#signup-phone-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(firstnameInputWrapper.length).toBe(1);
    expect(lastnameInputWrapper.length).toBe(1);
    expect(emailInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);
    expect(kakaoidInputWrapper.length).toBe(1);
    expect(phoneInputWrapper.length).toBe(1);

    const submitButton = component.find('button');
    expect(submitButton.length).toBe(1);

    submitButton.simulate('submit');
  });

  test('fetch success', () => {
    const component = mount(signup);
    expect(component.length).toBe(1);
    const usernameInputWrapper = component.find('#signup-username-input input');
    const firstnameInputWrapper = component.find('#signup-fisrtname-input input');
    const lastnameInputWrapper = component.find('#signup-lastname-input input');
    const emailInputWrapper = component.find('#signup-email-input input');
    const passwordInputWrapper = component.find('#signup-password-input input');
    const kakaoidInputWrapper = component.find('#signup-kakaoid-input input');
    const phoneInputWrapper = component.find('#signup-phone-input input');
    expect(usernameInputWrapper.length).toBe(1);
    expect(firstnameInputWrapper.length).toBe(1);
    expect(lastnameInputWrapper.length).toBe(1);
    expect(emailInputWrapper.length).toBe(1);
    expect(passwordInputWrapper.length).toBe(1);
    expect(kakaoidInputWrapper.length).toBe(1);
    expect(phoneInputWrapper.length).toBe(1);

    const submitButton = component.find('button');
    expect(submitButton.length).toBe(1);

    submitButton.simulate('submit');
  });
});
