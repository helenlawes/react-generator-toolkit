import * as React from 'react';
import { storiesOf, withInfo } from '../../stories';

import _COMPONENT_ from './_COMPONENT_';

storiesOf('_COMPONENT_', module)
	.addDecorator((story, context) =>
		withInfo(_COMPONENT_.description)(story)(context),
	)
	.add('Default', () => <_COMPONENT_ />);
