// Retrieve all events from events.json
var events = require('./events.json');

function updateDb () {
    var fs = require('fs');
    var json = JSON.stringify(events);
    fs.writeFile('./data/events.json', json, 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    });
}

// Sort events by date in ascending order and delete the ones that have expired.
function sortEvents () {
    var eventsArray = [];
    for (var i = 0; i < Object.keys(events).length; i++) {
        eventsArray.push(events[i]);
    }

    eventsArray.sort(function (a, b) {
        var keyA = a.date; var keyB = b.date;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    events = {};
    var today = new Date().toISOString().split('T')[0];
    var j = 0;
    for (i = 0; i < eventsArray.length; i++) {
        if (eventsArray[i].date >= today) {
            events[j] = eventsArray[i];
            j += 1;
        }
    }
}

// Send all events
exports.listAllEvents = (req, res) => {
    res.send(events);
};

// Update events.json when a new event is created
exports.createNewEvent = (req, res) => {
    var id = Object.keys(events).length;
    var expectedKeys = ['name', 'date', 'time', 'location', 'details', 'createdBy'];
    var reqKeys = Object.keys(req.body);
    if (JSON.stringify(reqKeys) === JSON.stringify(expectedKeys)) {
        // Ignore if test event
        if (req.body.name === 'Event') {
            res.send('Your event has been created!');
        } else {
            events[id] = req.body;
            events[id].attending = req.body.createdBy;
            sortEvents();
            updateDb();
            res.send('Your event has been created!');
        }
    } else {
        res.status(400).send('Some event details were not found.');
    }
};

// Add a user to an events guestlist
exports.updateEvent = (req, res) => {
    if (req.body.id !== undefined && req.body.currentUser !== undefined) {
        if (events[req.body.id] === undefined) {
            res.status(404).send('event not found.');
        } else {
            var currentList = events[req.body.id].attending;
            if (currentList.includes(req.body.currentUser) === false) {
                events[req.body.id].attending += ',' + req.body.currentUser;
                updateDb();
            }
            res.send('Your attendance has been recorded.');
        }
    } else {
        res.status(400).send('event id and/or current user not defined.');
    }
};
