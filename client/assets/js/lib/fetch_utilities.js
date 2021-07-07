async function getDataFromApi (url) {
    try {
        const fetchedData = await fetch(url)
        const dataFromJSON = await fetchedData.json() 
        return dataFromJSON;
    } catch (err) {
        console.error(err);
        return false;
    }
}


async function deleteDataFromApi (url) {
    try {
        const reqObj = { method: 'DELETE' };
        await fetch (url, reqObj)
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

async function postDataToApi (url, body) {
    try{
        const reqObj = {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
                 journal: newJournal,
             })  
            }
    } catch(err) {
        console.error(err);
        return false;
    }
}









