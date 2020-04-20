// Send home page
/**
 * @api {get} / Get Stephenson college's events homepage
 * @apiName Get homepage
 * @apiGroup Events
 * @apiExample Homepage URL
 *  http://localhost:8000/
*/

// Send all events
/**
 * @api {get} /events Get all events
 * @apiName Get all events
 * @apiDescription The server sends a JSON object in response to this GET request where the key represents the id of the event and the value contains the event details.
 * @apiGroup Events
 * @apiSuccess {Object} Events List of events
 * @apiSuccess {String} Object[key] Event id
 * @apiSuccess {String} key.name Event Title
 * @apiSuccess {Date} key.date Event date
 * @apiSuccess {Time} key.time Event time
 * @apiSuccess {String} key.location Event Location
 * @apiSuccess {String} key.details Additional information about the event
 * @apiSuccess {String} key.createdBy Username of the user who created the event
 * @apiSuccess {String} key.attending List of users attending the event
 * @apiSuccessExample {json} Response example
 *  HTTP/1.1 200 OK
 *      {
 *          0:{
 *              "name":"Event 1",
 *              "date":"YYYY-MM-DD",
 *              "time":"HH:MM",
 *              "location": "somewhere",
 *              "details":"Event details",
 *              "createdBy":"username",
 *              "attending":"username_1,username_2,...",
 *          },
 *          1:{
 *              "name":"Event 2",
 *              "date":"YYYY-MM-DD",
 *              "time":"HH:MM",
 *              "location": "somewhere",
 *              "details":"Event details",
 *              "createdBy":"username",
 *              "attending":"username_1,username_2,...",
 *          }
 *      }
*/

// updating an event
/**
 * @api {put} /event Add the current user to an events guestlist
 * @apiName Update event's attendance
 * @apiGroup Events
 * @apiHeader {String} id Event id, it is same as the key of the event in the response sent by the server when fetching all events.
 * @apiHeader {String} currentUser Username of the current user
 * @apiHeaderExample {JSON} Request example
 * {
 *      "id":"4",
 *      "currentUser":"test"
 * }
 * @apiSuccessExample {text} Response to a valid request
 * HTTP/1.1 200 OK
 *  Your attendance has been recorded.
 * @apiErrorExample {text} Response to a bad request
 * // When the request is missing parameters
 * HTTP/1.1 400 Bad Request
 *  event id and/or current user not defined.
 *
 * // When the event specified is not found
 * HTTP/1.1 404 Not Found
 *  event not found.
*/

// Authenticate user
/**
 * @api {post} /auth Authenticate a user's login credentials
 * @apiName User login
 * @apiGroup Users
 * @apiDescription <strong>Note</strong><br> Your connection to the server and the file that stores user data is not encrypted and therefore it is strongly advised that do not use a real password and any other personally identifiable information
 * @apiHeader {String} username User's username
 * @apiHeader {String} password User's password
 * @apiHeaderExample {JSON} Request example
 * {
 *      "username": "test",
 *      "password": "test"
 * }
 * @apiSuccessExample {text} Response to correct credentials
 * HTTP/1.1 200 OK
 *  Welcome back [username]!
 * @apiErrorExample {text} Response to incorrect credentials
 * HTTP/1.1 401 Unauthorized
 *  Invalid username or password.
*/

// Create new user
/**
 * @api {post} /newUser Create a new user
 * @apiName User signup
 * @apiGroup Users
 * @apiDescription <strong>Note</strong><br> Your connection to the server and the file that stores user data is not encrypted and therefore it is strongly advised that do not use a real password and any other personally identifiable information
 * @apiHeader {String} username Chosen username
 * @apiHeader {String} password Chosen password
 * @apiHeaderExample {JSON} Request example
 * {
 *      "username": "test",
 *      "password": "test"
 * }
 * @apiSuccessExample {text} Successful Signup
 * HTTP/1.1 200 OK
 *  Welcome [username] your account has been created!
 * @apiErrorExample {text} Unsuccessful signup
 * HTTP/1.1 401 Unauthorized
 *  That username is already in use.
*/

// Create new event
/**
 * @api {post} /newEvent Create a new event
 * @apiName Create a new event
 * @apiGroup Events
 * @apiHeader {String} name Event Title
 * @apiHeader {Date} date Event date
 * @apiHeader {Time} time Event time
 * @apiHeader {String} location Event Location
 * @apiHeader {String} details Additional information about the event
 * @apiHeader {String} createdBy Username of the user who created the event
 * @apiHeaderExample {JSON} Request example
 * {
 *      "name": user input,
 *      "date": "yyyy-mm-dd",
 *      "time": "HH:mm",
 *      "location": user input,
 *      "details": user input,
 *      "createdBy": username,
 *      "attending": "username1,username2,..."
 * }
 * @apiSuccessExample {text} Response to a valid request
 * HTTP/1.1 200 OK
 *  Your event has been created.
 * @apiErrorExample {text} Response to a bad request
 * HTTP/1.1 400 Bad Request
 *  Some event details were not found.
*/
