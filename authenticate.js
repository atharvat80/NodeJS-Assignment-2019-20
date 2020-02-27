var users = require('./users.json');

const login = (req) => {
    if (users[req.body.uName] != undefined && req.body.pass === users[req.body.uName]){
        return true
    }
    else{
        return false
    }
}

const newUser = (req) =>{
    if (users[req.body.uName] === undefined){
        users[req.body.uName] = req.body.pass;
        var json = JSON.stringify(users);
        var fs = require('fs');
        fs.writeFileSync('users.json', json);
        return true
    }
    else{
        return false
    }
}

exports.login = login;
exports.newUser = newUser;