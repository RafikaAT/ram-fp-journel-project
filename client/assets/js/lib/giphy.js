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
