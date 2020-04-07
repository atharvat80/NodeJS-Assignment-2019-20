const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./database/authenticate');
const eventController = require('./database/eventController');
const app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET requests---------------------------------------------------------
// Send home page
 app.get('/', function (req, res) {
    res.sendFile('client/index.html');
});

// Send all events
app.get('/events', function (req, res) {
    eventController.listAllEvents(req, res);
});

// PUT requests ---------------------------------------------------------
// updating an event
app.put('/event', function (req, res) {
    eventController.updateEvent(req, res);
});

// POST requests---------------------------------------------------------
// Authenticate user
app.post('/auth', function (req, res) {
    auth.login(req, res);
});

// Create new user
/**
 * @api {post} /newUser Create a new user
 * @apiName User signup
 * @apiGroup Users
 */
app.post('/newUser', function (req, res) {
    auth.newUser(req, res);
});

// Create new event
app.post('/newEvent', function (req, res) {
    eventController.createNewEvent(req, res);
});

app.use(function (req, res) {
    res.status(404).send('Sorry this is not a valid route.');
});

module.exports = app;
