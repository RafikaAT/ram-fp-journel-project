(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { postDataToApi } = require('./lib/fetch_utilities');
const urlInfo = require('./urlInfo');

const form = document.querySelector('form');
form.addEventListener('submit', submitJournalEntry);

async function submitJournalEntry(e) {
	e.preventDefault();

	// TODO replace giphyData with real data
	const journalEntryData = {
		category: e.target.category.value,
		title: e.target.title.value,
		content: e.target.content.value,
		giphyData: {
			src: 'https://media.giphy.com/media/RLW9YEaSBfBMt79fm4/giphy.gif',
			alt: 'deadpool',
		},
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

},{"./lib/fetch_utilities":2,"./urlInfo":3}],2:[function(require,module,exports){
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
	} catch (error) {
		console.error(err);
		return false;
	}
}

module.exports = { putDataToApi, getDataFromApi, deleteDataFromApi, postDataToApi };

},{}],3:[function(require,module,exports){
const urlInfo = {
	frontEnd: 'http://localhost:3000/',
	backEnd: 'http://localhost:5000/',
};

module.exports = urlInfo;

},{}]},{},[1]);
