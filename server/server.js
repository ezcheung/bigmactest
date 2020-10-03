let express = require('express');
let path = require('path');
let app = express();
let browserify = require('browserify-middleware');
let fetch = require('node-fetch');

/*
* Function to parse the index CSV into a useful object
* Assumes the CSV is formatted as a table with \n separating rows, and commas separating columns
* Return object formatted as: {Country: {key: value}}
*/
let parseIndexCSV = function(csv) {
	if(!csv) return {};

	let arr = csv.split('\r\n');
	if(arr.length <= 0) return {};

	let index = {};
	let keys = ['country','date','localPrice','dollarEx','dollarPrice','ppp','valuation'];

	for(let i = 1; i < arr.length; i++) {
		if(arr[i].length <= 0) continue;

		let row = arr[i].split(',');
		let country = row[0];
		let date = Date.parse(row[1]);
		if(index[country] != undefined && index[country].date >= date) {
			// if we already have parsed a row, and it's more recent than the current value, quit out
			continue;
		}
		if(index[country] == undefined) {
			index[country] = {'date':date} //initialize new country
		}

		for(let j = 2; j < row.length; j++) {
			index[country][keys[j]] = row[j]; //save values into index
		}
	}
	return index;
}

let port = process.env.PORT || 4000;

let startListening = function() {
	let listener = app.listen(port);
	console.log("Listening on localhost:" + port);

	process.on('SIGINT', function(){
		console.log("Shutting down");
	  	listener.close(); //make sure to close port
		process.exit(0);
	});
}

let countryIndex = {};

//Fetch raw table, cache the values, then start listening
fetch("https://raw.githubusercontent.com/zelima/big-mac-index/master/data/big-mac-index.csv")
.then((res) => (res.text()))
.then((body) => (countryIndex = parseIndexCSV(body)))
.then(() => (startListening()))
.catch((err) => (console.log(err)))


app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require("babelify"), { presets: ["es2015", "react"] } ] ]
  })
);

app.get('/countries',
	(req, res) => {
		res.send(countryIndex);
		res.status(200).send();
	})

app.get('/myCountry', 
	(req, res) => {
		ip = req.ip == "::1" ? "" : req.ip

		var options = {
		    port : 443,
		    method : 'GET',
		    headers: {'User-Agent': 'request'}
		};

		return fetch(`https://ipvigilante.com/json/${ip}`,options)
		.then((data) => data.json())
		.then(data => {
			res.send(data.data);
		})
		.catch(err => console.log("Error: ", err))
	})



