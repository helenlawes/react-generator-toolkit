import React from 'react';
import PropTypes from 'prop-types';

import Styled_COMPONENT_ from './_COMPONENT_.styles';

class _COMPONENT_ extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return <Styled_COMPONENT_>{children}</Styled_COMPONENT_>;
	}
}

_COMPONENT_.description = `
	_COMPONENT_ component
`;

_COMPONENT_.propTypes = {
	/** prop description */
	children: PropTypes.node,
};

export default _COMPONENT_;
