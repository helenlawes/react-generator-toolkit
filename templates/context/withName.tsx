import * as React from 'react';
import { Consumer } from './_NAME_context';

const with_NAME_ = (Component: React.ComponentType) => {
	const C = React.forwardRef((props, ref) => (
		<Consumer>
			{(context: any) => <Component {...props} ref={ref} {...context} />}
		</Consumer>
	));
	C.displayName = `with_NAME_(${Component.displayName || Component.name})`;
	return C;
};

export default with_NAME_;
