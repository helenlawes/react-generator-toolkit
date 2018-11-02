import React from 'react';
import PropTypes from 'prop-types';

import StyledComponent from './Component.styles';

class Component extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return (
			<StyledComponent>{children}</StyledComponent>
		);
	}
}

Component.description = `
	Component component
`;

Component.propTypes = {
	children: PropTypes.node,
};

export default Component;
