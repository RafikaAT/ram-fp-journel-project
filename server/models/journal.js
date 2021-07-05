const fs = require('fs');
const jsonData = fs.readFileSync('../data.json');
const data = JSON.parse(jsonData);

class Journal {
	constructor(content, category, id, comments = []) {
		this.content = content;
		this.category = category;
		this.id = id;
		this.comments = comments;
	}
// Akash is now going to try and attempt to make a function that will add journal entries the journal object.
	static createNewJournalEntry(journal) {
		const newJournalId = jsonData.length + 1;
		const newJournal = new Journal ({ id: newJournalId, ...journal});
		jsonData.push(newJournal);
		return newJournal;
	}

	createNewId() {
		const allIds = data.journals.map((journal) => journal.id);
		const newId = Math.max(Math.max(...allIds) + 1, 0);
		return newId;
	}

	static all() {
		const allJournals = data.journals.map(
			(journal) => new Journal(journal.content, journal.category, journal.id, journal.comments)
		);
		return allJournals;
	}

	static findJournalById(idToFind) {
		const { content, category, id, comments } = data.journals.filter(
			(journal) => idToFind === journal.id
		)[0];
		return new Journal(content, category, id, comments);
	}
}
