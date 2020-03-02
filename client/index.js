// index.js
var currentUser = null;
var Events;
// validate date
document.getElementById('dateInp').min = new Date().toISOString().split("T")[0];

// Fetch and display events
async function getEvents(){
    document.getElementById('loading').removeAttribute('style');
    try{
        let res = await fetch('http://localhost:8000/events');
        let json = await res.json();
        if (res.ok == false) throw ('Error 404');
        Events = json;
        displayEvents(json);
	} catch(e) {
		displayAlert(e)
	}
}

getEvents();

function displayEvents(events){
    document.getElementById('loading').setAttribute('style', 'display: none');
    for(i=0; i < events.length; i++){
        var cln = document.getElementById('templateCard').cloneNode(true);
        var attendees = events[i].attending.split(',');
        cln.setAttribute('style', 'margin-top: 24px');
        cln.setAttribute('id', events[i]._id);
        cln.childNodes[1].childNodes[1].innerHTML = events[i].name;
        cln.childNodes[1].childNodes[3].innerHTML = events[i].date;
        cln.childNodes[1].childNodes[5].innerHTML = events[i].time;
        cln.childNodes[1].childNodes[7].innerHTML = events[i].location;
        cln.childNodes[1].childNodes[9].innerHTML = attendees.length + ' going';
        cln.childNodes[1].childNodes[13].innerHTML = 'Created by <strong>'+events[i].createdBy+'</strong>';
        cln.childNodes[1].childNodes[11].innerHTML = events[i].details;
        if (attendees.includes(currentUser) === true){
            disableBtn( cln.childNodes[1].childNodes[15]);
        } else{
            cln.childNodes[1].childNodes[15].setAttribute("value", i);
            cln.childNodes[1].childNodes[15].setAttribute("onclick", "updateAttend(this)");
        }
        document.getElementById("home").appendChild(cln);
    }   
}

// Search functionality
function search() {
    var data = getFormData('searchForm');
    document.getElementById('home').setAttribute('style', 'display:none');
    document.getElementById('searchResults').removeAttribute('style');
    document.getElementById('searchLoading').removeAttribute('style');
    document.getElementById('heading').innerHTML = "Search results for "+'"'+data.key+'"';
    document.getElementById('results').innerHTML = "";
    for (i=0; i < Events.length; i++){
        var current = Events[i][data.criteria].toLowerCase();
        data.key = data.key.toLowerCase();
        if (current.includes(data.key) === true){
            var match = document.getElementById(Events[i]._id).cloneNode(true);
            document.getElementById('results').appendChild(match);
        }
    }
    document.getElementById('searchLoading').setAttribute('style', 'display:none');
    event.preventDefault();
}

function back(){
    document.getElementById('searchResults').setAttribute('style', 'display:none');
    document.getElementById('home').removeAttribute('style')
}

// POST requests
function signup(){
    var data = getFormData('login');
    sendReq("POST", 'http://localhost:8000/newUser',data);
    event.preventDefault();
}

function submitEvent(){
    if (currentUser === null){
        displayAlert('Please login or create a new account to create a new event')
    } else {
        var data = getFormData('createEvent');
        data.createdBy = currentUser;
        sendReq("POST",'http://localhost:8000/newEvent', data);
        var temp = document.getElementById('home').firstElementChild;
        console.log( document.getElementById('home'));
        document.getElementById('home').innerHTML = '';
        document.getElementById('home').appendChild(temp);
        getEvents();
    }
    event.preventDefault();
}

function auth(){
    // authenticate
    var data = getFormData('login');
    sendReq("POST",'http://localhost:8000/auth', data);
    event.preventDefault();  
}

// update attendance
function updateAttend(element){
    if (currentUser === null){
        displayAlert("Please sign in or create a new account to confirm your attendance.")
    } else{
        Events[element.value].currentUser = currentUser;
        sendReq("PUT", 'http://localhost:8000/event', Events[element.value]);
        var count = element.parentElement.childNodes[9];
        count.innerHTML = parseInt(count.innerHTML[0])+1+' going';
        disableBtn(element);
    }
}

function disableAttending(){
    for (i=0; i < Events.length; i++){
        var userList = Events[i].attending.split(',');
        if (userList.includes(currentUser) === true){
            var eventCard = document.getElementById(Events[i]._id).childNodes[1].childNodes[15];
            disableBtn(eventCard);
        }
    }
}

function disableBtn(btn){
    btn.setAttribute('class', 'btn btn-success btn-sm float-right');
    btn.innerHTML = "Attending";
    btn.disabled = true;
}

function sendReq(type ,url, data){
    var req = new XMLHttpRequest();
    req.open(type, url, true);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify(data));
    req.onreadystatechange = function(){
        if (req.readyState == 4 && req.status == 200){
            if (req.responseText.includes('Welcome') === true){
                currentUser = data.uName;
                displayUName();
            }
            displayAlert(req.responseText);
        }
    }
}

// multi purpose functions
function displayUName(){
    var text = document.getElementById('navUName')
    if (currentUser != null){
        document.getElementById('loginBtn').setAttribute('style',"display:none");
        text.setAttribute('style', 'color: white')
        text.innerHTML = 'Logged in as '+currentUser
    }
    disableAttending();
}

function getFormData(formID){
    // get form data
    var form = document.getElementById(formID);
    var elements = form.getElementsByClassName('form-control');
    var data = {};
    for (i=0; i < elements.length; i++){
        data[elements[i].name] = elements[i].value;
    }
    form.reset();
    return data
}

function closeAlert(){
    var card = document.getElementById('showMsg');
    var close = document.getElementById('closeAlert');
    card.innerHTML = '';
    card.appendChild(close);
    card.removeAttribute("style")
    card.setAttribute("style","display:none");
}

function displayAlert(msg){
    var card = document.getElementById('showMsg');
    var close = document.getElementById('closeAlert');
    card.innerHTML = msg;
    card.appendChild(close);
    card.removeAttribute("style")
}