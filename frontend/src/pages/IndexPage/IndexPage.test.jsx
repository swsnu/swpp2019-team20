import React from 'react';
import { shallow } from 'enzyme';
import IndexPage from './IndexPage';

describe('IndexPage', () => {
  test('renders without errors', () => {
    const component = shallow(<IndexPage />);
    expect(component.length).toBe(1);
  });
});
