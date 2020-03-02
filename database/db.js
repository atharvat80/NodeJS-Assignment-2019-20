const mongoose = require("mongoose");
const dbURI ="mongodb+srv://atharva:admin@cluster0-61ky5.mongodb.net/test?retryWrites=true&w=majority"
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbURI, options).then(
    () => {console.log("");},
    err => {console.log("Error connecting Database instance due to: ", err);}
);

// require any models
require("./event");