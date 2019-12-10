import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('<Loading />', () => {
  it('should render without errors', () => {
    const component = shallow(<Loading />);
    const wrapper = component.find('img');
    expect(wrapper.length).toBe(2);
  });
});
