import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
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
        <SearchBar setUser={setUser} />
      </AppContext.Provider>
    );
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
    // const mockData = { id: 1 }
    fetchMock.mock('/account/by-name/username', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', 200);

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
    fetchMock.mock('/account/by-name/username', 404);
    fetchMock.mock('/account/user/1', 404);
    const component = mount(searchBar);
    expect(component.length).toBe(1);
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/username', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', 200);

    const component = mount(searchBar);
    expect(component.length).toBe(1);
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/username', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', 200);

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'username' } });

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
    fetchMock.mock('/account/by-name/username', 404);
    fetchMock.mock('/account/user/1', 404);

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
    fetchMock.mock('/account/by-name/username', { status: 200, id: 1 });
    fetchMock.mock('/account/user/1', { status: 200, body: { id: 1, username: 'username' } });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'username' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 40, which: 40 });
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 13, which: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/username', { status: 404, id: 1 });
    fetchMock.mock('/account/user/1', { status: 200, body: { id: 1, username: 'username' } });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'username' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 40, which: 40 });
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 13, which: 13 });
    }, 1000);
    jest.runAllTimers();
  });

  test('renders without errors', () => {
    fetchMock.mock('/account/by-name/username', { status: 404, id: 1 });
    fetchMock.mock('/account/user/1', { status: 200, body: { id: 1, username: 'username' } });

    const component = mount(searchBar);
    const searchInput = component.find('#search-bar input');
    expect(searchInput.length).toBe(1);

    searchInput.simulate('change', { target: { value: 'username' } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);

    jest.useFakeTimers();
    setTimeout(() => {
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 40, which: 40 });
      searchInput.simulate('keydown', { preventDefault() { }, keyCode: 13, which: 13 });
    }, 1000);
    jest.runAllTimers();
  });
});
