import React from 'react';
import { shallow } from 'enzyme';
import Typography from './Typography';

describe('Typography', () => {
  test('renders without errors', () => {
    const component = shallow(<Typography />);
    expect(component.length).toBe(1);
  });
});
