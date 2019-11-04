import React from 'react';
import { shallow } from 'enzyme';
import RFTextField from './RFTextField';

describe('RFTextField', () => {
  test('renders without errors', () => {
    const component = shallow(
      <RFTextField />
    );
    expect(component.length).toBe(1);
  });
});
