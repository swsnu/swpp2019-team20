import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App, { AppContext } from './App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App />', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('when loggedIn is true', () => {
    const [user, setUser] = useStateSpy({
      loggedIn: true,
      username: '',
    });

    const component = shallow(
      <AppContext.Provider value={{ user, setUser }}>
        <App />
      </AppContext.Provider>,
    );
    expect(component.length).toBe(1);
  });

  test('when loggedIn is false', () => {
    const [user, setUser] = useStateSpy({
      loggedIn: false,
      username: '',
    });

    const component = shallow(
      <AppContext.Provider value={{ user, setUser }}>
        <App />
      </AppContext.Provider>,
    );
    expect(component.length).toBe(1);
  });
});
