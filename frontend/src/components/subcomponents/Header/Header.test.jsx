import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';

describe('Header', () => {
    test('renders without errors', () => {
        const component = mount(<Header />);
        expect(component.length).toBe(1);
    });
});
