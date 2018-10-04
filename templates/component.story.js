import React from 'react';
import { storiesOf, withInfo } from '../../utils/stories';

import component from './component';

storiesOf('Components/component', module)
	.addDecorator((story, context) =>
		withInfo(component.description)(story)(context)
	)
	.add('Default', () => (
		<component></component>
	));
