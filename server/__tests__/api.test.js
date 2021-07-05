const request = require('supertest');
const server = require('../app');

describe('API', () => {
	let api;

	beforeAll(() => {
		api = server.listen(4000, () => console.log('Test server is running on port 4000.'));
	});

	afterAll((done) => {
		console.log('Stopping test server');
		api.close(done);
	});

	it('responds to get / with status 200', (done) => {
		request(api).get('/').expect(200, done);
	});
});
