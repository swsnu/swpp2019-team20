import React from 'react';
import { shallow } from 'enzyme';
import Base from './Base';

describe('Base', () => {
  test('renders without errors', () => {
    const component = shallow(<Base />);
    expect(component.length).toBe(1);
  });
});
