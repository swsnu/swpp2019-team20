import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';
import { AppContext } from '../../../App';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  // eslint-disable-next-line
  let onLogoutSpy;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    onLogoutSpy = jest.spyOn(window, 'fetch')
      .mockImplementation(() => {
        const result = {
          status: 201,
        };
        return Promise.resolve(result);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
    const [user] = useStateSpy({
      loggedIn: false,
      username: '',
    });

    const component = mount(
      <AppContext.Provider value={{ user }}>
        <Header />
      </AppContext.Provider>
    );
    expect(component.length).toBe(1);
  });

  test('Header should show Sign In and Sign Up', () => {
    const [user] = useStateSpy({
      loggedIn: false,
      username: '',
    });

    const element = mount(
      <AppContext.Provider value={{ user }}>
        <Header />
      </AppContext.Provider>,
    );

    expect(element.length).toBe(1);
  });

  test('Header should show Sign Out and My Page', () => {
    const [user] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    const element = mount(
      <AppContext.Provider value={{ user }}>
        <Header />
      </AppContext.Provider>,
    );

    expect(element.length).toBe(1);
    const signOutButtonWrapper = element.find('#signOutButton a');
    expect(signOutButtonWrapper.length).toBe(1);

    signOutButtonWrapper.simulate('click');
  });

  test('click navigation icon', () => {
    const [user] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    const element = mount(
      <AppContext.Provider value={{ user }}>
        <Header />
      </AppContext.Provider>,
    );
    expect(element.length).toBe(1);

    const navIconButton = element.find('#nav-icon button');
    expect(navIconButton.length).toBe(1);

    navIconButton.simulate('click');

    const closeDrawerButton = element.find('.MuiDrawer-root .MuiPaper-root .makeStyles-drawerHeader-14 button');
    expect(closeDrawerButton);

    closeDrawerButton.simulate('click');
  });
});
