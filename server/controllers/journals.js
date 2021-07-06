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

journalsRouter.put('/:journalId/:emoji', (req, res) => {
	const journalId = req.params.journalId;
	const emojiToUpdate = req.params.emoji;
	const newEmojiStatus = req.body.isEmojiChecked;
	// TODO update journals emoji counter
	res.status(200).send({ journalId });
});

// mount categories router on /journals/categories

const categoriesRouter = require('./categories');
journalsRouter.use('/categories', categoriesRouter);

// mount comments router on /journals/:journalId/comments

journalsRouter.use('/:journalId', (req, res, next) => {
	const { journalId } = req.params;
	req.body.journalId = journalId;
	next();
});

const commentsRouter = require('./comments');
journalsRouter.use('/:journalId/comments', commentsRouter);

module.exports = journalsRouter;
