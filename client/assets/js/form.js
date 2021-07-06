const journalSubmitButton = document.querySelector('input[type="submit"]')

journalSubmitButton.addEventListener('submit', submitJournalEntry)


function submitJournalEntry(e) {
    e.preventDefault();
    const journalEntryData = {

        category: e.target.category.value,
        title: e.target.title.value,
        content: e.target.content.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(journalEntryData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    let port = 3000
    fetch(`http://localhost:${port}/`, options)
    .then(r => r.json())
    .then(console.log(r))
    .catch(console.warn)
}
