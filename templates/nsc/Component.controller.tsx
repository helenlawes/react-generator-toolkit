import * as React from 'react';

interface Props {
	children: React.ReactNode;
}

class _COMPONENT_ extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return <div>{children}</div>;
	}
}

export default _COMPONENT_;
