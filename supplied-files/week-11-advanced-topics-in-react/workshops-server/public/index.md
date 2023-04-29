# Workshops Server

The workshops server serves details of (fictitious) technical workshops happening in various parts of India. Every workshop has a broad topic (eg. JavaScript), and a workshop has many sessions (each session covers a sub-topic, eg. Closures in JavaScript). A session maintains the number of upvotes, whcih can be modified by making an appropriate API call. This server allows you to view details of workshops, details of session of workshops, and also add a new workshop/session, edit and existing one and delete them. This includes 

__Note__:
* Every workshop has an id that is unique among all workshops.
* Every session has a unique id that is unique among all sessions.
* Every session has an workshopId property that is the id of the workshop to which it belongs.
* The sessions for a workshop are ordered using sequenceId (1, 2, 3 etc.). If the sequenceId of a session is less than the sequenceId of another session (for sessions belonging to the same workshop), the session with smaller id is scheduled to happen before the session with the larger id.
* Every session has an upvoteCount property that maintains the number of upvotes for the session.  
  

---

## Accessing the server online
You can [access the server at the following URL](https://workshops-server.herokuapp.com).  

To get started, you can [view all workshops here](https://workshops-server.herokuapp.com/workshops), and [all sessions here](https://workshops-server.herokuapp.com/sessions).

---

## Starting the server locally
Assuming you have Node.js installed on your system,
1. Navigate to the workshops-server folder in the command line/terminal. For example, if you are on a folder which has the workshops-server/ folder, then
```
$> cd workshops-server
```
2. Install required dependencies by running the following command
```
$> npm install
```
3. Start the server
```
$> npm start
```
__Note__:
* $> is the command prompt. DO NOT type it out!
* The server can also be started in authenticated mode. In this mode, an authentication token must first be obtained by POSTing to the https://workshops-server.herokuapp.com/workshops API, the following object.
```
{
    "email": "john.doe@example.com",
    "password": "Password123#"
}
```
No other credentials are supported by the server.  

  
---

## API Documentation

## Workshops - View all
```
GET https://workshops-server.herokuapp.com/workshops
```

## Workshops - View a page (with maximum 10 entries)
```
GET https://workshops-server.herokuapp.com/workshops?_page=<page_id>
```
For example, to view the second page
```
GET https://workshops-server.herokuapp.com/workshops?_page=2
```

## Workshops - View details of a workshop
```
GET https://workshops-server.herokuapp.com/workshops/<workshop_id>
```
For example, to view details of workshop with id = 2
```
GET https://workshops-server.herokuapp.com/workshops/2
```

## Workshops - View sessions for a workshop
```
GET https://workshops-server.herokuapp.com/workshops/<workshop_id>/sessions
```
For example, to view sessions of workshop with id = 2
```
GET https://workshops-server.herokuapp.com/workshops/2/sessions
```

## Workshops - View details of a workshop along with sessions of the workshop
```
GET https://workshops-server.herokuapp.com/workshops/<workshop_id>?_embed=sessions
```
For example, to view details of workshop with id = 2 along with its sessions
```
GET https://workshops-server.herokuapp.com/workshops/2?_embed=sessions
```

## Sessions - View all sessions
```
GET https://workshops-server.herokuapp.com/sessions
```

## Add a new workshop
```
POST https://workshops-server.herokuapp.com/workshops
```
The JSON data that must be sent is shown in below sample (modify the data as per your needs). DO NOT specify the id for the workshop. The response will have the same object with the automatically generated id for the workshop.
```
{
    "name": "jQuery",
    "description": "jQuery is a JavaScript library",
    "startDate": "2020-03-01T04:00:00.000Z",
    "endDate": "2020-03-03T08:00:00.000Z",
    "time": "9:30 am - 1:30 pm",
    "location": {
        "address": "Tata Elxsi, Prestige Shantiniketan",
        "city": "Bangalore",
        "state": "Karnataka"
    },
    "modes": {
        "inPerson": true,
        "online": false
    },
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JQuery_logo.svg/524px-JQuery_logo.svg.png"
}
```

## Add a new session
```
POST https://workshops-server.herokuapp.com/sessions
```
The JSON data that must be sent is shown in below sample (modify the data as per your needs). Specify the workshopId and set it to the id of the workshop for which this is a session. Also specify sequenceId. DO NOT specify the id for the session. The response will have the same object with the automatically generated id for the session.
```
{
    "workshopId": 13,
    "sequenceId": 1,
    "name": "Introduction to jQuery",
    "speaker": "John Doe",
    "duration": 1,
    "level": "Basic",
    "abstract": "In this session you will learn about the jQuery function and jQuery collection objects",
    "upvoteCount": 0
}
```

## Upvote a session
```
PUT https://workshops-server.herokuapp.com/sessions/<session_id>/upvote
```
For example, to upvote a session with session id = 45,
```
PUT https://workshops-server.herokuapp.com/sessions/45/upvote
```

## Downvote a session
```
PUT https://workshops-server.herokuapp.com/sessions/<session_id>/downvote
```
For example, to downvote a session with session id = 45,
```
PUT https://workshops-server.herokuapp.com/sessions/45/downvote
```

---

## Additional Reference
For more API documentation, please check the [documentation of json-server](https://github.com/typicode/json-server) using which this server has been built