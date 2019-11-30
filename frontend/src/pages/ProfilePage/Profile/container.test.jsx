import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Profile from './container';

describe('Profile', () => {
  const request = (
    {
      kakao_id: 'pika',
      phone: '010-1234-5678',
      bio: 'hello~',
      username: 'ming',
      id: 1,
    }
  );
  let profile;

  beforeEach(() => {
    profile = (
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
  });

  test('renders without errors', () => {
    const component = mount(profile);
    expect(component.length).toEqual(1);
  });

  it('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({ json: () => request }));
    mount(profile);
    expect(mockFn).toBeCalledTimes(1);
  });
});
