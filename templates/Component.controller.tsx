import * as React from 'react';

import Styled_COMPONENT_ from './_COMPONENT_.styles';

interface Props {
	children?: React.ReactNode;
}

class _COMPONENT_ extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return <Styled_COMPONENT_>{children}</Styled_COMPONENT_>;
	}
}

export default _COMPONENT_;
