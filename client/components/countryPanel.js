import React from 'react';

const currencyRegex = /^(\d*(.\d{0,2})?(e\d+)?)$/

/**
* Component for a single country's information, either local or random
*/
export default class CountryPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
		}
	}

	/**
	* Gets the number of Big Macs the user could buy with this.props.inMoney in the selected country
	*/
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

	/**
	* Gets the ratio of currency value between the local country and randomized country
	*/
	getMoneyRatio() {
		if(!this.props.randCountryInfo.dollarPrice) return 0; //error state
		return this.props.myCountryInfo.dollarPrice / this.props.randCountryInfo.dollarPrice;
	}

	/**
	* Gets the local PPP out of myCountryInfo
	*/
	getPPP() {
		if(!this.props.myCountryInfo) return 0;
		return this.props.myCountryInfo.ppp;
	}

	/**
	* Gets the amount of money inMoney is worth in the randomized country
	*/
	getRandMoney() {
		return (this.props.inMoney * this.getMoneyRatio()).toFixed(2);
	}

	/**
	* Returns the JSX component to display how many Big Macs can be bought
	*/
	dispNumMacs() {
		if(this.props.inMoney == "") return (<div className="infoText">Enter an amount of money to see how many Big Macs you could buy in {this.props.randCountryInfo ? this.props.randCountryInfo.country : "your country"}!</div>)

		if(isNaN(this.props.inMoney) || this.props.inMoney < 0 || !currencyRegex.test(this.props.inMoney)) {
			return (<div className="infoText">Please enter a valid amount of money</div>)
		}

		let numMacs = this.getNumMacs();

		if(!this.props.randCountryInfo) {
			return (<div className="infoText">You could buy {numMacs} Big {numMacs == 1 ? "Mac" : "Macs"} in your country</div>);
		}
		
		return (
			<div>
				<div className="infoText">You could buy <b>{numMacs} Big {numMacs == 1 ? "Mac" : "Macs"}</b> in {this.props.randCountryInfo.country} with {this.props.inMoney}!</div>
				<div className="infoText">Your {this.props.inMoney} is worth about <b>{this.getRandMoney()}</b> in {this.props.randCountryInfo.country}</div>
			</div>			
			)
	}

	/**
	* Returns the JSX for displaying the local PPP
	*/
	dispPPP() {
		if(!this.props.randCountryInfo) {
			return (<div className="infoText">Your Dollar Purchasing Parity (PPP) is <b>{this.getPPP()}</b></div>)
		}
	}

	/**
	* Returns the JSX for displaying the title of the panel
	*/
	dispCountryName() {
		if(this.props.randCountryInfo) {
			return (<h1>Random Country: {this.props.randCountryInfo.country}</h1>);
		}
		return (<h1>Local Country Info</h1>);
	}

	render() {
		return (
		<div className="countryInfo third">
			<div className="panelText">
				{this.dispCountryName()}
				<div className="numMacs infoText">{this.dispNumMacs()}</div>
				{this.dispPPP()}
			</div>
		</div>
		)
	}
}