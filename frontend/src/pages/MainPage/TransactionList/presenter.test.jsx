import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import LatestOrders from './presenter';

describe('<LatestOrders />', () => {
  it('should render without error', () => {
    let mockData = [];
    act(() => {
      mockData = [
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
    });
    const component = shallow(<LatestOrders TxList={mockData} />);
    expect(component.length).toEqual(1);
  });
});
