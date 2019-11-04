import React from 'react';
import { shallow } from 'enzyme';
import RFTextField from './RFTextField';

describe('RFTextField', () => {
  test('renders without errors', () => {
    const component = shallow(
      <RFTextField meta={
        { error: 'string', touched: false, submitError: 'string' }
      } input={<div></div>}/>
    );
    expect(component.length).toBe(1);
  });
  test('renders without errors', () => {
    const component = shallow(
      <RFTextField meta={
        { error: 'string', touched: true, submitError: 'string' }
      } input={<div></div>} />
    );
    expect(component.length).toBe(1);
  });
  test('renders without errors', () => {
    const component = shallow(
      <RFTextField meta={
        { error: null, touched: true, submitError: 'string' }
      } input={<div></div>} />
    );
    expect(component.length).toBe(1);
  });
});
