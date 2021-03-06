import React from 'react';
import LoadingComp from './loading.js';
import CountryPanel from './countryPanel.js';
import ErrorComp from './errorComp.js';
import { getCountry, getIndex } from '../models/getCountryInfo.js';

/**
* Top level component for the application
*/
export default class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {
			loading : true,
			myCountry : null,
			randCountry: null,
			inMoney : 0,
			index : null,
			error : ""
		}

	}

	//When component mounts, load country data and display
	componentDidMount() {
		getCountry()
		.then(data => {
			this.state.myCountry = data; 
			if(this.state.myCountry == this.state.randCountry) this.state.randomCountry = this.getRandomCountry();
			this.state.loading = !this.fullyLoaded();
			this.forceUpdate();
		})
		.catch(err => {
			this.setState({error: "An error occurred when fetching your local country's information: " + err});
		})

		getIndex().then(data => {
			this.state.index = data;
			this.state.randCountry=this.getRandomCountry();
			this.state.loading = !this.fullyLoaded();
			this.forceUpdate();
		})
		.catch(err => {
			this.setState({error: "An error occurred when fetching the country table: " + err});
		});
	}

	/**
	* Returns true if we're ready to display the page
	*/
	fullyLoaded() {
		return (this.state.myCountry != null && this.state.randCountry != null && this.state.index != null);
	}

	/**
	* Returns the text and input field for the user-entered amount of money
	*/
	moneyField() {
		return (
		<div id="moneyPanel" className="">
			<label>Please enter an amount of money in your local currency: </label>
			<br/>
			<input
				id="inputMoney"
	          	defaultValue=""
	            onChange={(e)=>{
	              this.setState({inMoney:e.currentTarget.value});
	            }
	        }
	        />
	    </div>)
	}

	/**
	* Gets a random country out of the country index
	*/
	getRandomCountry() {
		if(this.state.index == null) return null; //index not retrieved yet

		let countries = Object.keys(this.state.index);
		if(countries.length <= 1) this.setState({error: "Big Mac data only contains one country"});

		let rand = countries[Math.floor(Math.random()*countries.length)];
		
		// Re-roll if the country matches myCountry
		while(rand == this.state.myCountry) {
			rand = countries[Math.floor(Math.random()*countries.length)];
		}
		return rand;
	}

	/**
	* Returns the object for a country's information, given its country name
	*/
	getCountryInfo(country) {
		return this.state.index[country]
	}

	render() {
		if(this.state.error != "") {
			return <ErrorComp error={this.state.error}/>
		}
		if(this.state.loading) {
			return <LoadingComp/>;
		}
		return <div>
					<div id="topThird" className="third">
						<h1 id="hdrMyCountry">You are in {this.state.myCountry}</h1>
						{this.moneyField()}
					</div>
					<CountryPanel inMoney={this.state.inMoney} myCountryInfo={this.getCountryInfo(this.state.myCountry)}/>
					<CountryPanel inMoney={this.state.inMoney} myCountryInfo={this.getCountryInfo(this.state.myCountry)} randCountryInfo={this.getCountryInfo(this.state.randCountry)}/>
			   </div>
	}
}