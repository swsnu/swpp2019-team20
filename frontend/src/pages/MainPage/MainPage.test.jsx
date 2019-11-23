import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../App';
import MainPage from './MainPage';

describe('MainPage', () => {
  let mainpage;
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

    mainpage = (
      <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </AppContext.Provider>
    );
  });

  test('WrappedComponent is rendered', () => {
    const wrapper = mount(mainpage);
    expect(wrapper.length).toBe(1);
  });
});
