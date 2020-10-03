import React from 'react';
import LoadingComp from './loading.js';
import { getCountry } from '../models/getCountry.js';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading : true,
			country : 'Your Country Here'
		}
	}

	componentDidMount() {
		getCountry().then(data => {this.setState({country: data, loading:false})});
	}

	render() {
		if(this.state.loading) {
			return <LoadingComp/>;
		}
		return <div>
				<h1>{this.state.country}</h1>
			   </div>
	}
}