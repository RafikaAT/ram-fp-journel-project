const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment');

commentsRouter.get('/', (req, res) => {
	try {
		const journalId = req.body.journalId;
		const comments = Comment.getAllCommentsInJournal(journalId);
		res.status(200).send({ comments });
	} catch (err) {
		res.status(500).send();
	}
});

commentsRouter.post('/', (req, res) => {
	console.log(req.body.comment);
	try {
		const { comment } = req.body;
		console.log(comment);
		const journalId = req.params.journalId;
		comment.journalId = req.body.journalId;
		if (comment.comment.length > 100) {
			res.status(400).send({ message: 'The comment cannnot exceed 100 characters' });
		}
		const newComment = Comment.createNewComment(comment);
		res.status(200).send({ comment: newComment });
	} catch (err) {
		res.status(500).send();
	}
});

// /journals/:journalId/comments/:commentId endpoint

commentsRouter.put('/:commentId', (req, res) => {
	const { comment } = req.body;
	const updatedComment = Comment.updateComment(comment);
	res.status(200).send({ comment: updatedComment });
});

commentsRouter.delete('/:commentId', (req, res) => {
	try {
		const commentId = req.params.commentId;
		const isDeleted = Comment.deleteCommentById(commentId);
		if (isDeleted) {
			res.status(204).send();
		} else {
			res.status(400).send();
		}
	} catch (err) {
		res.status(500).send();
	}
});

commentsRouter.put('/:commentId/:emoji', (req, res) => {
	const newEmojiStatus = !req.body.isEmojiChecked;
	const commentId = req.params.commentId;
	const emojiToUpdate = req.params.emoji;
	const updatedComment = Comment.updateEmoji(emojiToUpdate, newEmojiStatus, commentId);
	res.status(200).send({ comment: updatedComment });
});

module.exports = commentsRouter;
