import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../../App';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  let searchBar;
  // eslint-disable-next-line
  let onSubmitSpy, onResultSelectSpy;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);
  jest.useFakeTimers();

  beforeEach(() => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    function onLoggedIn() {
      setUser({ loggedIn: true, username: '' });
    }

    searchBar = (
      <AppContext.Provider value={{ user, setUser, onLoggedIn }}>
        <BrowserRouter>
          <SearchBar setUser={setUser} />
        </BrowserRouter>
      </AppContext.Provider>
    );
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
    // const mockData = { id: 1 }
    fetchMock.mock('/account/by-name/testname', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', {
      kakao_id: 'username123',
      phone: '010-1234-5678',
      bio: null,
      username: 'testname',
      id: 1,
    });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'username' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { keyCode: 40 });
      searchInput.simulate('keydown', { keyCode: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/testname', 404);
    fetchMock.mock('/account/user/1', 404);
    const component = mount(searchBar);
    expect(component.length).toBe(1);
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/testname', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', {
      kakao_id: 'username123',
      phone: '010-1234-5678',
      bio: null,
      username: 'testname',
      id: 1,
    });

    const component = mount(searchBar);
    expect(component.length).toBe(1);
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/testname', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', {
      kakao_id: 'username123',
      phone: '010-1234-5678',
      bio: null,
      username: 'testname',
      id: 1,
    });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'testname' } });

    // expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { keyCode: 40 });
      searchInput.simulate('keydown', { keyCode: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/testname', 404);
    fetchMock.mock('/account/user/1', 404);

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'testname' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { keyCode: 40 });
      searchInput.simulate('keydown', { keyCode: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/testname', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', {
      kakao_id: 'username123',
      phone: '010-1234-5678',
      bio: null,
      username: 'testname',
      id: 1,
    });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'testname' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 40, which: 40 });
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 13, which: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 400,
        };
        return Promise.resolve(result);
      });
    fetchMock.mock('/account/by-name/testname', { status: 404, id: 1 });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'testname' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 40, which: 40 });
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 13, which: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 200,
        };
        return Promise.resolve(result);
      });
    fetchMock.mock('/account/by-name/testname', { status: 404, id: 1 });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'testname' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 40, which: 40 });
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 13, which: 13 });
    }, 1000);
    jest.runAllTimers();
  });
});
