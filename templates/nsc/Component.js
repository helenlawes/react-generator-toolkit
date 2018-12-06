import React from 'react';
import PropTypes from 'prop-types';

const _COMPONENT_ = ({ children }) => <div>{children}</div>;

_COMPONENT_.description = `
	_COMPONENT_ component
`;

_COMPONENT_.propTypes = {
	children: PropTypes.node,
};

export default _COMPONENT_;
