import React from 'react';

export default class ErrorComp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return <div id="error">
				<h1>Error!</h1>
				<div>{this.props.error}</div>
			   </div>
	}
}