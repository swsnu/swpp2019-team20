import React from 'react';
import { shallow } from 'enzyme';
import Budget from './Budget';

describe('Budget', () => {
  it('shallow success', () => {
    const component = shallow(<Budget />);
    expect(component.length).toBe(1);
  });
});
