const express = require('express');
const categoriesRouter = express.Router();

categoriesRouter.get('/', (req, res) => {
	// TODO get all categories and return them
	res.status(200).send({ categories: 'All categories' });
});

categoriesRouter.get('/:category', (req, res) => {
	const { category } = req.params;
	// TODO get all journal entries in category and return them
	res.status(200).send({ journalEntries: `All journal entries in ${category}` });
});

module.exports = categoriesRouter;
