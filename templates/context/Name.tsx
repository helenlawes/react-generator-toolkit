import * as React from 'react';

import { Provider } from './_NAME_Context';

interface Props {
	children?: React.ReactNode;
}

class _NAME_ extends React.Component<Props> {
	constructor(props: Props) {
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

export default _NAME_;
