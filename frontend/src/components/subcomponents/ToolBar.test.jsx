import React from 'react';
import { shallow } from 'enzyme';
import ToolBar from './ToolBar';

describe('ToolBar', () => {
  test('renders without errors', () => {
    const component = shallow(<ToolBar />);
    expect(component.length).toBe(1);
  });
});
