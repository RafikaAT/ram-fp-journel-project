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

  // test('creating new journal returns an object');
});
