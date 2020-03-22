var users = require('./users.json');

const login = (req, res) => {
    if (users[req.body.username] != undefined && req.body.password === users[req.body.username]){
        res.send("Welcome back "+req.body.username+"!")
    }
    else{
        res.send("Invalid username or password.")
    }
}

const newUser = (req, res) =>{
    if (users[req.body.username] === undefined){
        users[req.body.username] = req.body.password;
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