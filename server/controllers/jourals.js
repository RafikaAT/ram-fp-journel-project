const express = require('express');
const journalsRouter = express.Router();

// /journals endpoint

journalsRouter.get('/', (req, res) => {
	res.status(200).send({ journals: 'All journals' });
});

module.exports = journalsRouter;
