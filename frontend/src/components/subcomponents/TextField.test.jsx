import React from 'react';
import { shallow } from 'enzyme';
import TextField from './TextField';

describe('TextField', () => {
  test('renders without errors', () => {
    const component = shallow(<TextField />);
    expect(component.length).toBe(1);
  });
});
