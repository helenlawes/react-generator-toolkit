import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from './_NAME_Context';

class _NAME_ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	get contextValues() {
		return this.state;
	}

	render() {
		const { children } = this.props;
		return <Provider value={this.contextValues}>{children}</Provider>;
	}
}

_NAME_.propTypes = {
	children: PropTypes.node,
};

export default _NAME_;
