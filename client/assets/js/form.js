const { postDataToApi } = require('./lib/fetch_utilities');
const urlInfo = require('./urlInfo');

const form = document.querySelector('form');
form.addEventListener('submit', submitJournalEntry);

async function submitJournalEntry(e) {
	e.preventDefault();

	// TODO replace giphyData with real data
	const journalEntryData = {
		category: e.target.category.value.toLowerCase(),
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
