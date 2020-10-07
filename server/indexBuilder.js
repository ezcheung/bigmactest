module.exports = {
	/*
	* Function to parse the index CSV into a useful object
	* Assumes the CSV is formatted as a table with \r\n separating rows, and commas separating columns
	* Return object formatted as: {Country: {key: value}}
	*/
	parseIndexCSV : function(csv) {
		if(!csv) return {};

		let arr = csv.split('\r\n');
		if(arr.length <= 0) return {};

		let index = {};
		let keys = ['country','date','localPrice','dollarEx','dollarPrice','ppp','valuation'];

		for(let i = 1; i < arr.length; i++) {
			if(arr[i].length <= 0) continue;

			let row = arr[i].split(',');
			let country = this.addTheToCountry(row[0]);
			let date = Date.parse(row[1]);
			if(index[country] != undefined && index[country].date >= date) {
				// if we already have parsed a row, and it's more recent than the current value, quit out
				continue;
			}
			if(index[country] == undefined) {
				index[country] = {'date':date} //initialize new country
			}

			for(let j = 0; j < row.length; j++) {
				index[country][keys[j]] = row[j]; //save values into index
			}
		}
		return index;
	},

	/*
	* If the country name should start with "The", adds "The"
	* Otherwise, returns passed in name
	* @param countryName - The name of the country
	* @returns The name of the country for display, possibly with "The" prepended
	*/
	addTheToCountry : function(countryName){
			if(countriesWithThe[countryName]) return "The " + countryName;
			return countryName;
		}

}

//List of countries in the table that should be displayed as "The ..."
const countriesWithThe = {
	"United States": true,
	"Phillipines": true,
	"Netherlands": true
}