import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Presenter from './presenter';

describe('<Presenter />', () => {
  it('should render without error', () => {
    let mockData = [];
    act(() => {
      mockData = [{
        id: 2,
        num_members: 2,
        deadline: '2019-11-15T23:59:59Z',
        total_money: '1.00',
        alert_frequency: 'low',
        apply_interest: false,
        interest_type: 'hour',
        interest_rate: 0.0,
        completed: true,
        expected_date: '2019-11-15T23:59:59Z',
        completed_date: '2019-11-15T23:59:59Z',
      }];
    });
    const component = shallow(<Presenter loanlist={mockData} />);
    expect(component.length).toEqual(1);
  });
});
