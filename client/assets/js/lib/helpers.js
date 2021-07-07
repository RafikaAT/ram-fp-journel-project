const {
	putDataToApi,
	getDataFromApi,
	deleteDataFromApi,
	postDataToApi,
} = require('./fetch_utilities');

async function createAllJournals() {
	const url = 'http://localhost:5000/journals';
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

	const emojisList = createEmojisHTML(emojis);
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
	const url = `http://localhost:5000/journals/${journalId}/comments`;
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

	const emojisList = createEmojisHTML(emojis);
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
function createEmojisHTML({ likes, loves, dislikes }) {
	const emojisList = document.createElement('ul');

	const likesLi = document.createElement('li');
	likesLi.textContent = `👍: ${likes}`;
	const lovesLi = document.createElement('li');
	lovesLi.textContent = `❤: ${loves}`;
	const dislikesLi = document.createElement('li');
	dislikesLi.textContent = `👎: ${dislikes}`;

	emojisList.append(likesLi);
	emojisList.append(lovesLi);
	emojisList.append(dislikesLi);

	return emojisList;
}
module.exports = { createAllJournals };
