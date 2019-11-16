import React from 'react';
import { shallow } from 'enzyme';
import TaskProgress from './TasksProgress';

describe('TaskProgress', () => {
  it('shallow success', () => {
    const component = shallow(<TaskProgress />);
    expect(component.length).toBe(1);
  });
});
