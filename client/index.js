// index.js
var currentUser = null;
var Events;
var Count;

// User related functions ----------------------------------------------------------------------------------
function auth(){
    // authenticate
    var data = getFormData('login');
    sendReq("POST",'http://localhost:8000/auth', data);
    $('#loginForm').modal('toggle');
    event.preventDefault();  
}

// 
function signup(){
    var data = getFormData('login');
    sendReq("POST", 'http://localhost:8000/newUser',data);
    $('#loginForm').modal('toggle');
    event.preventDefault();
}

// update attendance
function updateAttend(element){
    if (currentUser === null){
        displayAlert("Please sign in or create a new account to confirm your attendance.")
    } else{
        data = {id: element.value, currentUser: currentUser};
        sendReq("PUT", 'http://localhost:8000/event', data);
        var count = element.parentElement.childNodes[3].childNodes[7];
        count.innerHTML = parseInt(count.innerHTML[0])+1;
        disableBtn(element);
        getEvents();
    }
}

function displayUName(){
    var text = document.getElementById('navUName');
    var logoutBtn = document.getElementById('logoutBtn');
    if (currentUser != null){
        document.getElementById('loginBtn').setAttribute('style', 'display:none');
        document.getElementById('myEvents').removeAttribute('style');
        logoutBtn.removeAttribute('style');
        logoutBtn.setAttribute('onclick', 'logout()');
        text.removeAttribute('style');
        text.innerHTML = 'Logged in as '+currentUser
    }
    disableAttending();
}

function logout(){
    document.getElementById('navUName').innerHTML = '';
    document.getElementById('myEvents').setAttribute('style', 'display:none');
    document.getElementById('logoutBtn').setAttribute('style', 'display:none');
    document.getElementById('loginBtn').removeAttribute('style');
    currentUser = null;
    getEvents();
}

// Events related functions ----------------------------------------------------------------------------------

// Fetch and display events
async function getEvents(){
    document.getElementById('loading').removeAttribute('style');
    try{
        let res = await fetch('http://localhost:8000/events');
        let json = await res.json();
        if (res.ok == false) throw ('Error 404');
        Events = json;
        Count = Object.keys(Events).length;
        displayEvents(Events);
	} catch(e) {
        document.getElementById('loading').setAttribute('style', 'display: none');
		displayAlert(e);
	}
}

getEvents();

function displayEvents(events){
    var temp = document.getElementById('home').firstElementChild;
    document.getElementById('home').innerHTML = '';
    document.getElementById('home').appendChild(temp);
    document.getElementById('loading').setAttribute('style', 'display: none');
    
    for(i=0; i < Count; i++){
        // clone the template card
        var cln = document.getElementById('templateCard').cloneNode(true);
        var details = cln.childNodes[1].childNodes[3];
        cln.setAttribute('style', 'margin-top: 24px');
        cln.setAttribute('id', i);

        // add the event details to the cloned card
        cln.childNodes[1].childNodes[1].innerHTML = events[i].name;
        details.childNodes[3].innerHTML = events[i].date;
        details.childNodes[7].innerHTML = events[i].time;
        details.childNodes[11].innerHTML = events[i].location;
        details.childNodes[19].innerHTML = events[i].attending.split(',').length;
        details.childNodes[23].innerHTML = events[i].createdBy;
        if (events[i].details != ''){
            details.childNodes[15].innerHTML = events[i].details;
        }
        
        // disable the signup button if the user is already attending
        if (events[i].attending.split(',').includes(currentUser) === true){
            disableBtn( cln.childNodes[1].childNodes[5]);
        } else{
            cln.childNodes[1].childNodes[5].setAttribute("value", i);
            cln.childNodes[1].childNodes[5].setAttribute("onclick", "updateAttend(this)");
        }
        cln.childNodes[1].childNodes[7].setAttribute("value", i);
        document.getElementById("home").appendChild(cln);
    }   
}

function submitEvent(){
    if (currentUser === null){
        displayAlert('Please login or create a new account to create a new event')
    } else {
        var data = getFormData('createEvent');
        data.createdBy = currentUser;
        sendReq("POST",'http://localhost:8000/newEvent', data);
        back()
        getEvents();
    }
    event.preventDefault();
}

// website related functions ----------------------------------------------------------------------------------

// validate date while creating 
document.getElementById('dateInp').min = new Date().toISOString().split("T")[0];

function back(){
    document.getElementById('searchResults').setAttribute('style', 'display:none');
    document.getElementById('noResult').setAttribute('style', 'display:none');
    document.getElementById('home').removeAttribute('style')
}

// Search functionality
function search(type) {
    if (type === undefined){
        var data = getFormData('searchForm');
        document.getElementById('heading').innerHTML = "Search results for "+'"'+data.key+'"';
    }
    else{
        var data = {
            criteria: 'createdBy',
            key: currentUser
        }
        document.getElementById('heading').innerHTML = "Your events";
    }
    document.getElementById('home').setAttribute('style', 'display:none');
    document.getElementById('searchResults').removeAttribute('style');
    document.getElementById('searchLoading').removeAttribute('style');
    document.getElementById('results').innerHTML = "";
    
    var results = 0;
    for (i=0; i < Count; i++){
        var current = Events[i][data.criteria].toLowerCase();
        data.key = data.key.toLowerCase();
        if (current.includes(data.key) === true){
            results += 1;
            var match = document.getElementById(i).cloneNode(true);
            document.getElementById('results').appendChild(match);
        }
    }
    document.getElementById('searchLoading').setAttribute('style', 'display:none');
    if (results === 0){
        document.getElementById('noResult').removeAttribute('style');
    }
    event.preventDefault();
}

function disableAttending(){
    for (i=0; i < Count; i++){
        var userList = Events[i].attending.split(',');
        if (userList.includes(currentUser) === true){
            var eventCard = document.getElementById(i).childNodes[1].childNodes[5];
            disableBtn(eventCard);
        }
    }
}

function disableBtn(btn){
    btn.setAttribute('class', 'btn btn-success btn-sm');
    btn.innerHTML = "Attending";
    btn.disabled = true;
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

function showAttendees(ele){
    $('#attendees').modal('toggle');
    var modal = document.getElementById("attendeesBody");
    var list = Events[ele.value].attending.split(',');
    modal.innerHTML = '';
    for (i=0; i < list.length; i++){
        modal.innerHTML += (i+1)+")  "+list[i]+"<br>"
    }
}

// server related functions ----------------------------------------------------------------------------------
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
        } else if (req.readyState == 4 && req.status == 0){
           displayAlert("We couldn't process your request due to trouble reaching our server") 
        }
        else{
            displayAlert(req.responseText);
        }
    }
}