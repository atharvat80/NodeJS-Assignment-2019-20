const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./authenticate');
const eventController = require('./database/eventController');
const app = express();


app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to MongoDB
require('./database/db')

// GET requests
// Send home page
app.get('/', async function (req, resp){
    resp.sendFile('client/index.html');
})
// Send all events
app.get('/events', async function(req, resp){
    eventController.listAllEvents(req, resp);
}) 
app.put('/event', async function(req, resp){
    eventController.updateEvent(req, resp);
})

// POST requests
app.post('/auth', async function(req, resp){
    var result = auth.login(req);
    if (result === true){
        resp.send("Welcome back "+req.body.uName+"!")
    }
    else{
        resp.send("Invalid username or password.")
    } 
})

app.post('/newUser', async function(req, resp){
    result = auth.newUser(req);
    if (result === true){
        resp.send("Welcome "+req.body.uName+" your account has been created!")
    }else{
        resp.send("That username is already taken :(")
    }
})

app.post('/newEvent', async function(req, resp){
    eventController.createNewEvent(req, resp);
});

// listen for requests
app.listen(8000);