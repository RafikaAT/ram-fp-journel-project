const {
	putDataToApi,
	getDataFromApi,
	deleteDataFromApi,
	postDataToApi,
} = require('./fetch_utilities');

async function createAllJournals() {
	// TODO fetch real journal Data
	// ******************
	// MOCKDATA
	const mockData = {
		journals: [
			{
				id: 'test-id',
				title: 'post title',
				content: 'post content',
				category: 'anime',
				commentIds: [1, 2, 3],
				giphyData: {
					src: 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fmedia1.giphy.com%2Fmedia%2FY0PCz5xO3caljsBNYm%2Fgiphy.gif%3Fcid%3D6104955efa0c1649b9713b83b8c77947d96dc94f0795a946%26rid%3Dgiphy.gif%26ct%3Dg%26cid%3D6104955efa0c1649b9713b83b8c77947d96dc94f0795a946%26rid%3Dgiphy.gif%26ct%3Dg',
					alt: 'giphy gif',
				},
				emojis: {
					likes: 1,
					loves: 1,
					dislikes: 1,
				},
			},
		],
	};
	// ******************
	const url = 'http://localhost:5000/journals';
	const data = await getDataFromApi(url);
	console.log(data);
	const journals = [];
	mockData.journals.forEach((journal) => {
		journals.push(createJournalHTML(journal));
	});

	return journals;
}

// accept journalData object and comments array
function createJournalHTML({ id, title, content, giphyData, emojis, commentIds }) {
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

	if (commentIds.length) {
		const commentsDiv = createComments(id);
		journalArticle.append(commentsDiv);
	}

	return journalArticle;
}

function createComments(journalId) {
	// TODO fetch real comment data
	// ******************
	// MOCKDATA
	const mockData = {
		comments: [
			{
				id: 'test-comment',
				journalId: 'test-id',
				comment: 'comment body',
				giphyData: {
					src: 'https://media2.giphy.com/media/d0sWibpAwneSI/giphy-downsized.gif?cid=6104955efb565d489c2ce69f5f87b0b1aba0fd744a5dd1e4&rid=giphy-downsized.gif&ct=g&cid=6104955efb565d489c2ce69f5f87b0b1aba0fd744a5dd1e4&rid=giphy-downsized.gif&ct=g',
					alt: 'giphy gif',
				},
				emojis: {
					likes: 1,
					loves: 1,
					dislikes: 1,
				},
			},
		],
	};
	// ******************
	const commentsDiv = document.createElement('div');
	commentsDiv.classList.add('comments');
	mockData.comments.forEach((comment) => {
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
