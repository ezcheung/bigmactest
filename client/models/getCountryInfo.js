export function getCountry() {
	return fetch('/myCountry')
	.then(response => {
		return response.json();
	})
	.then(data => {
		if(!data.ok) {
			throw new Error(data.error)
		}
		return data.data
	})
};

export function getIndex() {
	return fetch('/countryIndex')
	.then(response => response.json())
	.then(data => data)
	.catch(err => err)
}