const request = require('supertest');
const { readDataFromFile, writeDataToFile } = require('../models/data');
const server = require('../app');

describe('API', () => {
  let api;
  let testData;
  let initialTestData;
  let testInfo = {
    id: 'test-comment-id8',
    journalId: 'test-id1',
    comment: 'comment body',
    giphyData: {
      src:
        'https://media2.giphy.com/media/d0sWibpAwneSI/giphy-downsized.gif?cid=6104955efb565d489c2ce69f5f87b0b1aba0fd744a5dd1e4&rid=giphy-downsized.gif&ct=g&cid=6104955efb565d489c2ce69f5f87b0b1aba0fd744a5dd1e4&rid=giphy-downsized.gif&ct=g',
      alt: 'alt',
    },
    emojis: { likes: 1, loves: 1, dislikes: 1 },
  };

  beforeEach(() => {
    testData = readDataFromFile();
    initialTestData = readDataFromFile();
  });

  afterEach(() => {
    writeDataToFile(initialTestData);
  });

  beforeAll(() => {
    api = server.listen(4000, () => console.log('Test server is running on port 4000.'));
  });

  afterAll((done) => {
    console.log('Stopping test server');
    api.close(done);
  });

  it('responds to GET / with status 200', (done) => {
    request(api).get('/').expect(200, done);
  });

  describe('journals router', () => {
    it('responds to GET /journals with status 200', (done) => {
      request(api).get('/journals').expect(200, done);
    });

    it('responds to POST /journals with status 201', (done) => {
      request(api).post('/journals').expect(201, done);
    });

    it('responds to PUT /journals/:journalId with status 200', (done) => {
      request(api).put('/journals/5').expect(200, done);
    });

    it('responds to DELETE /journals/:journalId with status 204 if the resource was deleted', (done) => {
      request(api).delete('/journals/5').expect(204, done);
    });

    it('responds to PUT /journals/:journalId/:emoji with status 200', (done) => {
      request(api).get('/journals/5/like').expect(200, done);
    });
  });

  describe('comments router', () => {
    it('responds to GET /journals/:journalId/comments with status 200', (done) => {
      request(api).get('/journals/test-id1/comments').expect(200, done);
    });

    // if we change status in here to 201, we need to change it in routes
    it('responds to POST /journals/:journalId/comments with status 201', (done) => {
      // basically need to store the response in a variable, then spit that variable out
      request(api)
        .post('/journals/test-id8/comments')
        .send(testInfo)
        .set('Accept', /application\/json/)
        .expect(200)
        .expect(response.body)
        .toContain('comment');
      // request(api).post('/journals/2/comments').expect(200, done);
    });

    it('responds to PUT /journals/:journalId/comments/:commentId with status 200', (done) => {
      request(api).put('/journals/2/comments/1').expect(200, done);
    });

    it('responds to DELETE /journals/:journalId/comments/:commentId with status 204 if the resource was deleted', async () => {
      await request(api).delete('/journals/test-id2/comments/test-comment-id1').expect(204);
      const updatedData = await request(api).get('/journals/test-id2/comments');
      expect(updatedData.body.comments.length).toBe(2);
    });
  });
});
