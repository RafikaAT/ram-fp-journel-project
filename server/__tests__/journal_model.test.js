const { readDataFromFile, writeDataToFile } = require('../models/data');
const Journal = require('../models/journal');

describe('journals model', () => {
  let testData;
  let initialTestData;

  beforeEach(() => {
    testData = readDataFromFile();
    initialTestData = readDataFromFile();
  });

  afterEach(() => {
    writeDataToFile(initialTestData);
  });

  test('getAllData should get all journals', () => {
    const allData = Journal.getAllData();
    const { journals } = allData;
    expect(journals.length).toBe(testData.journals.length);
  });

  test('creating new journal increases object array by 1', () => {
    newEntryAllData = Journal.createNewJournalEntry();
    const allData = Journal.getAllData();
    expect(allData.journals.length).toBe(testData.journals.length + 1);
  });

  test('createNewId creates a non-empty string', () => {
    newId = Journal.createNewId();
    expect(typeof newId).toEqual('string');
    expect(newId).toBeTruthy();
  });

  test('Method all should get all journals', () => {
    const allData = Journal.all();
    expect(allData.length).toBe(testData.journals.length);
  });

  test('findJournalById should return an object which has matching id key value pair, if exists', () => {
    let testDataId = 'test-id1';
    const foundJournal = Journal.findJournalById(testDataId);
    expect(foundJournal).toHaveProperty('id', testDataId);
  });

  test('deleteJournalById should return the journals object with one less item', () => {
    Journal.deleteJournalById('test-id2');
    expect(Journal.findJournalById('test-id2')).toBeFalsy();
  });

  test('Update emojis should give different emoji counts', () => {
    const originalSpecificJournalData = Journal.findJournalById('test-id3');
    const originalEmojiCount = originalSpecificJournalData.emojis.likes;
    const updatedSpecificJournalData = Journal.updateEmoji('likes', true, 'test-id3');
    const specificEmojiCount = updatedSpecificJournalData.emojis.likes;
    expect(originalEmojiCount).toEqual(specificEmojiCount - 1);
  });

  test('All categories should return 3', () => {
    const allCategories = Journal.getAllCategories();
    console.log(allCategories);
    const categoriesCounter = allCategories.length;
    expect(categoriesCounter).toBe(3);
  });

  test('getJournalsByCategory should return all journals with a certain category', () => {
    const animeJournals = Journal.getJournalsByCategory('anime');
    // could have done length but, would be better if we wanted to put real data through
    expect(animeJournals).not.toHaveProperty('category', 'food');
    expect(animeJournals).not.toHaveProperty('category', 'movies');
    expect(animeJournals).toBeTruthy();
  });
});
