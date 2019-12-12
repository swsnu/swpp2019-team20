import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import ImageUpload from './ImageUpload';

describe('<ImageUpload/>', () => {

  // eslint-disable-next-line
  let onSubmitSpy;

  it('change state', () => {
    

    /*
    const submitButton = component.find('.previewComponent .fileInput');
    const blob = new Blob(['foo'], {type : 'text/plain'});
    submitButton.simulate('change', {preventDefault: () => {}, target: { files: [blob] }});
    */

   const component = mount(<ImageUpload />);

    const fileContents = 'file contents';
    const expectedFinalState = {fileContents: fileContents};
    const file  = new File([fileContents], 'TEST_FILE.png', {type : 'image/png'});
    
    const readAsDataURL = jest.fn();
    const onloadend = jest.fn((_, evtHandler) => { evtHandler(); });
    const dummyFileReader = {onloadend, readAsDataURL, result: fileContents};
    window.FileReader = jest.fn(() => dummyFileReader);

    spyOn(component, 'setState').and.callThrough();
    // spyOn(component, 'changeHandler').and.callThrough(); // not yet working

    
    component.find('input').simulate('change', {target: {files: [file]}});

    
  })

  it('change state2', () => {
    const file  = new File(['file contents'], 'TEST_FILE.png', {type : 'image/png'});
    const component = mount(<ImageUpload />);
    let wrapper = component.find('input');
    wrapper.simulate('change', { target: { files: [file] } });
  })

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
    submitButton.simulate('click', {preventDefault: jest.fn()});

    submitButton = component.find('.previewComponent form');
    submitButton.simulate('submit', {preventDefault: () => {}});
  })

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
    submitButton.simulate('click', {preventDefault: () => {}});
  })


})