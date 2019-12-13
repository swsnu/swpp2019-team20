import React from 'react';
import { shallow, mount } from 'enzyme';
import AccountProfile from './AccountProfile';

describe('AccountProfile', () => {
  const props = ({
    userInfo:
      {
        mine: true,
        id: 1,
        username: 'user1',
        kakao_id: 'kakao1',
        phone: '010-1111-1111',
        bio: 'bio',
        twilio_msg: 'message1',
        profile_img: 'img',
      },
  });

  const accountProfile = (
    <AccountProfile>
      {props}
    </AccountProfile>
  );

  // eslint-disable-next-line
  let onSubmitSpy;

  test('renders without errors', () => {
    const component = shallow(accountProfile);
    expect(component.length).toEqual(1);
  });

  test('submit profile with invalid input', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 400,
        };
        return Promise.resolve(result);
      });

    const component = mount(accountProfile);
    const editButton = component.find('.edit-button button');
    expect(editButton.length).toBe(1);
    editButton.simulate('click');

    const submitButton = component.find('.submit-button button');
    expect(submitButton.length).toBe(1);
    submitButton.simulate('click');
  });

  test('submit profile with valid input', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 200,
        };
        return Promise.resolve(result);
      });

    const component = mount(accountProfile);
    const editButton = component.find('.edit-button button');
    editButton.simulate('click');

    const kakao = component.find('.kakaoID input');
    kakao.simulate('change', { target: { value: 'kakao2' } });

    const phone = component.find('.phone input');
    phone.simulate('change', { target: { value: '010-2222-2222' } });

    const message = component.find('.message input');
    message.simulate('change', { target: { value: 'message2' } });


    const submitButton = component.find('.submit-button button');
    submitButton.simulate('click');
  });

  test('click image upload button', () => {
    const component = mount(accountProfile);

    let wrapper = component.find('ImageUpload');
    expect(wrapper.length).toBe(0);

    const uploadImageButton = component.find('.MuiPaper-root .MuiCardActions-root button#image-upload');
    uploadImageButton.simulate('click');

    wrapper = component.find('ImageUpload');
    expect(wrapper.length).toBe(1);
  });

  test('delete profile image success', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 200,
        };
        return Promise.resolve(result);
      });

    const component = mount(accountProfile);

    const deleteImageButton = component.find('.MuiPaper-root .MuiCardActions-root button#image-delete');
    deleteImageButton.simulate('click');
  });

  test('delete profile image fail', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 400,
        };
        return Promise.resolve(result);
      });

    const component = mount(accountProfile);

    const deleteImageButton = component.find('.MuiPaper-root .MuiCardActions-root button#image-delete');
    deleteImageButton.simulate('click');
  });
});
