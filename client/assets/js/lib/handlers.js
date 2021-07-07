const { createAllJournals } = require('./helpers');

function renderJournalsToPage() {
	console.log('renderJournals');
	const journals = createAllJournals();
	console.log(journals);
	const main = document.querySelector('main');
	journals.forEach((journal) => {
		main.append(journal);
	});
}

module.exports = { renderJournalsToPage };
