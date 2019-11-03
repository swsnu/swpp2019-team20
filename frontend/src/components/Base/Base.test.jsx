import React from 'react';
import { mount } from 'enzyme';
import Base from './Base';

describe('Base', () => {
  test('renders without errors', () => {
    const component = mount(<Base />);
    expect(component.length).toBe(1);
  });
});
