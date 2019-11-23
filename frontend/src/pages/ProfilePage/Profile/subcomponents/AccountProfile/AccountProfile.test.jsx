import React from 'react';
import { shallow } from 'enzyme';
import AccountProfile from './AccountProfile';

describe('AccountProfile', () => {
  const props = ({
    userInfo:
      {
        kakao_id: 'pika',
        phone: '010-1234-5678',
        bio: 'hello~',
        username: 'ming',
        id: 1,
      },
  });
  const accountProfile = (
    <AccountProfile>
      {props}
    </AccountProfile>
  );
  test('renders without errors', () => {
    const component = shallow(accountProfile);
    expect(component.length).toEqual(1);
  });
});
