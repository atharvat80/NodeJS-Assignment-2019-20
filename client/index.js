// index.js
var currentUser = null;

// validate date
document.getElementById('dateInp').min = new Date().toISOString().split("T")[0];

// Search functionality
function search() {
    var data = getFormData('searchForm');
    sendPostReq('http://localhost:8000/search', data);
    searchResults(postResp);
    event.preventDefault();
}

function searchResults(msg){
    var heading = document.createElement('h3');
    var backBtn = document.createElement('button');
    var content = document.getElementById('content');
    heading.setAttribute('class', 'my-4 d-inline-block align-middle');
    heading.innerHTML = "Search results";
    backBtn.setAttribute('class', 'btn btn-outline-danger');
    backBtn.setAttribute('id', 'backBtn');
    backBtn.setAttribute('style', 'margin-right:20px')
    backBtn.setAttribute('onclick', 'back()')
    backBtn.innerHTML = '‹ Back';
    content.innerHTML = '';
    content.appendChild(backBtn);
    content.appendChild(heading);
}

function back(){
    var content = document.getElementById('content');
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
        }
        sendPostReq(url, data);
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
            callback(req.responseText);
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