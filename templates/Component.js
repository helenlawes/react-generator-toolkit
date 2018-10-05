import React from 'react';
import PropTypes from 'prop-types';

import StyledComponent from './Component.styles';

const Component = ({ children }) => (
	<StyledComponent>{children}</StyledComponent>
);

Component.description = `
	Component component
`;

Component.propTypes = {
	children: PropTypes.node,
};

export default Component;
