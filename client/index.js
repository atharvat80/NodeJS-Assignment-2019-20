// validate date
document.getElementById('dateInp').min = new Date().toISOString().split("T")[0];

// Search functionality
var searchButton = document.getElementById("search");
searchButton.addEventListener('click', async function(event){
    var keyInp = document.getElementById("searchKey").value;
	try{
		let response = await fetch('http://localhost:8000/search?key='+keyInp);
		if (response.ok == false) throw ('Error 404');
		let body = await response.text();
		searchResults(keyInp, body);
	} catch(e) {
		displayAlert('content', e);
	}
});

function searchResults(key, msg){
    var heading = document.createElement('h3');
    var homeBtn = document.createElement('button');
    var content = document.getElementById('content');
    heading.setAttribute('class', 'my-4 d-inline-block align-middle');
    heading.innerHTML = "Search results for "+'"'+key+'"';
    homeBtn.setAttribute('class', 'btn btn-outline-danger');
    homeBtn.setAttribute('id', 'backBtn');
    homeBtn.setAttribute('style', 'margin-right:20px')
    homeBtn.innerHTML = '‹ Back';
    content.innerHTML = '';
    content.appendChild(homeBtn);
    content.appendChild(heading);
}

var currentUser = null;

function signup(){
    console.log('signup');
    var data = getFormData('login');
    data.from = 'signup';
    sendPostReq(data);
    event.preventDefault();
}

// submit form
function submitForm(formName){
    var data = getFormData(formName);
    var resp = sendPostReq(data);
    event.preventDefault();
}

function sendPostReq(data){
    var req = new XMLHttpRequest();
    var url = 'http://localhost:8000/'
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify(data));
    req.onreadystatechange = function(){
        if (req.readyState == 4 && req.status == 200){
            displayAlert('content', req.responseText);
            return req.responseText
        }
    }
}

// multi purpose functions

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

function displayAlert(target, msg){
    var content = document.getElementById(target);
    var div = document.createElement('div');
    var closeBtn = document.createElement('button');
    var span = document.createElement('span');
    div.setAttribute('class', 'alert alert-primary alert-dismissible fade show');
    div.setAttribute('role', 'alert');
    div.setAttribute('style', 'margin-top: 24px; margin-bottom: 24px; font-weight:bold');
    closeBtn.setAttribute('class', 'close');
    closeBtn.setAttribute('data-dismiss', 'alert');
    closeBtn.setAttribute('aria-label', 'Close');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = "&times;";
    div.innerHTML += msg;
    closeBtn.appendChild(span);
    div.appendChild(closeBtn);
    content.insertBefore(div, content.childNodes[0]);
}