const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect to MongoDB
require('./database/db')

// Home page display events
app.get('/', (req, resp)=>{
    resp.sendFile('client/index.html')
})

app.post('/', (req, resp)=>{
    console.log(req.body);
    if (req.body.from === 'login'){
        console.log('call login function')
    }
    else{
        console.log('call create new function')
    }
})

app.get('/search', (req, resp)=>{
    resp.send("Searching for "+req.query.key)
})

// app
//   .route("/events")
//   .get(eventController.listAllEvents)
//   .post(eventController.createNewEvent);

// app
//   .route("/events/:eventid")
//   .get(eventController.readEvent)
//   .put(eventController.updateEvent)
//   .delete(eventController.deleteEvent);

app.listen(8000)