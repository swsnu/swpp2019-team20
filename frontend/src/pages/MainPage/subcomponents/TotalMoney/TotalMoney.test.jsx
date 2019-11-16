import React from 'react';
import { shallow } from 'enzyme';
import TotalMoney from './TotalMoney';

describe('TotalMoney', () => {
  it('shallow success', () => {
    const component = shallow(<TotalMoney />);
    expect(component.length).toBe(1);
  });
});
