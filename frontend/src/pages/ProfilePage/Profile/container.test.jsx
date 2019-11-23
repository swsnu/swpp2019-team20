import React from 'react';
import { mount, shallow } from 'enzyme'
import Profile from './container'

describe('Profile', () => {
  const request = (
    {
      kakao_id: 'pika',
      phone: '010-1234-5678',
      bio: 'hello~',
      username: 'ming',
      id: 1,
    }
  )
  test('renders without errors', () => {
    const component = shallow(<Profile />);
    expect(component.length).toEqual(1);
  });
  it('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({ json: () => request }));
    mount(<Profile />);
    expect(mockFn).toBeCalledTimes(1);
  });
});