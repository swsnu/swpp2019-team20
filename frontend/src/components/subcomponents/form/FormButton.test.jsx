import React from 'react';
import { mount } from 'enzyme';
import FormButton from './FormButton';

describe('FormButton', () => {
  test('renders without errors', () => {
    const component = mount(
      <FormButton>
        <div>Chilren</div>
      </FormButton>,
    );
    expect(component.length).toBe(1);
  });
});
