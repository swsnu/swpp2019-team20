import React from 'react';
import { shallow, mount } from 'enzyme';
import ImageUpload from './ImageUpload';

describe('<ImageUpload/>', () => {
  // eslint-disable-next-line
  let onSubmitSpy;

  it('change state', async () => {
    const component = mount(<ImageUpload />);

    const wrapper = component.find('input');
    const file = new File(['file contents'], 'TEST_FILE.png', { type: 'image/png' });
    wrapper.simulate('change', { target: { files: [file] } });
  });

  it('should call render.onloadend', async () => {
    const mocked = jest.fn();
    const file = new File(['file contents'], 'TEST_FILE.png', { type: 'image/png' });
    //
    const mockReader = {
      onloadend: mocked,
      readAsDataURL: mocked,
      result: 'TEST_RESULT,TEST_RESULT',
    };
    mockReader.readAsDataURL = jest.fn(() => mockReader.onloadend());
    window.FileReader = jest.fn(() => mockReader);

    const component = mount(<ImageUpload />);
    const wrapper = component.find('.previewComponent input');
    wrapper.simulate('change', { target: { files: [file] } });
  });

  it('upload image success', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 200,
        };
        return Promise.resolve(result);
      });

    const component = shallow(<ImageUpload />);

    let submitButton = component.find('.previewComponent .submitButton');
    submitButton.simulate('click', { preventDefault: jest.fn() });

    submitButton = component.find('.previewComponent form');
    submitButton.simulate('submit', { preventDefault: () => {} });
  });

  it('upload image fail', () => {
    onSubmitSpy = jest.spyOn(window, 'fetch')
      // eslint-disable-next-line
      .mockImplementation((url) => {
        const result = {
          status: 400,
        };
        return Promise.resolve(result);
      });

    const component = shallow(<ImageUpload />);

    const submitButton = component.find('.previewComponent .submitButton');
    submitButton.simulate('click', { preventDefault: () => {} });
  });
});
