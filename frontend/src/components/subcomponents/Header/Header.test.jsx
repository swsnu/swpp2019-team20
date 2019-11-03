import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  test('renders without errors', () => {
    const component = shallow(<Header />);
    expect(component.length).toBe(1);
  });
});
