import React from 'react';
import {mount} from 'enzyme';
import ReviewList from './container';
import {BrowserRouter} from "react-router-dom";

describe('<ReviewList />', () => {
  let reviewList;

  beforeEach(() => {
    reviewList = (
      <BrowserRouter>
        <ReviewList/>
      </BrowserRouter>
    );
  });

  const request = [{rating: 5.1, content: "shit"},
    {rating: 9.3, content: ">.<"}]

  it('should render without error', () => {
    const component = mount(reviewList);
    expect(component.length).toEqual(1);
  });


  it('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({json: () => request}));
    mount(reviewList);
    expect(mockFn).toBeCalledTimes(1);
  });
});
