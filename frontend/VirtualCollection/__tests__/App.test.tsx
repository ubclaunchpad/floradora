import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('expo-linking');

describe('<App />', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
