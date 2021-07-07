const express = require('express');
const giphyRouter = express.Router();
const https = require('https');

giphyRouter.get('/', async (req, res) => {
	const { search } = req.query;
	const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=5`;
	https
		.get(url, (response) => {
			response.setEncoding('utf8');
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				res.status(200).send({ data: JSON.parse(data) });
			});
		})
		.on('error', (err) => {
			console.log(err);
			res.status(500).send();
		});
});

module.exports = giphyRouter;
