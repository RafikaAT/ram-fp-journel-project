const { readDataFromFile, writeDataToFile } = require('./data');
const { v4: uuidv4 } = require('uuid');

class Comment {
	constructor(comment) {
		this.comment = comment.comment;
		this.category = comment.category;
		this.id = comment.id;
		this.journalId = comment.journalId;
		this.emojis = comment.emojis || {
			likes: 0,
			loves: 0,
			dislikes: 0,
		};
	}

	static writeNewCommentDataToFile(data) {
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

	static createNewId() {
		// const data = this.getAllData(); don't think you need this
		const newId = uuidv4();
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
		this.writeNewCommentDataToFile(data);
		return newComment;
	}

	static getAllCommentsInJournal(journalId) {
		const data = this.getAllData();
		const comments = data.comments
			.filter((comment) => comment.journalId === journalId)
			.map((comment) => new Comment(comment));
		console.log(
			data.comments.map((comment) => comment.journalId),
			comments
		);
		if (comments.length === 0) return null;
		return comments;
	}

	static deleteCommentById(commentIdToDelete) {
		const data = this.getAllData();
		const comment = this.findCommentById(commentIdToDelete);
		if (!comment) return null;
		data.comments = data.comments.filter((comment) => comment.id !== commentIdToDelete);
		this.writeNewCommentDataToFile(data);
		return true;
	}

	static updateComment(newCommentData) {
		const data = this.getAllData();
		const commentIndex = data.comments.findIndex((comment) => comment.id === newCommentData.id);
		data.comments[commentIndex].comment = newCommentData.comment;
		const newComment = new Comment(newCommentData);
		this.writeNewCommentDataToFile(data);
		return newComment;
	}

	static findCommentById(idToFind) {
		const data = this.getAllData();
		const comment = data.comments.filter((comment) => idToFind === comment.id)[0];
		if (!comment) return null;
		return new Comment(comment);
	}

	static deleteAllCommentsInJournal(journalId) {
		const data = this.getAllData();
		data.comments = data.comments.filter((comment) => comment.journalId !== journalId);
		this.writeNewCommentDataToFile(data);
		return true;
	}

	static updateEmoji(emoji, isIncrement, commentId) {
		const data = this.getAllData();
		const validEmojis = ['likes', 'loves', 'dislikes'];
		if (!validEmojis.includes(emoji)) throw new Error('Invalid emoji');
		const commentIndex = data.comments.findIndex((comment) => comment.id === commentId);
		if (isIncrement) {
			data.comments[commentIndex].emojis[emoji]++;
		} else {
			data.comments[commentIndex].emojis[emoji]--;
		}
		this.writeNewCommentDataToFile(data);
		return true;
	}
}

module.exports = Comment;
