import React from 'react';

/**
* Component to display if we encounter an error setting up the application
*/
export default class ErrorComp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return <div id="error" className="third">
				<h1>Error!</h1>
				<div id="errMsg"><b>{this.props.error}</b></div>
			   </div>
	}
}