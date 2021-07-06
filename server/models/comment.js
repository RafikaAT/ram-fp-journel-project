const { readDataFromFile, writeDataToFile } = require('./data');

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

	writeNewCommentDataToFile(data) {
		const hasFileBeenUpdated = writeDataToFile(data);
		if (!hasFileBeenUpdated) throw new Error('Data not written to file.');
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
		this.writeNewCommentDataToFile(data);
		return newComment;
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
		data.comments[commentIndex] = newCommentData;
		const newComment = new Comment(newCommentData);
		this.writeNewCommentDataToFile(data);
		return newComment;
	}

	static findCommentById(idToFind) {
		const data = this.getAllData();
		const comment = data.comments.filter((comment) => idToFind === comment.id)[0];
		return new Comment(comment) || null;
	}

	static deleteAllCommentsInJournal(journalId) {
		const data = this.getAllData();
		data.comments = data.comments.filter((comment) => comment.journalId !== journalId);
		this.writeNewCommentDataToFile(data);
		return true;
	}

	static updateEmoji(emoji, isIncrement, commentId) {
		const data = this.getAllData();
		const validEmojis = ['like', 'love', 'dislike'];
		if (!validEmojis.includes(emoji)) throw new Error('Invalid emoji');
		const commentIndex = data.comments.find((comment) => comment.id === commentId);
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
