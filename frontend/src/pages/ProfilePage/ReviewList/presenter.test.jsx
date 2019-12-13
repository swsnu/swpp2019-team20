import React from 'react';
import { shallow } from 'enzyme';
import Presenter from './presenter';

describe('<Presenter />', () => {
  it('should render without error', () => {
    const mockData = [{ rating: 9.3, content: '>.<' },
      { rating: 5.1, content: 'not good' }];
    const component = shallow(<Presenter reviewList={mockData} />);
    expect(component.length).toEqual(1);
  });
});
