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
