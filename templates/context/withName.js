import React from 'react';
import { Consumer } from './_NAME_context';

const with_NAME_ = Component => {
	const C = React.forwardRef((props, ref) => (
		<Consumer>
			{context => <Component {...props} ref={ref} {...context} />}
		</Consumer>
	));
	C.displayName = `with_NAME_(${Component.displayName || Component.name})`;
	return C;
};

export default with_NAME_;
