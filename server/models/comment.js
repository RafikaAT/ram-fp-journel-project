const fs = require('fs');
const jsonData = fs.readFileSync('../data.json');
const data = JSON.parse(jsonData);

class Comment {
	constructor(comment) {
		this.content = comment.content;
		this.category = comment.category;
		this.id = comment.id;
		this.journalId = comment.journalId;
	}

	static createNewId() {
		const allIds = data.comments.map((comment) => comment.id);
		const newId = Math.max(Math.max(...allIds) + 1, 0);
		return newId;
	}

	static all() {
		const allComments = data.comments.map((comment) => new Comment(comment));
		return allComments;
	}

	static createNewComment(comment) {
		const newCommentId = this.createNewId();
		const newComment = new Comment({ id: newCommentId, ...comment });
		data.comments.push(newComment);
		return newComment;
	}

	static deleteCommentById(commentIdToDelete) {
		const comment = this.findCommentById(commentIdToDelete);
		if (!comment) return null;
		data.comments = data.comments.filter((comment) => comment.id !== commentIdToDelete);
		return true;
	}

	static updateComment(newComment) {
		const commentIndex = data.comments.findIndex((comment) => comment.id === newComment.id);
		data.comments[commentIndex] = newComment;
		return new Comment(newComment);
	}

	static findCommentById(idToFind) {
		const comment = data.comments.filter((comment) => idToFind === comment.id)[0];
		return new Comment(comment) || null;
	}

	static deleteAllCommentsInJournal(journalId) {
		data.comments = data.comments.filter((comment) => comment.journalId !== journalId);
		return true;
	}
}

module.exports = Comment;
