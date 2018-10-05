import React from 'react';
import { storiesOf, withInfo } from '../../stories';

import Component from './Component';

storiesOf('Component', module)
	.addDecorator((story, context) =>
		withInfo(Component.description)(story)(context)
	)
	.add('Default', () => (
		<Component></Component>
	));
