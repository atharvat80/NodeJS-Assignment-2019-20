const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to MongoDB
// require('./database/db')
const auth = require('./authenticate');

// Home page display events
app.get('/', (req, resp)=>{
    resp.sendFile('client/index.html')
})

app.post('/', (req, resp)=>{
    if (req.body.from === 'login'){
        var result = auth.login(req);
        if (result === true){
            resp.send("Welcome back "+req.body.uName+"!")
        }
        else{
            resp.send("Invalid username or password.")
        }
    } else if(req.body.from === 'signup'){
        result = auth.newUser(req);
        if (result === true){
            resp.send("Welcome "+req.body.uName+" your account has been created!")
        }
        else{
            resp.send("That username is already taken :(")
        }   
    }
    else{
        resp.send('Event Created!')
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