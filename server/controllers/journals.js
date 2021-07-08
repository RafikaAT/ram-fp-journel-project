const express = require('express');
const journalsRouter = express.Router();
const Journal = require('../models/journal');

// /journals endpoint

journalsRouter.get('/', (req, res) => {
	try {
		const journals = Journal.all();
		res.status(200).send({ journals });
	} catch (err) {
		res.status(500).send;
	}
});

journalsRouter.post('/', (req, res) => {
	try {
		const { journal } = req.body;
		if (journal.content.length > 400 || journal.title.length > 50) {
			res.status(400).send();
		}
		const newJournalEntry = Journal.createNewJournalEntry(journal);
		res.status(200).send({ newJournalEntry });
	} catch (err) {
		res.status(500).send();
	}
});

journalsRouter.get('/:journalId', (req, res) => {
	try {
		const journalId = req.params.journalId;
		const foundJournal = Journal.findJournalById(journalId);
		res.status(200).send({ foundJournal });
		//MAYBE: Should put if statement here; if foundJournal is empty, status 204?
	} catch (err) {
		res.status(500).send();
	}
});

journalsRouter.put('/:journalId', (req, res) => {
	try {
		const { journal } = req.body;
		const journalId = req.params.journalId;
		journal.id = journalId;
		const updatedJournal = Journal.updateJournal(journal);
		res.status(200).send({ journal: updatedJournal });
	} catch (err) {
		res.status(500).send();
	}
});

journalsRouter.delete('/:journalId', (req, res) => {
	try {
		const journalid = req.params.journalId;
		const isDeleted = Journal.deleteJournalById(journalid);
		if (isDeleted) {
			res.status(204).send();
		} else {
			res.status(400).send();
		}
	} catch (err) {
		res.status(500).send();
	}
});

journalsRouter.put('/:journalId/:emoji', (req, res) => {
	const newEmojiStatus = !req.body.isEmojiChecked;
	const journalId = req.params.journalId;
	const emojiToUpdate = req.params.emoji;
	const updatedJournal = Journal.updateEmoji(emojiToUpdate, newEmojiStatus, journalId);
	res.status(200).send({ journal: updatedJournal });
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
