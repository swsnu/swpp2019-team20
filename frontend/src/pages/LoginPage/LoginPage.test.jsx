import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  let login;

  beforeEach(() => {
    login = (
      <LoginPage />
    );
  });


  test('renders without errors', () => {
    const component = shallow(login);
    expect(component.length).toBe(1);
  });

  test('username block marked as invalid with wrong input', () => {
    const username = 'test_user';
    const password = 'password';
    const component = mount(login);
    const usernameInputWrapper = component.find('#login-username-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    const submitButton = component.find('button');

    expect(submitButton.length).toBe(1);

    usernameInputWrapper.simulate('change', { target: { value: username } });
    passwordInputWrapper.simulate('change', { target: { value: password } });

    submitButton.simulate('submit');
  });
});
