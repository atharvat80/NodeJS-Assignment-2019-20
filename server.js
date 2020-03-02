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
app.get('/', (req, resp)=>{resp.sendFile('client/index.html')}) // Send home page
app.get('/events', eventController.listAllEvents) // Send all events
app.put('/event', eventController.updateEvent)

// POST requests
app.post('/auth', (req, resp)=>{
    var result = auth.login(req);
    if (result === true){
        resp.send("Welcome back "+req.body.uName+"!")
    }
    else{
        resp.send("Invalid username or password.")
    } 
})

app.post('/newUser', (req, resp)=>{
    result = auth.newUser(req);
    if (result === true){
        resp.send("Welcome "+req.body.uName+" your account has been created!")
    }else{
        resp.send("That username is already taken :(")
    }
})

app.post('/newEvent', eventController.createNewEvent);
app.post('/search', eventController.findEvent);

// listen for requests
app.listen(8000);