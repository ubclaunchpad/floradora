import request from 'supertest';

import server from '../Backend';

afterAll(async () => {
    server.close();
});

describe('Test the isalive path', () => {
    test('It should response the GET method', (done) => {
        request(server)
            .get('/isalive')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should be a test', (done) => {
        console.log('hi');
        done();
    });
});
