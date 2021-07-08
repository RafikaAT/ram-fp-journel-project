const request = require('supertest');
const { readDataFromFile, writeDataToFile } = require('../models/data');
const server = require('../app');

describe('API', () => {
  let api;
  let testData;
  let initialTestData;

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
});
