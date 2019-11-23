import React from 'react';
import { shallow } from 'enzyme';
import Presenter from './presenter';

describe('Presenter', () => {
  test('renders without errors', () => {
    const component = shallow(<Presenter />);
    expect(component.length).toEqual(1);
  });
});
