import React from 'react';
//import loadGif from '../public/assets/burgerLoad.gif';

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