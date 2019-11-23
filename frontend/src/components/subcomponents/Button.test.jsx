import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  test('renders without errors', () => {
    const component = shallow(<Button />);
    expect(component.length).toBe(1);
  });
});
