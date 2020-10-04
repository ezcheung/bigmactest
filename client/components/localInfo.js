import React from 'react';


export default class LocalInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			numMacs : 0
		}
	}

	getNumMacs() {
		if(isNan(this.props.inMoney) || this.props.inMoney < 0) return -1; //error state
	}

	render() {
		return <div>
			<div>You could buy</div>
			{this.props.inMoney}
		</div>
	}
}