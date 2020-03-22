# Stephenson College Events API Documentation

## Table of contents
- [Introduction](##Introduction)

- [GET Requests](##GET-Requests)
	+ [Getting events](###Getting-events)

- [POST Requests](##POST-Requests)
	+ [Authenticate a user login](###Authenticate-a-user-login)
	+ [Create a new user](###Create-a-new-user)
	+ [Create a new event](###Create-a-new-event)

- [PUT Requests](##PUT-Requests)
	+ [Update guestlist for an event](###Update-guestlist-for-an-event)

## Introduction
This API is organised around REST. It accepts GET, PUT and form-encoded requests and returns JSON encoded responses for most type of requests.   

## GET Requests

### Getting events
A list of events can be obtained by sending a GET request to `/events` route. For example, this template function demonstrates how to fetch events 
```Javascript
function getEvents(){
    try{
        let res = await fetch('http://localhost:8000/events');
        let json = await res.json(); //sever response
        if (res.ok == false) throw ('Error 404');   
	} catch(e) {
        console.log(e);
        // handle error
	}
}
```
The server will send a JSON object in the following format
```JSON
{
    "0":{
        "name":"Rainbow formal",
        "date":"2020-03-23",
        "time":"18:30",
        "location":"Howlands farm",
        "details":"",
        "createdBy":"test",
        "attending":"test,admin"
        },
    
    "1":{
        "name":"College dining",
        "date":"2020-03-30",
        "time":"17:30",
        "location":"Platform 2",
        "details":"Bring your meal card",
        "createdBy":"test",
        "attending":"test,admin"
        },
    
    "2":{
        ...
    }
    ...
}
```

> **Note** <br> Search can be easily implemented on the client side by evaluating keys and values of the JSON object sent by the server and therefore a separate search API has not implemented.

## POST Requests
Below is a template function to send a POST request to the server. For more information visit [w3schools.com](https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp)
```Javascript
function sendReq(url, data){
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify(data));
    req.onreadystatechange = function(){
        if (req.readyState == 4 && req.status == 200){
            // handle response
        }
    }
}
```

### Authenticate a user login
To authenticate a user a POST request,
- Set ```url``` to ```http://localhost:8000/auth```
- ```data``` should be set to a JSON object of following format
    ```JSON
    {
        "username": user input,
        "password": user input,
    }
    ```
- Call the function ```sendReq(url, data)``` to send the request
- If the details are correct then the server will send a response in the following format
    ```
    Welcome back username!
    ```
    Otherwise the serve will respond with the following message
    ```
    Invalid username or password.
    ```

### Create a new user
To create a new user,
- Set ```url``` to ```http://localhost:8000/newUser```
- ```data``` should be set to a JSON object of following format 
    ```JSON
    {
        "username": user input,
        "password": user input,
    }
    ```
- Call the function ```sendReq(url, data)``` to send the request
- If the details are unique the server will respond with the following message
    ```
    Welcome username your account has been created!
    ```
    Otherwise the server will respond with this message
    ```
    That username is already in use.
    ```

> **Note** <br> Your connection to the server is not encrypted and therefore it is strongly advised that do not use a real password and any other personally identifiable information

### Create a new event 
To create a new event,
- Set ```url``` to ```http://localhost:8000/newEvent```
- ```data``` should be set to a JSON object of following format 
    ```JSON
    {
        "name": user input,
        "date": "yyyy-mm-dd",
        "time": "HH:mm",
        "location": user input,
        "details": user input,
        "createdBy": username,
        "attending": "username1,username2,..."
    }
    ```
- Call the function ```sendReq(url, data)``` to send the request
- Once the event has been created the server will respond with the following message
    ```
    Your event has been created!
    ```

## PUT Requests
### Update guestlist for an event
A PUT request can be made to update an events attendance as following
```Javascript
function sendPutReq(url, data){
    var req = new XMLHttpRequest();
    req.open('PUT', url, true);
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify(data));
    req.onreadystatechange = function(){
        // handle response 
    }
}
```
- Set ```url``` to ```http://localhost:8000/event```
- ```data``` should be set to a JSON object of following format 
    ```JSON
    {
        "id": event_id,
        "currentUser": username,
    }
    ```
    > **Note** <br> event_id refers to the key of the JSON object received from the server of which the event the user wishes to attend is the value.
- Call the function ```sendPutReq(url, data)``` to send the request
- Once the user's attendance has been recorded the server will respond with the following message

    ```
    Your attendance has been recorded.
    ```