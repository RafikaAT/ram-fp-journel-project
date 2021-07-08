(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const journalSubmitButton = document.querySelector('input[type="submit"]');

journalSubmitButton.addEventListener('submit', submitJournalEntry);

function submitJournalEntry(e) {
	e.preventDefault();
	const journalEntryData = {
		category: e.target.category.value,
		title: e.target.title.value,
		content: e.target.content.value,
	};

	const options = {
		method: 'POST',
		body: JSON.stringify(journalEntryData),
		headers: {
			'Content-Type': 'application/json',
		},
	};

	let port = 3000;
	fetch(`http://localhost:${port}/`, options)
		.then((r) => r.json())
		.then(console.log(r))
		.catch(console.warn);
}

const form = document.querySelector('#new-journal-form');
form.addEventListener('submit', (e) => postJournal(e));

// function postJournal(e) {
//     e.preventDefault();
//     const newJournal = document.querySelector('#new-journal').value;
//     const url = 'http://localhost:3000/journals';
//     const reqObj = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         journal: newJournal,
//       })
//     }
//     const newJournal = postDataToApi(url, reqObj);
//   }

},{}]},{},[1]);
