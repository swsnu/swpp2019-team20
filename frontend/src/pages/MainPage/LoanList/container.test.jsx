import React from 'react';
import { shallow, mount } from 'enzyme';
import LoanList from './container';
import { BrowserRouter } from 'react-router-dom';

describe('<CompletedLoanList /> shallow', () => {
  it('should render without error', () => {
    const component = shallow(<LoanList />);
    expect(component.length).toEqual(1);
  });
});

const request = [
  {
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
  }];

describe('<CompletedLoanList /> mount', () => {
  it('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({ json: () => request }));
    mount(
      <BrowserRouter>
        <LoanList />
      </BrowserRouter>
      );
    expect(mockFn).toBeCalledTimes(1);
  });
});
