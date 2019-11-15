import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import Budget from './Budget';

const customTheme = {
  palette: {
    error: {
      main: '#FF0000',
    },
  },
  spacing: (num) => num,
}

describe('Budget', () => {
  test('renders without errors', () => {
    const wrapper = shallow(
      <MuiThemeProvider theme={customTheme}>
        <Budget />
      </MuiThemeProvider>,
    ).dive();
    expect(wrapper.find('Budget').length).toBe(1);
  });
});
