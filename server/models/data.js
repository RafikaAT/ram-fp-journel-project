const fs = require('fs');

function readDataFromFile() {
	const jsonData = fs.readFileSync('../data.json');
	const data = JSON.parse(jsonData);
	return data;
}

function writeDataToFile(newData) {
	fs.writeFile('../data.json', JSON.stringify(newData), (err) => {
		if (err) {
			console.log(err);
			return false;
		}
		return true;
	});
}

module.exports = { readDataFromFile, writeDataToFile };
