export function getCountry() {
	return fetch('/myCountry')
	.then(response => response.json())
	.then(data => data.country_name)
	.catch(err => console.log("Error: ", err))
};

export function getIndex() {
	return fetch('/countryIndex')
	.then(response => response.json())
	.then(data => data)
	.catch(err => console.log("Error: ", err))
}