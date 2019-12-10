import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading.jsx';

describe('<Loading />', () => {
  it('should render without errors', () => {
    const component = shallow(<Loading />);
    const wrapper = component.find('div');
    expect(wrapper.length).toBe(1);
  });
});
