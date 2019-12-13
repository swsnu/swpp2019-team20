import React from 'react';
import { shallow } from 'enzyme';
import Presenter from './presenter';

describe('<Presenter />', () => {
  it('should render without error', () => {
    const mockData = { rating: 4.0 };
    const component = shallow(<Presenter rating={mockData} />);
    expect(component.length).toEqual(1);
  });
});
