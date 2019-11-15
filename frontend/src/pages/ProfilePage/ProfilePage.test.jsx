import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  test('renders without errors', () => {
    const component = shallow(<ProfilePage />);
    expect(component.length).toBe(1);
  });
});
