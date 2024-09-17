const { createAllJournals } = require('./helpers');

async function renderJournalsToPage() {
	const journals = await createAllJournals();
	const main = document.querySelector('main');
	journals.forEach((journal) => {
		main.append(journal);
	});
}

module.exports = { renderJournalsToPage };
