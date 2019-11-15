import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import TotalMoney from './TotalMoney';

const customTheme = {
  palette: {
    primary: {
      main: '#FF0000',
    },
  },
  spacing: (num) => num,
}

describe('Budget', () => {
  test('renders without errors', () => {
    const component = shallow(
      <MuiThemeProvider theme={customTheme}>
        <TotalMoney />
      </MuiThemeProvider>,
    ).dive();
    expect(component.length).toBe(1);
  });
});
