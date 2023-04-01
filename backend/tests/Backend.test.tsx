import request from 'supertest';

import server from '../Backend';

afterAll(async () => {
    server.close();
});

describe('Test the /v0/users path', () => {
    test('It should response the GET method', (done) => {
        request(server)
            .get('/v0/users')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should response the POST method', (done) => {
        request(server)
            .post('/v0/users')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should response the PUT method', (done) => {
        request(server)
            .put('/v0/users')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should response the DELETE method', (done) => {
        request(server)
            .delete('/v0/users')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('Test the /v0/collected_plants path', () => {
    test('It should response the GET method', (done) => {
        request(server)
            .get('/v0/collected_plants')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should response the POST method', (done) => {
        request(server)
            .post('/v0/collected_plants')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should response the PUT method', (done) => {
        request(server)
            .put('/v0/collected_plants')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    test('It should response the DELETE method', (done) => {
        request(server)
            .delete('/v0/collected_plants')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
