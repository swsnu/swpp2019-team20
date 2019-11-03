import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  test('renders without errors', () => {
    const component = shallow(<Footer />);
    expect(component.length).toBe(1);
  });
});
