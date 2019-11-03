import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
    test('renders without errors', () => {
        const component = shallow(<LoginPage />);
        expect(component.length).toBe(1);
    });
});
