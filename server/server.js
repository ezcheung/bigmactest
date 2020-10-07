let express = require('express');
let path = require('path');
let app = express();
let browserify = require('browserify-middleware');
let fetch = require('node-fetch');
const indexBuilder = require('./indexBuilder.js');

let countryIndex = {};
let port = process.env.PORT || 4000;

/*
* Starts the server
*/
let startListening = function() {
	let listener = app.listen(port);
	console.log("Listening on port:" + port);

	process.on('SIGINT', function(){
		console.log("Shutting down");
	  	listener.close(); //make sure to close port
		process.exit(0);
	});
}

app.use(express.static(path.join(__dirname, "../client/public")));


// Endpoints
app.get('/bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require("babelify"), { presets: ["es2015", "react"] } ] ]
  })
);

app.get('/countryIndex',
	(req, res) => {
		res.send(countryIndex);
	})

app.get('/myCountry', 
	(req, res) => {
		//debug line if ipvigilante is down 
		//return res.send({data: "The United States", ok: true});

		// When running on localhost, ip will just be home - use server's home
		ip = (req.ip && (req.ip.includes("127.0.0.1") || req.ip.includes("::1"))) ? "" : req.ip

		var options = {
		    port : 443,
		    method : 'GET',
		    headers: {'User-Agent': 'request'}
		};

		return fetch(`https://ipvigilante.com/json/${ip}`,options)
		.then((data) => data.json())
		.then(data => {
			let countryName = indexBuilder.addTheToCountry(data.data.country_name);
			res.send({data: countryName, ok: true});
		})
		.catch(err => {
			console.log("Error: ", err.message);
			res.status(500).send({error: err.message, ok: false});
		})
	})

//Fetch raw table, cache the values, then start listening
fetch("https://raw.githubusercontent.com/zelima/big-mac-index/master/data/big-mac-index.csv")
.then((res) => (res.text()))
.then((body) => (countryIndex = indexBuilder.parseIndexCSV(body)))
.then(() => (startListening()))
.catch((err) => (console.log(err)))


