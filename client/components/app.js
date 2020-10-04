import React from 'react';
import LoadingComp from './loading.js';
import LocalInfo from './localInfo.js';
import { getCountry, getIndex } from '../models/getCountryInfo.js';

export default class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {
			loading : true,
			country : null,
			inMoney : 0
		}

		this.index = null;
	}

	//When component mounts, load country data and display
	componentDidMount() {
		getCountry().then(data => {this.setState({country: data, loading: this.fullyLoaded()})});
		getIndex().then(data => {
			this.index = data;
			console.log(this.index);
			this.setState({loading: this.fullyLoaded()});
		})
	}

	fullyLoaded() {
		return (this.state.country != null && this.index != null);
	}

	moneyField() {
		return 
		<div>
			<label>Please enter an amount of money in your local currency</label>
			<input
	          	defaultValue=""
	            onChange={(e)=>{
	              this.setState({inMoney:e.currentTarget.value});
	            }
	          }
	        />
	    </div>
	}



	render() {
		if(this.state.loading) {
			return <LoadingComp/>;
		}
		return <div>
				<h1>{this.state.country}</h1>
				{this.moneyField()}
				<LocalInfo inMoney={this.state.inMoney} country={this.state.country}/>
				<button onClick={() => this.increaseMoney()}>Test</button>
				{this.state.inMoney}
			   </div>
	}
}