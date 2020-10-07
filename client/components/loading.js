import React from 'react';

/**
* Component to display while the app is loading information
*/
export default class LoadingComp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return <div id="loading">
				<h1>Loading...</h1>
			   </div>
	}
}