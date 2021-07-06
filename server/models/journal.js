// const fs = require('fs');
// const jsonData = fs.readFileSync('../data.json');
// const data = JSON.parse(jsonData);

const { readDataFromFile, writeDataToFile } = require('./data'); 


class Journal {
	constructor(journal) {
		this.content = journal.content;
		this.category = journal.category;
		this.id = journal.id;
		this.comments = journal.comments || [];
	}
	writeNewJournalDataToFile(data) {
		const hasFileBeenUpdated = writeDataToFile(data);
		if (!hasFileBeenUpdated) throw new Error('Data not written to file.');
	}

	


// Akash is now going to try and attempt to make a function that will add journal entries the journal object.
	static createNewJournalEntry(journal) {
		const newJournalId = createNewId();
		const newJournal = new Journal ({ id: newJournalId, ...journal});
		data.push(newJournal);
		return newJournal;
	}

	createNewId() {
		const allIds = data.journals.map((journal) => journal.id);
		const newId = Math.max(Math.max(...allIds) + 1, 0);
		return newId;
	}

	static all() {
		const allJournals = data.journals.map(
			(journal) => new Journal(journal)
		);
		return allJournals;
	}

	static findJournalById(idToFind) {
		const {journal} = data.journals.filter(
			(journal) => idToFind === journal.id
		)[0];
		return new Journal();
	}


}
