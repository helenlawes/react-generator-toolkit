import * as React from 'react';
import { shallow } from 'enzyme';
import _COMPONENT_ from '_PATH_/_COMPONENT_';

describe('<_COMPONENT_ />', () => {
	test('Should render without error', () => {
		const component = shallow(<_COMPONENT_ />);

		expect(component).toMatchSnapshot();
	});
});
