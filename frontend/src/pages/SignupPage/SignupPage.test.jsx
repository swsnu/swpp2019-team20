import React from 'react';
import { shallow } from 'enzyme';
import SignupPage from './SignupPage';

describe('SignupPage', () => {
  test('renders without errors', () => {
    const component = shallow(<SignupPage />);
    expect(component.length).toBe(1);
  });
});
