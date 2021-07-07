const fs = require('fs');
const path = require('path');
const nodeEnv = process.env.NODE_ENV;
const dataStore =
	nodeEnv === 'production'
		? '../data.json'
		: nodeEnv === 'dev'
		? '../dev_data.json'
		: '../test_data.json';
const pathToData = path.resolve(__dirname, dataStore);

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
