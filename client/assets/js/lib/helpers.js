const {
	putDataToApi,
	getDataFromApi,
	deleteDataFromApi,
	postDataToApi,
} = require('./fetch_utilities');
const { fetchGiphyData, handleGiphySearch, shuffleImage } = require('./giphy');
const urlInfo = require('../urlInfo');

async function createAllJournals() {
	const category = window.location.pathname.split('.')[0];
	const url = `${urlInfo.backEnd}journals/categories${category}`;
	const data = await getDataFromApi(url);
	const journals = data.journalEntries.map(async (journal) => {
		return createJournalHTML(journal);
	});
	const allJournals = Promise.all(journals).then((journal) => journal);
	return allJournals;
}

// accept journalData object and comments array
async function createJournalHTML(journal) {
	const { id, title, content, giphyData, emojis, comments } = journal;
	const journalArticle = document.createElement('article');
	journalArticle.id = id;

	const journalTitle = document.createElement('h3');
	journalTitle.textContent = title;
	journalArticle.append(journalTitle);

	const journalContent = document.createElement('p');
	journalContent.textContent = content;
	journalArticle.append(journalContent);

	if (giphyData) {
		const giphyImg = document.createElement('img');
		giphyImg.src = giphyData.src;
		giphyImg.alt = giphyData.alt;
		journalArticle.append(giphyImg);
	}

	const emojisList = createEmojisHTML(emojis, true, id);
	journalArticle.append(emojisList);

	const isComments = comments.length > 0;
	const commentsDiv = await createComments(journal, isComments);
	journalArticle.append(commentsDiv);

	return journalArticle;
}

async function createComments(journal, isComments) {
	const journalId = journal.id;
	const commentsDiv = document.createElement('div');
	commentsDiv.classList.add('comments');
	const url = `${urlInfo.backEnd}journals/${journalId}/comments`;
	const data = await getDataFromApi(url);
	if (isComments) {
		data.comments.forEach((comment) => {
			commentsDiv.append(createCommentHtml(comment));
		});
	}

	const commentButton = await createAddCommentButton(journal);
	commentsDiv.append(commentButton);

	return commentsDiv;
}

async function createAddCommentButton(journal) {
	const addCommentDiv = document.createElement('div');
	const addCommentButton = document.createElement('button');
	addCommentButton.innerText = 'Comment';
	addCommentDiv.append(addCommentButton);

	addCommentButton.addEventListener('click', () => {
		handleAddCommentButtonClick(journal, addCommentDiv, addCommentButton);
	});

	return addCommentDiv;
}

async function handleAddCommentButtonClick(journal, div, button) {
	if (document.querySelector('form')) {
		alert('Please submit your other comment first.');
		return;
	}
	button.style.display = 'none';
	const form = document.createElement('form');

	const commentInputLabel = document.createElement('label');
	commentInputLabel.setAttribute('for', 'commentInput');
	commentInputLabel.textContent = 'comment';
	form.append(commentInputLabel);

	const commentInput = document.createElement('input');
	commentInput.setAttribute('name', 'commentInput');
	commentInput.setAttribute('type', 'text');
	commentInput.setAttribute('required', true);
	commentInput.id = 'commentInput';
	form.append(commentInput);

	// GIPHY

	// <label for="giphy" class="form-label">Select A Gif</label>
	const giphyInputLabel = document.createElement('label');
	giphyInputLabel.setAttribute('for', 'giphy');
	giphyInputLabel.textContent = 'Search for a gif';
	form.append(giphyInputLabel);

	// <input type="text" name="giphy" id="giphy" class="hidden-input" />
	// giphyInput.addEventListener('keydown', handleGiphySearch);
	const giphyInput = document.createElement('input');
	giphyInput.setAttribute('name', 'giphy');
	giphyInput.setAttribute('type', 'text');
	giphyInput.id = 'giphy';
	giphyInput.addEventListener('keydown', handleGiphySearch);
	form.append(giphyInput);

	// <button class="giphy-search">search</button>
	// giphyButton.addEventListener('click', handleGiphySearch);
	const giphySearchButton = document.createElement('button');
	giphySearchButton.innerText = 'Search';
	giphySearchButton.className = 'giphy-search';
	giphySearchButton.addEventListener('click', handleGiphySearch);
	form.append(giphySearchButton);

	// <img src="" alt="" class="giphy-image" />
	const giphyImage = document.createElement('img');
	giphyImage.src = '';
	giphyImage.alt = '';
	giphyImage.className = 'giphy-image';
	form.append(giphyImage);

	// <button class="shuffle hidden">Shuffle</button>
	// shuffleButton.addEventListener('click', (e) => {
	// 	e.preventDefault();
	// 	shuffleImage();
	// });
	const giphyShuffleButton = document.createElement('button');
	giphyShuffleButton.innerText = 'Shuffle';
	giphyShuffleButton.className = 'shuffle hidden';
	giphyShuffleButton.addEventListener('click', (e) => {
		e.preventDefault();
		shuffleImage();
	});
	form.append(giphySearchButton);

	const submitInput = document.createElement('input');
	submitInput.setAttribute('type', 'submit');
	form.append(submitInput);

	div.append(form);

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		await handleAddCommentFormSubmit(e, div, giphyImage, journal);
	});
}

async function handleAddCommentFormSubmit(e, div, img, journal) {
	const reqBody = {
		comment: {
			comment: e.target.commentInput.value,
			giphyData: {
				src: img.src,
				alt: img.alt,
			},
		},
	};
	const url = `${urlInfo.backEnd}journals/${journal.id}/comments`;

	const data = await postDataToApi(url, reqBody);

	const newComment = await createCommentHtml(data);
	div.append(newComment);

	console.log(div);
}

function createCommentHtml({ id, comment, giphyData, emojis }) {
	const commentDiv = document.createElement('div');
	commentDiv.id = id;
	commentDiv.classList.add('comment');

	const commentBody = document.createElement('p');
	commentBody.textContent = comment;
	commentDiv.append(commentBody);

	if (giphyData) {
		const giphyImg = document.createElement('img');
		giphyImg.src = giphyData.src;
		giphyImg.alt = giphyData.alt;
		commentDiv.append(giphyImg);
	}

	const emojisList = createEmojisHTML(emojis, false, id);
	commentDiv.append(emojisList);

	return commentDiv;
}

// TODO: add click event listeners to emojis to update data
function createEmojisHTML({ likes, loves, dislikes }, isJournal, id) {
	addEmojiToLocalStorage(id);
	const emojisList = document.createElement('ul');
	emojisList.className = `${id} ${isJournal}`;

	const likesLi = document.createElement('li');
	likesLi.textContent = `👍: ${likes}`;
	likesLi.classList.add('likes');
	if (getEmojiState('likes', id)) {
		likesLi.classList.add('emoji-checked');
	}
	likesLi.addEventListener('click', handleEmojiClick);

	const lovesLi = document.createElement('li');
	lovesLi.textContent = `❤: ${loves}`;
	lovesLi.classList.add('loves');
	if (getEmojiState('loves', id)) {
		lovesLi.classList.add('emoji-checked');
	}
	lovesLi.addEventListener('click', handleEmojiClick);

	const dislikesLi = document.createElement('li');
	dislikesLi.textContent = `👎: ${dislikes}`;
	dislikesLi.classList.add('dislikes');
	if (getEmojiState('dislikes', id)) {
		dislikesLi.classList.add('emoji-checked');
	}
	dislikesLi.addEventListener('click', handleEmojiClick);

	emojisList.append(likesLi);
	emojisList.append(lovesLi);
	emojisList.append(dislikesLi);

	return emojisList;
}
module.exports = { createAllJournals };

function updateEmojiLocalStorage(emojiToUpdate, id) {
	const { localStorage } = window;
	let emojis = JSON.parse(localStorage.getItem('emojis'));
	// find index of emoji to update in stored array
	emojiIndex = emojis.emojis.findIndex((item) => item.id === id);
	const emojiToStore = {
		likes: false,
		loves: false,
		dislikes: false,
		id: id,
	};
	if (emojiIndex >= 0) {
		emojis.emojis[emojiIndex][emojiToUpdate] = !emojis.emojis[emojiIndex][emojiToUpdate];
	} else {
		emojis.emojis.push(emoji);
	}

	localStorage.setItem('emojis', JSON.stringify(emojis));
	return emojis.emojis[emojiIndex][emojiToUpdate];
}

function addEmojiToLocalStorage(id) {
	const { localStorage } = window;
	let emojis = JSON.parse(localStorage.getItem('emojis'));
	// if emojis array doesn't exist in local storage create it
	if (!emojis) {
		localStorage.setItem('emojis', JSON.stringify({ emojis: [] }));
		emojis = localStorage.getItem('emojis');
	}

	// if emoji is not in local storage add it.
	emojiIndex = emojis.emojis.findIndex((item) => item.id === id);
	if (emojiIndex === -1) {
		const emojiToStore = {
			likes: false,
			loves: false,
			dislikes: false,
			id: id,
		};
		emojis.emojis.push(emojiToStore);
		localStorage.setItem('emojis', JSON.stringify(emojis));
	}
}

function getEmojiState(emoji, id) {
	const { localStorage } = window;
	let emojis = JSON.parse(localStorage.getItem('emojis'));
	emojiIndex = emojis.emojis.findIndex((item) => item.id === id);
	return emojis.emojis[emojiIndex][emoji];
}

async function handleEmojiClick(e) {
	e.target.textContent.split(':');
	const emojiClickedInfo = e.target.textContent.split(':');
	const emojiClicked =
		emojiClickedInfo[0] === '👍' ? 'likes' : emojiClickedInfo[0] === '❤' ? 'loves' : 'dislikes';

	const [parentId, isParentJournal] = e.target.parentNode.classList;
	let journalId =
		isParentJournal === 'true' ? parentId : e.target.parentNode.parentNode.parentNode.parentNode.id;

	const url = `${urlInfo.backEnd}journals/${journalId}/${
		isParentJournal === 'true' ? emojiClicked : `comments/${parentId}/${emojiClicked}`
	}`;
	const isEmojiChecked = getEmojiState(emojiClicked, parentId);
	const requestBody = {
		isEmojiChecked,
	};

	const updatedEntry = await putDataToApi(url, requestBody);

	const emoji = e.target;
	const newEmojiCount =
		isParentJournal === 'true'
			? updatedEntry.journal.emojis[emojiClicked]
			: updatedEntry.comment.emojis[emojiClicked];
	emojiClickedInfo[1] = newEmojiCount;
	emoji.textContent = emojiClickedInfo.join(':');

	const newState = updateEmojiLocalStorage(emojiClicked, parentId);

	if (newState) {
		emoji.classList.add('emoji-checked');
	} else {
		emoji.classList.remove('emoji-checked');
	}
}
