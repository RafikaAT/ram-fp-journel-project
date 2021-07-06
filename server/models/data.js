const fs = require('fs');
const pathToData = `${process.cwd()}/data.json`;

function readDataFromFile() {
	const jsonData = fs.readFileSync(pathToData);
	const data = JSON.parse(jsonData);
	return data;
}

function writeDataToFile(newData) {
	fs.writeFile(pathToData, JSON.stringify(newData), (err) => {
		if (err) {
			console.log(err);
			return false;
		}
		return true;
	});
}

module.exports = { readDataFromFile, writeDataToFile };
