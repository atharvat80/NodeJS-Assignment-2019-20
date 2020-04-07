/* eslint-disable no-undef */
const app = require('./app');
const request = require('supertest');
var assert = require('assert');

describe('Testing event services', () => {
    test('GET /  Get events homepage', () => {
        return request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200);
    });

    test('GET /events Get events as a json', () => {
        return request(app)
            .get('/events')
            .set('Accept', 'application/json; charset=utf-8')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    // test('POST /newEvent Should create a new event', () => {
    //     const params = {
    //         name: 'Event',
    //         date: '2030-01-01',
    //         time: '12:00',
    //         location: 'Location',
    //         details: 'Some details about the event',
    //         createdBy: 'Username'
    //     };

    //     return request(app)
    //         .post('/newEvent')
    //         .send(params)
    //         .expect('Content-Type', 'text/html; charset=utf-8')
    //         .expect(200)
    //         .then(response =>
    //             assert(response.body, 'Your event has been created.')
    //         );
    // });

    test('POST /newEvent Should not create a new event', () => {
        // Some attributes of the event have been left out so it shouldn't create a new event
        const params = {
            name: 'Event',
            location: 'Location',
            details: 'Some details about the event',
            createdBy: 'Username'
        };

        return request(app)
            .post('/newEvent')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400)
            .then(response =>
                assert(response.body, 'Some event details were not found.')
            );
    });

    // test('PUT /event add user to a valid event', () => {
    //     const params = {
    //         id: 4,
    //         currentUser: 'test'
    //     };

    //     return request(app)
    //         .put('/event')
    //         .send(params)
    //         .expect('Content-Type', 'text/html; charset=utf-8')
    //         .expect(200)
    //         .then(response =>
    //             assert(response.body, 'Your attendance has been recorded.')
    //         );
    // });

    test('PUT /event Add user to an event that does not exist', () => {
        const params = {
            id: 100000,
            currentUser: 'test'
        };

        return request(app)
            .put('/event')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404)
            .then(response =>
                assert(response.body, 'event id and/or current user not defined.')
            );
    });

    test('PUT /event Send a bad request (request has no body)', () => {
        const params = {};

        return request(app)
            .put('/event')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400)
            .then(response =>
                assert(response.body, 'event id and/or current user not defined.')
            );
    });
});

describe('Testing user services', () => {
    test('POST /auth attempt a successful login', () => {
        const params = {
            username: 'test',
            password: 'test'
        };

        return request(app)
            .post('/auth')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then(response =>
                assert(response.body, 'Welcome back test!')
            );
    });

    test('POST /auth attempt a unsuccessful login', () => {
        const params = {
            username: 'test',
            password: 'not_the_password'
        };

        return request(app)
            .post('/auth')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(401)
            .then(response =>
                assert(response.body, 'Invalid username or password.')
            );
    });

    // test('POST /newUser attempt a successful signup', () => {
    //     // If the test fails it is because the username and password already exits in ./database/users.json
    //     const params = {
    //         username: 'test5',
    //         password: 'test5'
    //     };

    //     return request(app)
    //         .post('/newUser')
    //         .send(params)
    //         .expect('Content-Type', 'text/html; charset=utf-8')
    //         .expect(200)
    //         .then(response =>
    //             assert(response.body, 'Welcome test5 your account has been created!')
    //         );
    // });

    test('POST /newUser attempt a unsuccessful signup', () => {
        const params = {
            username: 'test',
            password: 'test'
        };

        return request(app)
            .post('/newUser')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(401)
            .then(response =>
                assert(response.body, 'That username is already in use.')
            );
    });
});
