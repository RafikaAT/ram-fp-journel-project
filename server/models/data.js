const fs = require('fs');

function readDataFromFile() {
	const jsonData = fs.readFileSync('../data.json');
	const data = JSON.parse(jsonData);
	return data;
}

static function writeNewCommentDataToFile(data) {
	try {
		writeDataToFile(data);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = { readDataFromFile, writeDataToFile };
