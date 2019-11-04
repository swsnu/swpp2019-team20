import React from 'react';
import { shallow } from 'enzyme';
import FormFeedback from './FormFeedback';

describe('FormFeedback', () => {
  test('renders without errors', () => {
    const component = shallow(
      <FormFeedback>
        <div>Chilren</div>
      </FormFeedback>,
    );
    expect(component.length).toBe(1);
  });
});
