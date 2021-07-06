const fs = require('fs');
const path = require('path');
const pathToData = path.resolve(__dirname, '../data.json');

function readDataFromFile() {
	const jsonData = fs.readFileSync(pathToData);
	const data = JSON.parse(jsonData);
	return data;
}

function writeDataToFile(newData) {
	fs.writeFileSync(pathToData, JSON.stringify(newData), (err) => {
		if (err) console.log(err);
		throw new Error(err);
	});
}

module.exports = { readDataFromFile, writeDataToFile };
