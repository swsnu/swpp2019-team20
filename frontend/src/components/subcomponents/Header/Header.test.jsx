import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';
import { AppContext } from '../../../App';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
    const component = shallow(<Header />);
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
  });
});
