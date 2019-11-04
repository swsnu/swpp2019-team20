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

  test('email block marked as invalid with wrong input', () => {
    const email = 'wrongemailformat';
    const password = 'password';
    const component = mount(login);
    const emailInputWrapper = component.find('#login-email-input input');
    const passwordInputWrapper = component.find('#login-password-input input');
    const submitButton = component.find('button');

    expect(submitButton.length).toBe(1);

    emailInputWrapper.simulate('change', { target: { value: email } });
    passwordInputWrapper.simulate('change', { target: { value: password } });

    submitButton.simulate('submit');
  });
});
