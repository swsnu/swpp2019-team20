import React from 'react';
import { mount } from 'enzyme';
import Paper from './Paper';

describe('Paper', () => {
  test('renders without errors', () => {
    const component = mount(<Paper padding={false}/>);
    expect(component.length).toBe(1);
  });
  test('renders without errors padding true', () => {
    const component = mount(<Paper padding={true}/>);
    expect(component.length).toBe(1);
  });
});
