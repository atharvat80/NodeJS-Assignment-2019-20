/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// index.js
var currentUser = null;
var Events;
var Count;

// User related functions ----------------------------------------------------------------------------------
// login functionality
function auth () {
    var data = getFormData('login');
    sendReq('POST', 'http://localhost:8000/auth', data);
    $('#loginForm').modal('toggle');
    event.preventDefault();
}

// Create new account
function signup () {
    var data = getFormData('login');
    sendReq('POST', 'http://localhost:8000/newUser', data);
    $('#loginForm').modal('toggle');
    event.preventDefault();
}

// Add current user to an event's guest list
function updateAttendance (element) {
    if (currentUser === null) {
        displayAlert('Please sign in or create a new account to confirm your attendance.');
    } else {
        var data = { id: element.value, currentUser: currentUser };
        sendReq('PUT', 'http://localhost:8000/event', data);
        disableBtn(element);
        getEvents();
    }
}

// Update navbar with account controls
function displayUName () {
    var logoutBtn = document.getElementById('logoutBtn');
    if (currentUser != null) {
        document.getElementById('loginBtn').setAttribute('style', 'display:none');
        document.getElementById('myEvents').removeAttribute('style');
        logoutBtn.removeAttribute('style');
        logoutBtn.setAttribute('onclick', 'logout()');
    }
    disableAttending();
}

function logout () {
    document.getElementById('myEvents').setAttribute('style', 'display:none');
    document.getElementById('logoutBtn').setAttribute('style', 'display:none');
    document.getElementById('loginBtn').removeAttribute('style');
    currentUser = null;
    back();
    getEvents();
}

// Events related functions ----------------------------------------------------------------------------------

// Fetch events
async function getEvents () {
    document.getElementById('loading').removeAttribute('style');
    try {
        const res = await fetch('http://localhost:8000/events');
        const json = await res.json();
        // eslint-disable-next-line no-throw-literal
        if (res.ok === false) throw ('Error 404');
        Events = json;
        Count = Object.keys(Events).length;
        displayEvents(Events);
    } catch (e) {
    document.getElementById('loading').setAttribute('style', 'display: none');
    displayAlert(e);
    }
}

getEvents();

// Display fetched events
function displayEvents (events) {
    var temp = document.getElementById('home').firstElementChild;
    document.getElementById('home').innerHTML = '';
    document.getElementById('home').appendChild(temp);
    document.getElementById('loading').setAttribute('style', 'display: none');

    for (var i = 0; i < Count; i++) {
        // clone the template card
        var cln = document.getElementById('templateCard').cloneNode(true);
        var details = cln.childNodes[1].childNodes[5];
        cln.removeAttribute('style');
        cln.setAttribute('id', i);

        // add the event details to the cloned card
        cln.childNodes[1].childNodes[1].innerHTML += events[i].name;
        details.childNodes[3].innerHTML = events[i].date + ' at ' + events[i].time;
        details.childNodes[7].innerHTML = events[i].location;
        details.childNodes[15].innerHTML = events[i].createdBy;
        if (events[i].details !== '') {
            details.childNodes[11].innerHTML = events[i].details.replace('\n', '<br>');
        }

        // disable the signup button if the user is already attending
        if (events[i].attending.split(',').includes(currentUser) === true) {
            disableBtn(cln.childNodes[1].childNodes[7]);
        } else {
            cln.childNodes[1].childNodes[7].setAttribute('value', i);
            cln.childNodes[1].childNodes[7].setAttribute('onclick', 'updateAttendance(this)');
        }
        cln.childNodes[1].childNodes[9].setAttribute('value', i);

        // Add the card to the home div
        document.getElementById('home').appendChild(cln);
    }
}

// Create a new event
function submitEvent () {
    if (currentUser === null) {
        displayAlert('Please login or create a new account to create a new event');
    } else {
        var data = getFormData('createEvent');
        data.createdBy = currentUser;
        sendReq('POST', 'http://localhost:8000/newEvent', data);
        back();
        getEvents();
    }
    event.preventDefault();
}

// website related functions ----------------------------------------------------------------------------------

// validate date while creating
document.getElementById('dateInp').min = new Date().toISOString().split('T')[0];

// Back button functionality to go to home screen
function back () {
    document.getElementById('searchResults').setAttribute('style', 'display:none');
    document.getElementById('noResult').setAttribute('style', 'display:none');
    document.getElementById('home').removeAttribute('style');
}

// Search functionality
function search (type) {
    if (type === undefined) {
        var data = getFormData('searchForm');
        document.getElementById('heading').innerHTML = 'Search results for ' + '"' + data.key + '"';
    } else {
        // eslint-disable-next-line no-redeclare
        var data = {
            criteria: 'createdBy',
            key: currentUser
        };
        document.getElementById('heading').innerHTML = 'Your events';
    }
    document.getElementById('home').setAttribute('style', 'display:none');
    document.getElementById('noResult').setAttribute('style', 'display:none');
    document.getElementById('searchResults').removeAttribute('style');
    document.getElementById('searchLoading').removeAttribute('style');
    document.getElementById('results').innerHTML = '';

    var results = 0;
    for (var i = 0; i < Count; i++) {
        var current = Events[i][data.criteria].toLowerCase();
        data.key = data.key.toLowerCase();
        if (current.includes(data.key) === true) {
            results += 1;
            var match = document.getElementById(i).cloneNode(true);
            document.getElementById('results').appendChild(match);
        }
    }
    document.getElementById('searchLoading').setAttribute('style', 'display:none');
    if (results === 0) {
        document.getElementById('noResult').removeAttribute('style');
    }
    event.preventDefault();
}

// Disable the attending button if the user is already attending
function disableAttending () {
    for (var i = 0; i < Count; i++) {
        var userList = Events[i].attending.split(',');
        if (userList.includes(currentUser) === true) {
            var eventCard = document.getElementById(i).childNodes[1].childNodes[7];
            disableBtn(eventCard);
        }
    }
}

// Disable specified button
function disableBtn (btn) {
    btn.setAttribute('class', 'btn btn-success btn-sm');
    btn.innerHTML = '<span>&#10003;</span> Attending';
    btn.disabled = true;
}

// Extract from data as JSON
function getFormData (formID) {
    // get form data
    var form = document.getElementById(formID);
    var elements = form.getElementsByClassName('form-control');
    var data = {};
    for (var i = 0; i < elements.length; i++) {
        data[elements[i].name] = elements[i].value;
    }
    form.reset();
    return data;
}

// Hide the alert after it has been closed
function closeAlert () {
    var card = document.getElementById('showMsg');
    var close = document.getElementById('closeAlert');
    card.innerHTML = '';
    card.appendChild(close);
    card.removeAttribute('style');
    card.setAttribute('style', 'display:none');
}

// Display alert
function displayAlert (msg) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    var card = document.getElementById('showMsg');
    var close = document.getElementById('closeAlert');
    card.innerHTML = msg;
    card.appendChild(close);
    card.removeAttribute('style');
}

// Show the users attending an event
function showAttendees (ele) {
    $('#attendees').modal('toggle');
    var modal = document.getElementById('attendeesBody');
    var list = Events[ele.value].attending.split(',');
    modal.innerHTML = '';
    for (var i = 0; i < list.length; i++) {
        modal.innerHTML += (i + 1) + ')  ' + list[i] + '<br>';
    }
}

// server related functions ----------------------------------------------------------------------------------
// Send requests to the server
function sendReq (type, url, data) {
    var req = new XMLHttpRequest();
    req.open(type, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            if (req.responseText.includes('Welcome') === true) {
                currentUser = data.username;
                displayUName();
            }
        } else if (req.readyState === 4 && req.status === 0) {
           displayAlert("We couldn't process your request due to trouble reaching our server");
        } else {
            displayAlert(req.responseText);
        }
    };
}
