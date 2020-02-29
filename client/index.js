// index.js
var currentUser = null;

// validate date
document.getElementById('dateInp').min = new Date().toISOString().split("T")[0];

// Fetch and display events
async function getEvents(){
    document.getElementById('loading').removeAttribute('style');
    try{
        let res = await fetch('http://localhost:8000/events');
        let json = await res.json();
		if (res.ok == false) throw ('Error 404');
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
        cln.setAttribute('style', 'margin-top: 24px');
        cln.setAttribute('id', events[i]._id);
        console.log(cln);
        cln.childNodes[1].childNodes[1].innerHTML = events[i].name;
        cln.childNodes[1].childNodes[3].innerHTML = events[i].date;
        cln.childNodes[1].childNodes[5].innerHTML = events[i].time;
        cln.childNodes[1].childNodes[7].innerHTML = events[i].location;
        cln.childNodes[1].childNodes[9].innerHTML = 'Created by <strong>'+events[i].createdBy+'</strong>';
        cln.childNodes[1].childNodes[11].innerHTML = events[i].details;
        document.getElementById("home").appendChild(cln);
    }   
}

// Search functionality
function search() {
    var data = getFormData('searchForm');
    sendPostReq('http://localhost:8000/search', data);
    document.getElementById('home').setAttribute('style', 'display:none');
    document.getElementById('searchResults').removeAttribute('style');
    event.preventDefault();
}

function back(){
    document.getElementById('searchResults').setAttribute('style', 'display:none');
    document.getElementById('home').removeAttribute('style')
}

function signup(){
    var data = getFormData('login');
    data.from = 'signup';
    sendPostReq('http://localhost:8000/auth',data);
    $('#loginForm').modal('hide')
    event.preventDefault();
}

// submit form
function submitForm(formName){
    var url = 'http://localhost:8000/auth'
    if (formName === 'createEvent' && currentUser === null){
        displayAlert('Please login or create a new account to create a new event')
    }
    else{
        var data = getFormData(formName);
        if (formName === 'createEvent'){
            data.createdBy = currentUser;
            url = 'http://localhost:8000/newEvent';
            sendPostReq(url, data);
        } else {
            sendPostReq(url, data);
        }   
    }
    $('#loginForm').modal('hide');
    event.preventDefault();
}

function sendPostReq(url, data){
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify(data));
    req.onreadystatechange = function(){
        if (req.readyState == 4 && req.status == 200){
            if (req.responseText.includes('Welcome') === true){
                currentUser = data.uName;
                displayUName();
                displayAlert(req.responseText);
            }
        }
    }
}

// multi purpose functions

function displayUName(){
    var text = document.getElementById('navUName')
    if (currentUser != null){
        document.getElementById('loginButton').setAttribute('style',"display:none");
        text.setAttribute('style', 'color: white')
        text.innerHTML = 'Logged in as '+currentUser
    }
}

function getFormData(formID){
    // get form data
    var form = document.getElementById(formID);
    var elements = form.getElementsByClassName('form-control');
    var data = {}
    data.from = formID;
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
    card.setAttribute("style","font-weight: bold; margin-top: 24px");
}