(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { renderJournalsToPage } = require('./lib/handlers');

document.addEventListener('DOMContentLoaded', renderJournalsToPage);

// fetch all journals
// foreach journal
// fetch comments
// construct journal html
// append comments

},{"./lib/handlers":3}],2:[function(require,module,exports){
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
    const reqObj = { method: "DELETE" };
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

module.exports = {
  putDataToApi,
  getDataFromApi,
  deleteDataFromApi,
  postDataToApi,
};

},{}],3:[function(require,module,exports){
const { createAllJournals } = require('./helpers');

async function renderJournalsToPage() {
	const journals = await createAllJournals();
	const main = document.querySelector('main');
	journals.forEach((journal) => {
		main.append(journal);
	});
}

module.exports = { renderJournalsToPage };

},{"./helpers":4}],4:[function(require,module,exports){
const {
	putDataToApi,
	getDataFromApi,
	deleteDataFromApi,
	postDataToApi,
} = require('./fetch_utilities');

const urlInfo = require('../urlInfo');

async function createAllJournals() {
	const url = `${urlInfo.backEnd}journals`;
	const data = await getDataFromApi(url);
	const journals = data.journals.map(async (journal) => {
		return createJournalHTML(journal);
	});
	const allJournals = Promise.all(journals).then((journal) => journal);
	return allJournals;
}

// accept journalData object and comments array
async function createJournalHTML({ id, title, content, giphyData, emojis, comments }) {
	const journalArticle = document.createElement('article');
	journalArticle.id = id;

	const journalTitle = document.createElement('h3');
	journalTitle.textContent = title;
	journalArticle.append(journalTitle);

	const journalContent = document.createElement('p');
	journalContent.textContent = content;
	journalArticle.append(journalContent);

	const emojisList = createEmojisHTML(emojis, true, id);
	journalArticle.append(emojisList);

	if (giphyData) {
		const giphyImg = document.createElement('img');
		giphyImg.src = giphyData.src;
		giphyImg.alt = giphyData.alt;
		journalArticle.append(giphyImg);
	}

	if (comments.length) {
		const commentsDiv = await createComments(id);
		journalArticle.append(commentsDiv);
	}

	return journalArticle;
}

async function createComments(journalId) {
	const commentsDiv = document.createElement('div');
	const url = `${urlInfo.backEnd}journals/${journalId}/comments`;
	const data = await getDataFromApi(url);
	commentsDiv.classList.add('comments');
	data.comments.forEach((comment) => {
		commentsDiv.append(createCommentHtml(comment));
	});

	return commentsDiv;
}

function createCommentHtml({ id, comment, giphyData, emojis }) {
	const commentDiv = document.createElement('div');
	commentDiv.id = id;
	commentDiv.classList.add('comment');

	const commentBody = document.createElement('p');
	commentBody.textContent = comment;
	commentDiv.append(commentBody);

	const emojisList = createEmojisHTML(emojis, false, id);
	commentDiv.append(emojisList);

	if (giphyData) {
		const giphyImg = document.createElement('img');
		giphyImg.src = giphyData.src;
		giphyImg.alt = giphyData.alt;
		commentDiv.append(giphyImg);
	}

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
	const emoji = document.querySelector(`#${parentId} .${e.target.classList[0]}`);
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

},{"../urlInfo":5,"./fetch_utilities":2}],5:[function(require,module,exports){
const urlInfo = {
	frontEnd: 'http://localhost:3000/',
	backEnd: 'http://localhost:5000/',
};

module.exports = urlInfo;

},{}]},{},[1]);
