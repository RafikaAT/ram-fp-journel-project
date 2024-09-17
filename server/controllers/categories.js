const express = require('express');
const categoriesRouter = express.Router();
const Journal = require('../models/journal');

categoriesRouter.get('/', (req, res) => {
  // TODO get all categories and return them
  res.status(200).send({ categories: 'All categories' });
});

categoriesRouter.get('/:category', (req, res) => {
  try {
    const category = req.params.category;
    const journalsInCategory = Journal.getJournalsByCategory(category);
    res.status(200).send({ journalEntries: journalsInCategory });
  } catch (err) {
    res.status(500).send;
  }
});

module.exports = categoriesRouter;
