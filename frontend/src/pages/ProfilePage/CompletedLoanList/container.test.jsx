import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import CompletedLoanList from './container';

describe('<CompletedLoanList />', () => {
  let completedLoanList;

  beforeEach(() => {
    completedLoanList = (
      <BrowserRouter>
        <CompletedLoanList />
      </BrowserRouter>
    );
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
      completed: true,
      expected_date: null,
      completed_date: null,
    }];

  test('should render without error', () => {
    const component = mount(completedLoanList);
    expect(component.length).toEqual(1);
  });

  test('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({ json: () => request }));
    mount(completedLoanList);
    expect(mockFn).toBeCalledTimes(1);
  });
});
