import React from 'react';
import { mount } from 'enzyme';
import AppForm from './AppForm';

describe('AppForm', () => {
  test('renders without errors', () => {
    const component = mount(
      <AppForm>
        <div>Chilren</div>
      </AppForm>,
    );
    expect(component.length).toBe(1);
  });
});
