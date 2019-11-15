import React from 'react';
import { shallow } from 'enzyme';
import { MainPage } from './MainPage';

describe('<MainPage />', () => {
  it('WrappedComponent is rendered', () => {
    const wrapper = shallow(<MainPage />);
    expect(wrapper.length).toBe(1);
  });
});
