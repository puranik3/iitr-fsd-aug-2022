// Reference: https://github.com/typicode/json-server#module
// server.js
require( 'dotenv' ).config();

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');
const path = require('path');
const axios = require( 'axios' );

const port = process.env.PORT || 8001;
const baseUrl = `https://workshops-server.herokuapp.com`;

server.use(middlewares);

server.use(jsonServer.bodyParser);

// Add createdDate on POST requests
server.use((req, res, next) => {
    if (req.method === 'POST') {
        var today = new Date();
        req.body.createdDate = today.toString().substr(4, 6) + ',' + today.toString().substr(10, 5);
    }
    // Continue to JSON Server router
    next();
})

server.put('/sessions/:id/upvote', async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get( `${baseUrl}/sessions/${id}` );
        const upvoteCount = response.data && response.data.upvoteCount;

        if( upvoteCount === undefined ) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount + 1 },
            { 'Content-Type': 'application/json' }
        );

        if( response.data && response.data.upvoteCount ) {
            return res.status(200).json(response.data);
        } else {
            throw new Error( 'Problem updating upvoteCount' );
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when processing votes for session with id = ${id}`,
            error: error.message
        });
    }
});

server.put('/sessions/:id/downvote', async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get( `${baseUrl}/sessions/${id}` );
        const upvoteCount = response.data && response.data.upvoteCount;

        if( upvoteCount === undefined ) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount - 1 },
            { 'Content-Type': 'application/json' }
        );

        if( response.data && response.data.upvoteCount ) {
            return res.status(200).json(response.data);
        } else {
            throw new Error( 'Problem updating upvoteCount' );
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when processing votes for session with id = ${id}`,
            error: error.message
        });
    }
});

server.use(router);
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});