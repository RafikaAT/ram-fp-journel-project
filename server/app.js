const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// create server
const app = express();

// add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).send({ message: 'Hello World!' });
});

// mount routers
const journalsRouter = require('./controllers/jourals');
app.use('/journals', journalsRouter);

module.exports = app;
