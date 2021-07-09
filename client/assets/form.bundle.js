(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { postDataToApi, getDataFromApi } = require('./lib/fetch_utilities');
const { handleGiphySearch, shuffleImage } = require('./lib/giphy');
const urlInfo = require('./urlInfo');

const form = document.querySelector('form');
form.addEventListener('submit', submitJournalEntry);

async function submitJournalEntry(e) {
	e.preventDefault();
	const giphyImage = document.querySelector('.giphy-image');

	const giphyData = {
		src: giphyImage.src,
		alt: giphyImage.alt,
	};
	if (!giphyData.src.includes('giphy')) {
		alert('Please add a gif!');
		return;
	}
	// TODO replace giphyData with real data
	const journalEntryData = {
		category: e.target.category.value.toLowerCase(),
		title: e.target.title.value,
		content: e.target.content.value,
		giphyData,
	};

	const journalBody = {
		journal: journalEntryData,
	};
	const url = `${urlInfo.backEnd}journals`;
	const data = await postDataToApi(url, journalBody);

	const category = data.newJournalEntry.category.toLowerCase();

	switch (category) {
		case 'anime':
			window.location.href = `${urlInfo.frontEnd}anime.html`;
			break;
		case 'food':
			window.location.href = `${urlInfo.frontEnd}food.html`;
			break;
		case 'movies':
			window.location.href = `${urlInfo.frontEnd}movies.html`;
			break;
		default:
			break;
	}
}

const giphyInput = document.getElementById('giphy');
const giphyButton = document.querySelector('.giphy-search');
giphyInput.addEventListener('keydown', handleGiphySearch);
giphyButton.addEventListener('click', handleGiphySearch);

const shuffleButton = document.querySelector('.shuffle');
shuffleButton.addEventListener('click', (e) => {
	e.preventDefault();
	shuffleImage();
});

},{"./lib/fetch_utilities":2,"./lib/giphy":3,"./urlInfo":4}],2:[function(require,module,exports){
async function getDataFromApi(url) {
	try {
		const fetchedData = await fetch(url);
		const dataFromJSON = await fetchedData.json();
		return dataFromJSON;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function deleteDataFromApi(url) {
	try {
		const reqObj = { method: 'DELETE' };
		await fetch(url, reqObj);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function postDataToApi(url, body) {
	try {
		const reqObj = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		};
		const fetchedData = await fetch(url, reqObj);
		const dataFromJSON = await fetchedData.json();
		return dataFromJSON;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function putDataToApi(url, body) {
	try {
		const reqObj = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		};
		const fetchedData = await fetch(url, reqObj);
		const dataFromJSON = await fetchedData.json();
		return dataFromJSON;
	} catch (err) {
		console.error(err);
		return false;
	}
}

module.exports = {
	putDataToApi,
	getDataFromApi,
	deleteDataFromApi,
	postDataToApi,
};

},{}],3:[function(require,module,exports){
const { getDataFromApi } = require('./fetch_utilities');
const urlInfo = require('../urlInfo');

let index = 0;
let images;

async function fetchGiphyData() {
	const giphyInput = document.getElementById('giphy');

	const searchTerm = giphyInput.value;
	const url = `${urlInfo.backEnd}giphy?search=${searchTerm}`;
	const giphyImages = await getDataFromApi(url);
	index = 0;
	return giphyImages;
}

async function handleGiphySearch(e) {
	const giphyInput = document.getElementById('giphy');
	if (e.type === 'click') {
		e.preventDefault();
	}
	if ((e.type === 'click' || e.key === 'Enter') && giphyInput.value !== '') {
		e.preventDefault();
		const data = await fetchGiphyData();
		images = data.data.data;
		renderGif();

		const shuffleButton = document.querySelector('.shuffle');
		shuffleButton.classList.remove('hidden');
	}
}

function renderGif() {
	const giphyImage = document.querySelector('.giphy-image');
	const src = images[index].images.original.url;
	const alt = images[index].title;
	giphyImage.src = src;
	giphyImage.alt = alt;
}

function shuffleImage() {
	index = index >= images.length ? 0 : index + 1;
	renderGif();
}

module.exports = { fetchGiphyData, handleGiphySearch, shuffleImage };

},{"../urlInfo":4,"./fetch_utilities":2}],4:[function(require,module,exports){
const urlInfo =
	window.location.hostname === 'localhost'
		? {
				frontEnd: 'http://localhost:3000/',
				backEnd: 'http://localhost:5000/',
		  }
		: {
				frontEnd: 'https://journell.netlify.app/',
				backEnd: 'https://journell.herokuapp.com/',
		  };

module.exports = urlInfo;

},{}]},{},[1]);
