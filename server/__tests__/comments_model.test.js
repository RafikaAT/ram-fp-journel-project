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

  test("deleting all comments means comment array is empty", () => {
    deleteEntryAllData = Comment.deleteAllCommentsInJournal("test-id1");
    const allData = Comment.getAllCommentsInJournal();
    expect(testData.comments.length).toBe(0);
  });

  test("Method all should get all comments", () => {
    const allData = Comment.all();
    expect(allData.length).toBe(testData.comments.length);
  });

  test("findCommentById should return an object which has matching id key value pair, if exists", () => {
    let testDataId = "test-comment-id";
    const foundComment = Comment.findCommentById(testDataId);
    expect(foundComment).toHaveProperty("id", testDataId);
  });

  test("deleteCommentById should return the comments object with one less item", () => {
    Comment.deleteCommentById("test-comment-id1");
    expect(Comment.findCommentById("test-comment-id1")).toBeFalsy();
  });

  test("Update emojis should give different emoji counts", () => {
    const originalSpecificCommentData =
      Comment.findCommentById("test-comment-id2");
    const originalEmojiCount = originalSpecificCommentData.emojis.likes;
    const updatedSpecificCommentData = Comment.updateEmoji(
      "likes",
      true,
      "test-comment-id2"
    );
    const specificEmojiCount = updatedSpecificCommentData.emojis.likes;
    expect(originalEmojiCount).toEqual(specificEmojiCount - 1);
  });
});
