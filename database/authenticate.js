var users = require('./users.json');

const login = (req, res) => {
    if (users[req.body.uName] != undefined && req.body.pass === users[req.body.uName]){
        res.send("Welcome back "+req.body.uName+"!")
    }
    else{
        res.send("Invalid username or password.")
    }
}

const newUser = (req, res) =>{
    if (users[req.body.uName] === undefined){
        users[req.body.uName] = req.body.pass;
        var json = JSON.stringify(users);
        var fs = require('fs');
        fs.writeFileSync('./database/users.json', json);
        res.send("Welcome "+req.body.uName+" your account has been created!")
    }
    else{
        res.send("That username is already in use.")
    }
}

exports.login = login;
exports.newUser = newUser;