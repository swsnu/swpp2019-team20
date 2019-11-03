import React from 'react';
import { shallow } from 'enzyme';
import AppBar from './AppBar';

describe('AppBar', () => {
  test('renders without errors', () => {
    const component = shallow(<AppBar />);
    expect(component.length).toBe(1);
  });
});
