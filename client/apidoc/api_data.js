define({ "api": [
  {
    "type": "post",
    "url": "/newEvent",
    "title": "Create a new event",
    "name": "Create_a_new_event",
    "group": "Events",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Event Title</p>"
          },
          {
            "group": "Header",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Event date</p>"
          },
          {
            "group": "Header",
            "type": "Time",
            "optional": false,
            "field": "time",
            "description": "<p>Event time</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Event Location</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Additional information about the event</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Username of the user who created the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n     \"name\": user input,\n     \"date\": \"yyyy-mm-dd\",\n     \"time\": \"HH:mm\",\n     \"location\": user input,\n     \"details\": user input,\n     \"createdBy\": username,\n     \"attending\": \"username1,username2,...\"\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>Your event has been created.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>Some event details were not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events",
    "title": "Get all events",
    "name": "Get_all_events",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Events",
            "description": "<p>List of events</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Object[key]",
            "description": "<p>Event id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key.name",
            "description": "<p>Event Title</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "key.date",
            "description": "<p>Event date</p>"
          },
          {
            "group": "Success 200",
            "type": "Time",
            "optional": false,
            "field": "key.time",
            "description": "<p>Event time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key.location",
            "description": "<p>Event Location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key.details",
            "description": "<p>Additional information about the event</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key.createdBy",
            "description": "<p>Username of the user who created the event</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key.attending",
            "description": "<p>List of users attending the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n    {\n        0:{\n            \"name\":\"Event 1\",\n            \"date\":\"YYYY-MM-DD\",\n            \"time\":\"HH:MM\",\n            \"location\": \"somewhere\",\n            \"details\":\"Event details\",\n            \"createdBy\":\"username\",\n            \"attending\":\"username_1,username_2,...\",\n        },\n        1:{\n            \"name\":\"Event 2\",\n            \"date\":\"YYYY-MM-DD\",\n            \"time\":\"HH:MM\",\n            \"location\": \"somewhere\",\n            \"details\":\"Event details\",\n            \"createdBy\":\"username\",\n            \"attending\":\"username_1,username_2,...\",\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get Stephenson college's events homepage",
    "name": "Get_homepage",
    "group": "Events",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "HTML",
            "optional": false,
            "field": "Port-8000",
            "description": "<p>Returns websites files</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Homepage URL",
        "content": "http://localhost:8000/",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "/event",
    "title": "Add the current user to an events guestlist",
    "name": "Update_event's_attendance",
    "group": "Events",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event id, it is same as the key of the event in the response sent by the server when fetching all events.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "currentUser",
            "description": "<p>Username of the current user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n     \"id\":\"4\",\n     \"currentUser\":\"test\"\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>Your attendance has been recorded.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>event id and/or current user not defined.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>event not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Events"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Authenticate a user's login credentials",
    "name": "User_login",
    "group": "Users",
    "description": "<p><strong>Note</strong><br> Your connection to the server and the file that stores user data is not encrypted and therefore it is strongly advised that do not use a real password and any other personally identifiable information</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n     \"username\": \"test\",\n     \"password\": \"test\"\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>Welcome back [username]!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>Invalid username or password.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/newUser",
    "title": "Create a new user",
    "name": "User_signup",
    "group": "Users",
    "description": "<p><strong>Note</strong><br> Your connection to the server and the file that stores user data is not encrypted and therefore it is strongly advised that do not use a real password and any other personally identifiable information</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Chosen username</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Chosen password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n     \"username\": \"test\",\n     \"password\": \"test\"\n}",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>Welcome [username] your account has been created!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "type": "text",
            "optional": false,
            "field": "Response",
            "description": "<p>That username is already in use.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Users"
  }
] });
