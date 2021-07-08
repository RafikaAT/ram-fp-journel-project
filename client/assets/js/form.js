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
