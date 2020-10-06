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
				<img src="https://i.pinimg.com/originals/50/7e/92/507e92e1d92210aac1a7130c8757a0dd.gif"/>
			   </div>
	}
}