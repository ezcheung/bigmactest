import React from 'react';

const currencyRegex = /\d*(.\d{0,2})?$/

export default class LocalInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
		}
	}

	getNumMacs() {
		if(isNaN(this.props.inMoney) || this.props.inMoney < 0 || !this.props.myCountryInfo) return 0; //error state
		let localPrice = this.props.myCountryInfo.localPrice;
		if(!this.props.randCountryInfo) {
			if(localPrice) return Math.floor(this.props.inMoney / localPrice);
			return 0;
		}
		else {
			if(this.props.randCountryInfo.dollarPrice && this.props.randCountryInfo.localPrice) {
				return Math.floor(this.props.inMoney * this.getMoneyRatio() / this.props.myCountryInfo.localPrice);
			}
			return 0;
		}
	}

	getMoneyRatio() {
		if(!this.props.randCountryInfo.dollarPrice) return 0; //error state
		return this.props.myCountryInfo.dollarPrice / this.props.randCountryInfo.dollarPrice;
	}


	getPPP() {
		if(!this.props.myCountryInfo) return 0;
		return this.props.myCountryInfo.ppp;
	}

	getRandMoney() {
		return (this.props.inMoney * this.getMoneyRatio()).toFixed(2);
	}

	dispNumMacs() {
		if(this.props.inMoney == "") return (<div>Enter an amount of money to see how many Big Macs you could buy!</div>)

		if(isNaN(this.props.inMoney) || this.props.inMoney < 0 || !currencyRegex.test(this.props.inMoney)) {
			return (<div>Please enter a valid amount of money</div>)
		}

		let numMacs = this.getNumMacs();

		if(!this.props.randCountryInfo) {
			return (<div>You could buy {numMacs} Big Macs in your country</div>);
		}
		
		return (
			<div>
				<div>You could buy {numMacs} Big Macs in {this.props.randCountryInfo.country} with {this.props.inMoney}!</div>
				<div>Your {this.props.inMoney} is worth about {this.getRandMoney()} in {this.props.randCountryInfo.country}</div>
			</div>			
			)
	}

	dispPPP() {
		if(!this.props.randCountryInfo) {
			return (<div>Your Dollar Purchasing Parity (PPP) is {this.getPPP()}</div>)
		}
	}

	dispCountryName() {
		if(this.props.randCountryInfo) {
			return (<h2>Random Country: {this.props.randCountryInfo.country}</h2>);
		}
		return null;
	}


	render() {
		return (
		<div className="countryInfo">
			{this.dispCountryName()}
			{this.dispNumMacs()}
			{this.dispPPP()}
		</div>
		)
	}
}