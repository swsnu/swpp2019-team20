import React from 'react';
import {mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import Rating from './container';

describe('rating', () => {

  let rating;

  beforeEach(() => {
    rating = (
      <BrowserRouter>
        <Rating/>
      </BrowserRouter>
    );
  });

  it('should render without error', () => {
    const component = mount(rating);
    expect(component.length).toEqual(1);
  });

  const request = {rating: 4.0}

  it('works with fetch', async () => {
    const mockFn = jest.spyOn(window, 'fetch').mockImplementation(() => ({json: () => request}));
    mount(rating);
    expect(mockFn).toBeCalledTimes(1);
  });
})