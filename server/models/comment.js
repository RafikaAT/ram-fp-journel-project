const { readDataFromFile, writeDataToFile } = require('./data');

class Comment {
	constructor(comment) {
		this.content = comment.content;
		this.category = comment.category;
		this.id = comment.id;
		this.journalId = comment.journalId;
	}

	static getAllData() {
		const allData = readDataFromFile();
		return allData;
	}

	static createNewId() {
		const data = this.getAllData();
		const allIds = data.comments.map((comment) => comment.id);
		const newId = Math.max(Math.max(...allIds) + 1, 0);
		return newId;
	}

	static all() {
		const data = this.getAllData();
		const allComments = data.comments.map((comment) => new Comment(comment));
		return allComments;
	}

	static createNewComment(comment) {
		const data = this.getAllData();
		const newCommentId = this.createNewId();
		const newCommentData = { id: newCommentId, ...comment };
		const newComment = new Comment(newCommentData);
		data.comments.push(newCommentData);
		const hasFileBeenUpdated = writeDataToFile(data);
		if (hasFileBeenUpdated) {
			return newComment;
		} else {
			throw new Error('Data not written to file.');
		}
	}

	static deleteCommentById(commentIdToDelete) {
		const data = this.getAllData();
		const comment = this.findCommentById(commentIdToDelete);
		if (!comment) return null;
		data.comments = data.comments.filter((comment) => comment.id !== commentIdToDelete);
		const hasFileBeenUpdated = writeDataToFile(data);
		if (hasFileBeenUpdated) {
			return true;
		} else {
			throw new Error('Data not written to file.');
		}
	}

	static updateComment(newCommentData) {
		const data = this.getAllData();
		const commentIndex = data.comments.findIndex((comment) => comment.id === newCommentData.id);
		data.comments[commentIndex] = newCommentData;
		const newComment = new Comment(newCommentData);
		const hasFileBeenUpdated = writeDataToFile(data);
		if (hasFileBeenUpdated) {
			return newComment;
		} else {
			throw new Error('Data not written to file.');
		}
	}

	static findCommentById(idToFind) {
		const data = this.getAllData();
		const comment = data.comments.filter((comment) => idToFind === comment.id)[0];
		return new Comment(comment) || null;
	}

	static deleteAllCommentsInJournal(journalId) {
		const data = this.getAllData();
		data.comments = data.comments.filter((comment) => comment.journalId !== journalId);
		const hasFileBeenUpdated = writeDataToFile(data);
		if (hasFileBeenUpdated) {
			return true;
		} else {
			throw new Error('Data not written to file.');
		}
	}
}

module.exports = Comment;
