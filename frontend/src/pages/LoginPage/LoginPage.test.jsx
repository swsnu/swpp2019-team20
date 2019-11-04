import React from 'react';
import { Route } from 'react-router-dom';
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
    const email = "wrongemailformat";
    const password = "password";
    const component = mount(login);
    const email_input_wrapper = component.find('#login-email-input input');
    const password_input_wrapper = component.find('#login-password-input input');
    const submit_button = component.find('button');

    expect(submit_button.length).toBe(1);

    email_input_wrapper.simulate('change', { target: {value: email} });
    password_input_wrapper.simulate('change', { target: { value: password } });

    submit_button.simulate('submit');
  });
});
