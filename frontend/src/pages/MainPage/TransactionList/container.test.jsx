import React from 'react';
import { shallow, mount } from 'enzyme';
import TransactionList from './container';

const loan = {
  id: 1,
  num_members: 2,
  deadline: '2019-11-15T23:59:59Z',
  total_money: '2.00',
  alert_frequency: 'low',
  apply_interest: false,
  interest_type: 'hour',
  interest_rate: 0.0,
  completed: false,
  expected_date: null,
  completed_date: null,
};

const request = [
  {
    id: 1,
    lender: 'h',
    borrower: 'h',
    money: '1.00',
    completed: false,
    completed_date: null,
    lender_confirm: false,
    borrower_confirm: false,
    loan_id: 1,
    borrower_id: 2,
    lender_id: 2,
  }];

describe('<TransactionList />', () => {
  it('should render without error', () => {
    const component = shallow(<TransactionList loan={loan} />);
    expect(component.length).toEqual(1);
  });
  it('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({ json: () => request }));
    mount(<TransactionList loan={loan} />);
    expect(mockFn).toBeCalledTimes(1);
  });
});
