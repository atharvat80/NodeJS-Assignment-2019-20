/* eslint-disable no-undef */
const app = require('./app');
const request = require('supertest');
var assert = require('assert');

describe('Testing event services', () => {
    // Get events homepage
    test('GET /  Get events homepage', () => {
        return request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200);
    });

    // Get all events
    test('GET /events Get events as a json', () => {
        return request(app)
            .get('/events')
            .set('Accept', 'application/json; charset=utf-8')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    // Create a new event
    test('POST /newEvent Should create a new event', () => {
        const params = {
            name: 'Event',
            date: '2030-01-01',
            time: '12:00',
            location: 'Location',
            details: 'Some details about the event',
            createdBy: 'Username'
        };

        return request(app)
            .post('/newEvent')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then(response =>
                assert(response.body, 'Your event has been created.')
            );
    });

    // Try to create a new event with some attributes missing
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

    // Add a user to an event's guestlist
    test('PUT /event add user to a valid event', () => {
        const params = {
            id: 4,
            currentUser: 'test'
        };

        return request(app)
            .put('/event')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then(response =>
                assert(response.body, 'Your attendance has been recorded.')
            );
    });

    // Try adding a user to the guestlist of an event that doesn't exist
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
                assert(response.body, 'event not found.')
            );
    });

    // Test the above request with no parameters
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
    // Try logging in with correct credentials
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

    // Try logging in with incorrect credentials
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

    // Try creating a new account
    test('POST /newUser attempt a successful signup', () => {
        // If the test fails it is because the username and password already exits in ./database/users.json
        const params = {
            username: 'jest_test',
            password: 'jest_test'
        };

        return request(app)
            .post('/newUser')
            .send(params)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then(response =>
                assert(response.body, 'Welcome jest_test your account has been created!')
            );
    });

    // Try creating an account with a username that is already taken
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
