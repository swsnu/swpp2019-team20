import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('shallow success', () => {
    const component = shallow(<Button />);
    expect(component.length).toBe(1);
  });
});
