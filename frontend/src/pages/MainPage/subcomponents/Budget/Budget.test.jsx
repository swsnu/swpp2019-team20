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
    const component = shallow(
      <MuiThemeProvider theme={customTheme}>
        <Budget />
      </MuiThemeProvider>,
    ).dive();
    expect(component.length).toBe(1);
  });
});
