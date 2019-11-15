import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import TaskProgress from './TasksProgress';

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
        <TaskProgress />
      </MuiThemeProvider>,
    ).dive();
    expect(component.length).toBe(1);
  });
});
