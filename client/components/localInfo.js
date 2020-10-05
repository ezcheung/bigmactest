import React from 'react';

const currencyRegex = /\d*(.\d{0,2})?$/

export default class LocalInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
		}
	}

	getNumMacs() {
		if(isNaN(this.props.inMoney) || this.props.inMoney < 0 || !this.props.countryInfo) return 0; //error state
		let localPrice = this.props.countryInfo.localPrice;
		if(localPrice) return (Math.floor(this.props.inMoney / localPrice));
		else 0;
	}


	getPPP() {
		if(!this.props.countryInfo) return 0;
		return this.props.countryInfo.ppp;
	}

	dispNumMacs() {
		if(this.props.inMoney == "") return (<div>Enter an amount of money to see how many Big Macs you could buy!</div>)

		if(isNaN(this.props.inMoney) || this.props.inMoney < 0 || !currencyRegex.test(this.props.inMoney)) {
			return (<div>Please enter a valid amount of money</div>)
		}
		return (<div>You could buy {this.getNumMacs()} Big Macs in your country</div>)
	}

	dispPPP() {
		return (<div>Your Dollar Purchasing Parity (PPP) is {this.getPPP()}</div>)
	}


	render() {
		return <div>
			{this.dispNumMacs()}
			{this.dispPPP()}
		</div>
	}
}