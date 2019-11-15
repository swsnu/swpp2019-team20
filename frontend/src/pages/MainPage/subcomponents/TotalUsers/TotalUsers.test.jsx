import React from 'react';
import { shallow } from 'enzyme';
import TotalUsers from './TotalUsers';

describe('TotalUsers', () => {
  it('shallow success', () => {
    const component = shallow(<TotalUsers />);
    expect(component.length).toBe(1);
  });
});
