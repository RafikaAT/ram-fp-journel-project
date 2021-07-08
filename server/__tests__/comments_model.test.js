const { readDataFromFile, writeDataToFile } = require("../models/data");
const Comment = require("../models/comment");

describe("comments model", () => {
  let testData;
  let initialTestData;

  beforeEach(() => {
    testData = readDataFromFile();
    initialTestData = readDataFromFile();
  });

  afterEach(() => {
    writeDataToFile(initialTestData);
  });

  test("getAllData should get all comments", () => {
    const allData = Comment.getAllData();
    const { comments } = allData;
    expect(comments.length).toBe(testData.comments.length);
  });

  test("creating new comment increase comment array by 1", () => {
    newEntryAllData = Comment.createNewComment();
    const allData = Comment.getAllData();
    expect(allData.comments.length).toBe(testData.comments.length + 1);
  });
});
