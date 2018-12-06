import React from 'react';
import PropTypes from 'prop-types';

class _COMPONENT_ extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return <div>{children}</div>;
	}
}

_COMPONENT_.description = `
	_COMPONENT_ component
`;

_COMPONENT_.propTypes = {
	children: PropTypes.node,
};

export default _COMPONENT_;
