import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import CreateLoan from './CreateLoan';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@material-ui/pickers', () => ({
  MuiPickersUtilsProvider: (
    // eslint-disable-next-line
    (props) => <div>{props.children}</div>
  ),
  KeyboardDatePicker: (
    // eslint-disable-next-line
    ({ onChange }) => (
      <button type="button" onClick={() => onChange(null)} aria-label="Mute volume" />
    )
  ),
}));

jest.mock('@material-ui/core/Select', () => (
  // eslint-disable-next-line
  ({ onChange }) => (
    <button type="button" onClick={() => onChange({ target: { value: 'testString' } })} aria-label="Mute volume" />
  )
));

jest.mock('../../../components/subcomponents/SearchBar/SearchBar', () => (
  // eslint-disable-next-line
  ({ setUser }) => (
    <input type="text" onChange={(event) => setUser(event.target.value)} />
  )
));

describe('<CreateLoan/>', () => {
  let createLoan;
  // eslint-disable-next-line
  let onSubmitSpy;

  beforeEach(() => {
    createLoan = (
      <BrowserRouter>
        <CreateLoan />
      </BrowserRouter>
    );
  });

  it('should be rendered', () => {
    const component = shallow(createLoan);
    expect(component.length).toBe(1);
  });

  it('add user and delete user', () => {
    const component = mount(createLoan);
    // let participants = component.find('SearchBar');
    let participants = component.find('#paid-money input');
    expect(participants.length).toBe(1);

    const addUserButton = component.find('#add-user-button button');
    addUserButton.simulate('click');

    // participants = component.find('SearchBar');
    participants = component.find('#paid-money input');
    expect(participants.length).toBe(2);

    const deleteButton = component.find('.delete-button svg').at(0);
    deleteButton.simulate('click');

    participants = component.find('#paid-money input');
    expect(participants.length).toBe(1);
  });

  it('write user name', () => {
    const component = mount(createLoan);

    const searchBar = component.find('.participant input').at(0);
    searchBar.simulate('change', { target: { value: null } });
    searchBar.simulate('change', { target: { value: { username: 'user1', id: 1 } } });
  });


  it('write paid money', () => {
    const component = mount(createLoan);
    const paidMoney = component.find('#paid-money input').at(0);
    paidMoney.simulate('change', { target: { value: 3000 } });
  });

  it('set deadline', () => {
    const component = mount(createLoan);
    /* use component mocking */

    const datePicker = component.find('.deadline button');
    datePicker.simulate('click');
  });

  it('change interest rate', () => {
    const component = mount(createLoan);

    /* turn on interest */
    const interestSwitch = component.find('.interest-valid input');
    interestSwitch.simulate('change', { target: { checked: true } });
    /* change interest rate */
    const interestRate = component.find('.interest-rate input');
    interestRate.simulate('change', { target: { value: 5 } });
  });

  it('change interest type', () => {
    const component = mount(createLoan);

    /* turn on interest */
    const interestSwitch = component.find('.interest-valid input');
    interestSwitch.simulate('change', { target: { checked: true } });

    /* use component mocking */
    const interestType = component.find('.interest-type button');
    interestType.simulate('click');
  });

  it('change alert frequency', () => {
    const component = mount(createLoan);

    /* use component mocking */
    const alertFrequency = component.find('.alert-frequency button');
    alertFrequency.simulate('click');
  });

  it('click register button with blank username', () => {
    const component = mount(createLoan);

    /* register - fail */
    const registerButton = component.find('#register-button button');
    registerButton.simulate('click');
  });

  it('click register button with too less user', () => {
    const component = mount(createLoan);

    /* write ID */
    const searchBar = component.find('.participant input').at(0);
    searchBar.simulate('change', { target: { value: { username: 'user1', id: 1 } } });

    /* register - fail */
    const registerButton = component.find('#register-button button');
    registerButton.simulate('click');
  });

  it('backend error happened', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 204,
        };
        return Promise.resolve(result);
      });

    const component = mount(createLoan);

    /* add user */
    const addUserButton = component.find('#add-user-button button');
    addUserButton.simulate('click');

    /* write ID */
    let searchBar = component.find('.participant input').at(0);
    searchBar.simulate('change', { target: { value: { username: 'user1', id: 1 } } });
    searchBar = component.find('.participant input').at(1);
    searchBar.simulate('change', { target: { value: { username: 'user2', id: 2 } } });

    /* register - success */
    const registerButton = component.find('#register-button button');
    registerButton.simulate('click');
  });

  it('click register button with valid input', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 201,
        };
        return Promise.resolve(result);
      });

    const component = mount(createLoan);

    /* add user */
    const addUserButton = component.find('#add-user-button button');
    addUserButton.simulate('click');
    addUserButton.simulate('click');
    addUserButton.simulate('click');

    /* delete one user */
    const deleteButton = component.find('.delete-button svg').at(3);
    deleteButton.simulate('click');

    /* write ID */
    let searchBar = component.find('.participant input').at(0);
    searchBar.simulate('change', { target: { value: { username: 'user1', id: 1 } } });
    searchBar = component.find('.participant input').at(1);
    searchBar.simulate('change', { target: { value: { username: 'user2', id: 2 } } });
    searchBar = component.find('.participant input').at(2);
    searchBar.simulate('change', { target: { value: { username: 'user2', id: 2 } } });

    /* turn on interest */
    const interestSwitch = component.find('.interest-valid input');
    interestSwitch.simulate('change', { target: { checked: true } });
    /* change interest rate */
    const interestRate = component.find('.interest-rate input');
    interestRate.simulate('change', { target: { value: 5 } });

    /* register - success */
    const registerButton = component.find('#register-button button');
    registerButton.simulate('click');
  });
});
