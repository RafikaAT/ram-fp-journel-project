const { readDataFromFile, writeDataToFile } = require('./data'); 
const { v4: uuidv4 } = require('uuid');

class Journal {
	constructor(journal) {
		this.content = journal.content;
		this.title = journal.title;
		this.category = journal.category;
		this.id = journal.id;
		this.comments = journal.comments || [];
		this.emojis = journal.emojis || {
			likes: 0,
			loves: 0,
			dislikes: 0,
	};
}
	static writeNewJournalDataToFile(data) {
		try {
			writeDataToFile(data);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	static getAllData() {
		const allData = readDataFromFile();
		return allData;
	}

	static createNewJournalEntry(journal) {
		const data = this.getAllData();
		const newJournalId = this.createNewId();
		const newJournalData = { id : newJournalId, ... journal };
		const newJournal = new Journal(newJournalData);
		data.journals.push(newJournalData);
		this.writeNewJournalDataToFile(data);
		return newJournal;
	}

	static createNewId() {
		// const allIds = data.journals.map((journal) => journal.id);
		// const newId = Math.max(Math.max(...allIds) + 1, 0);
		const newId = uuidv4();
		return newId;
	}

	static all() {
		const data = this.getAllData();
		const allJournals = data.journals.map((journal) => new Journal(journal));
		return allJournals;
	}

	static findJournalById(idOfJournal) {
		const data = this.getAllData();
		const journal = data.journals.filter((journal) => idOfJournal === journal.id) [0];
		return new Journal(journal) || null;
	}

	static deleteJournalById(idOfJournalToDelete) {
		const data = this.getAllData();
		const journal = this.findJournalById(idOfJournalToDelete);
		if(!journal) return null;
		data.journals = data.journals.filter((journal) => journal.id !== idOfJournalToDelete);
		this.writeNewJournalDataToFile(data);
		return true;
	}

	static updateEmoji(emoji, isIncrease, journalId){
		const data = this.getAllData();
		const selectionOfEmojis = ['like', 'love', 'dislike'];
		if (!selectionOfEmojis.includes(emoji)) throw new Error('Unavailable emojis');
		const journalIndex = data.journals.find((journal) => journal.id === JournalId);
		if (isIncrease) {
			data.journals[journalIndex].emojis[emoji]++;
		} else {
			data.journals[journalIndex].emojis[emoji]--;
		}
		this.writeNewJournalDataToFile(data);
		return new Journal(data.journals[journalIndex]);
	}

	static updateJournal(newJournalData) {
		const data = this.getAllData();
		console.log("random string");
		const journalIndex = data.journals.findIndex((journal) => journal.id === newJournalData.id);
		console.log("random string 2", journalIndex);
		data.journals[journalIndex].content = newJournalData.content;
		data.journals[journalIndex].title = newJournalData.title;
		console.log("random string 3");
		const newJournal = new Journal(data.journals[journalIndex]);
		console.log("random string 4");
		this.writeNewJournalDataToFile(data);
		return newJournal;
	}

	static getAllCategories() {
		const data = this.getAllData();
		const categories = [];
		const categoryData= data.journals
			.map(journal => journal.category)
			.forEach(category => {
			if (!categories.includes(category)) {
				categories.push(category)
			}
		})
		return categories;
	}

	static getJournalsByCategory(category) {
		const data = this.getAllData();
		const allJournalsOfCategory = data.journals.filter((journal) => category === journal.category)
		.map(journal => new Journal(journal)); 
		if (allJournalsOfCategory.length === 0) return null;
		return allJournalsOfCategory;
	}
}	

module.exports = Journal;