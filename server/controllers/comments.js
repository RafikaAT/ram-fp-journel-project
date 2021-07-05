const express = require('express');
const commentsRouter = express.Router();

commentsRouter.get('/', (req, res) => {
	// TODO get all comments and return them
	res.status(200).send({ comments: 'All comments' });
});

commentsRouter.post('/', (req, res) => {
	const { commentContent } = req.body;
	// TODO create new comment and return it
	res.status(200).send({ comment: 'New comment' });
});

// /journals/:journalId/comments/:commentId endpoint

commentsRouter.put('/:commentId', (req, res) => {
	const commentId = req.params.commentId;
	// TODO update comment and return it
	res.status(200).send({ commentId });
});

commentsRouter.delete('/:commentId', (req, res) => {
	const commentId = req.params.commentId;
	// TODO if comment exits delete it
	res.status(204).send();
});

module.exports = commentsRouter;
