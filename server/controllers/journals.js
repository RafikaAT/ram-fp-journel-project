const express = require('express');
const journalsRouter = express.Router();

// /journals endpoint

journalsRouter.get('/', (req, res) => {
	res.status(200).send({ journals: 'All journals' });
});

journalsRouter.post('/', (req, res) => {
	const journal = req.body;
	// TODO create new journal entry and return new entry
	res.status(201).send({ newJournal: 'New Journal' });
});

// /journals/categories endpoint
const categoriesRouter = require('./categories');
journalsRouter.use('/categories', categoriesRouter);

// /journals/:journalId endpoint

journalsRouter.get('/:journalId', (req, res) => {
	const journalId = req.params.journalId;
	// TODO find journal by id and return journal
	res.status(200).send({ journalId });
});

journalsRouter.put('/:journalId', (req, res) => {
	const journalId = req.params.journalId;
	// TODO update journal entry, return updated entry
	res.status(200).send({ journalId });
});

journalsRouter.delete('/:journalId', (req, res) => {
	const journalId = req.params.journalId;
	// TODO if journal exists delete
	res.status(204).send();
});

// /journals/:journalId/:emoji - update reaction counters

journalsRouter.put('/:journalId/:emoji', (req, res) => {
	const journalId = req.params.journalId;
	const emojiToUpdate = req.params.emoji;
	const newEmojiStatus = req.body.isEmojiChecked;
	// TODO update journals emoji counter
	res.status(200).send({ journalId });
});

// /journals/:journalId/comments endpoint

journalsRouter.get('/:journalId/comments', (req, res) => {
	// TODO get all comments and return them
	res.status(200).send({ comments: 'All comments' });
});

journalsRouter.post('/:journalId/comments', (req, res) => {
	const { commentContent } = req.body;
	// TODO create new comment and return it
	res.status(200).send({ comment: 'New comment' });
});

// /journals/:journalId/comments/:commentId endpoint

journalsRouter.put('/:journalId/comments/:commentId', (req, res) => {
	const commentId = req.params.commentId;
	// TODO update comment and return it
	res.status(200).send({ commentId });
});

journalsRouter.delete('/:journalId/comments/:commentId', (req, res) => {
	const commentId = req.params.commentId;
	// TODO if comment exits delete it
	res.status(204).send();
});

module.exports = journalsRouter;
