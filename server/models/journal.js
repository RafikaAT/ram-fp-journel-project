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
		const allIds = data.journals.map((journal) => journal.id);
		const newId = Math.max(Math.max(...allIds) + 1, 0);
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
		return true;
	}

	static updateJournal(newJournalData) {
		const data = this.getAllData();
		const journalIndex = data.journals.findIndex((journal) => journal.id === newJournalData.id);
		data.journals[journalIndex] = newJournalData;
		const newJournal = new Journal(newJournalData);
		this.writeNewJournalDataToFile(data);
		return newJournal;
}	