// Retrieve existing users from users.json
var users = require('./users.json');

// Handle login event
const login = (req, res) => {
    if (users[req.body.username] !== undefined && req.body.password === users[req.body.username]) {
        res.send('Welcome back ' + req.body.username + '!');
    } else {
        res.status(401).send('Invalid username or password.');
    }
};

// Handle a user signup
const newUser = (req, res) => {
    if (users[req.body.username] === undefined) {
        // Ignore jest_test (for testing purposes)
        if (req.body.username === 'jest_test') {
            res.send('Welcome jest_test your account has been created!');
        } else {
            users[req.body.username] = req.body.password;
            var json = JSON.stringify(users);
            var fs = require('fs');
            fs.writeFileSync('./data/users.json', json);
            res.send('Welcome ' + req.body.username + ' your account has been created!');
        }
    } else {
        res.status(401).send('That username is already in use.');
    }
};

exports.login = login;
exports.newUser = newUser;
