import React from 'react';
import { shallow } from 'enzyme';
import SimpleTabs from './presenter';

const mockData = [{
  id: 2,
  num_members: 2,
  deadline: '2019-11-15T23:59:59Z',
  total_money: '1.00',
  alert_frequency: 'low',
  apply_interest: false,
  interest_type: 'hour',
  interest_rate: 0.0,
  completed: false,
  expected_date: null,
  completed_date: null,
}]

describe('<SimpleTabs />', () => {
  it('should render without error', () => {
    const component = shallow(<SimpleTabs notCompletedLoanList={mockData} />);
    expect(component.length).toEqual(1);
  });
})