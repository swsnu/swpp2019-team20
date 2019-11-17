import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App, { AppContext } from '../../App';
import IndexPage from './IndexPage';

describe('IndexPage', () => {
  let index;
  // eslint-disable-next-line
  let onSubmitSpy;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    function onLoggedIn() {
      setUser({ loggedIn: true, username: '' });
    }

    index = (
      <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
        <BrowserRouter>
          <IndexPage />
        </BrowserRouter>
      </AppContext.Provider>
    );

    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 204,
        };
        return Promise.resolve(result);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  test('when loggedIn is true', () => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    const component = mount(
      <AppContext.Provider value={{ user, setUser }}>
        <App />
      </AppContext.Provider>,
    );
    expect(component.length).toBe(1);
  });


  test('renders without errors', () => {
    const component = mount(index);
    expect(component.length).toBe(1);
  });
});
