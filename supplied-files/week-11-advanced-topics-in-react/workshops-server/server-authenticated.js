/**
 * Reference: https://github.com/typicode/json-server#module
 */
require( 'dotenv' ).config();

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const multer = require( 'multer' );

const jwt = require('./services/jwt');

const port = 8001;

const fs = require('fs');
const path = require('path');
const axios = require( 'axios' );

// const baseUrl = `https://workshops-server.herokuapp.com`;
const baseUrl = `http://localhost:8001`;

server.use(middlewares);
server.use(jsonServer.bodyParser);

function authenticate( req, res, next ) {
    if (req.path === '/login') return next();
    if( req.path.match( /^\/users\/me\/profilephoto\/.+$/ ) && req.method.toLowerCase() === 'get' ) return next();

    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }

    let token = req.headers.authorization.split(' ')[1];
    
    let payload;
    try {
        payload = jwt.decode(token, 'shhh...');
    } catch (err) {
        return res.sendStatus(401);
    }

    if (!payload || !payload.sub) {
        return res.sendStatus(401);
    }

    res.locals.payload = payload;
    req.payload = payload;

    return next();
}

function authorize( roles ) {
    return function( req, res, next ) {
        if( roles.includes( res.locals.payload.role ) ) {
            return next();
        }

        res.sendStatus(403);
    }
}

server.use( authenticate );

const storage = multer.diskStorage({
    destination: function( req, file, cb ) {
        cb( null, path.join( __dirname, 'uploads', file.fieldname ) );
    },
    filename: function( req, file, cb ) {
        req.uploads = req.uploads || [];

        req.uploads.push({
            _id: req.payload.sub
        });
        
        console.log( req.payload );
        cb( null, req.payload.sub );
    }
});

function fileFilter( req, file, cb ) {
    const fieldname = file.fieldname, extension = path.extname( file.originalname );

    const allowedExtensions = [ '.JPG', '.JPEG', '.PNG', '.TIFF' ];
    if( fieldname === 'profile' ) {
        return cb( null, allowedExtensions.indexOf( extension.toUpperCase() ) !== -1 )
    }

    if( fieldname === 'speakersbio' ) {
        return cb( null, extension.toUpperCase() === '.PDF' );
    }
}

// const upload = multer({ dest: 'uploads/' })
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const uploadHandler = upload.fields(
    [
        { name: 'profile', maxCount: 1 },
        // { name: 'speakersbio', maxCount: 4 }
    ]
);

// Add createdDate on POST requests for /workshops and /sessions
server.use((req, res, next) => {
    if (req.method === 'POST') {
        var today = new Date();
        req.body.createdDate = today.toString().substr(4, 6) + ',' + today.toString().substr(10, 5);
    }

    next();
});

server.get( '/workshops', authorize( [ 'admin', 'general' ] ) );
server.get( '/workshops/:id', authorize( [ 'admin', 'general' ] ) );
server.put( '/workshops/:id', authorize( [ 'admin' ] ) );
server.post( '/workshops', authorize( [ 'admin' ] ) );
server.delete( '/workshops/:id', authorize( [ 'admin' ] ) );

server.get( '/sessions', authorize( [ 'admin', 'general' ] ) );
server.get( '/sessions/:id', authorize( [ 'admin', 'general' ] ) );
server.put( '/sessions/:id', authorize( [ 'admin' ] ) );
server.put( '/sessions/:id/upvote', authorize( [ 'admin', 'general' ] ) );
server.put( '/sessions/:id/downvote', authorize( [ 'admin', 'general' ] ) );
server.post( '/sessions', authorize( [ 'admin' ] ) );
server.delete( '/sessions/:id', authorize( [ 'admin' ] ) );

server.get( '/workshops/:id/sessions', authorize( [ 'admin', 'general' ] ) );

server.get( '/users/me/profilephoto/:id', /*authorize( [ 'admin', 'general' ] )*/ function( req, res, next ) {
    const id = req.params.id;
    res.sendFile( path.join( process.cwd(), 'uploads', 'profile', id ) );
});

server.post( '/users/me/profilephoto', authorize( [ 'admin', 'general' ] ), uploadHandler, function( req, res ) {
    console.log( req.body );
    console.log( req.files );

    res.status( 200 ).send( req.uploads );
});

// login endpoint
server.post('/login', function (req, res) {
    let body = req.body;
    let email = body.email;
    let password = body.password;

    if(
        email === 'john.doe@example.com' && password === 'Password123#' || 
        email === 'jane.doe@example.com' && password === 'Password123#'
    ) {
        let payload = {
            iss: req.hostname,
            sub: '' + email
        };

        const role = email === 'john.doe@example.com' ? 'admin' : 'general';
        const name = email === 'john.doe@example.com' ? 'johndoe' : 'janedoe';
        payload.role = role;
        payload.name = name;

        let token = jwt.encode(payload, 'shhh...');

        res.json({
            email,
            authToken: token,
            role,
            name
        });
    } else {
        res.sendStatus(401);
    }
});

server.put('/sessions/:id/upvote', async (req, res, next) => {
    console.log( 'upvote logic' );
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get( `${baseUrl}/sessions/${id}`, {
            headers: req.headers
        });
        const upvoteCount = response.data && response.data.upvoteCount;

        if( upvoteCount === undefined ) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount + 1 },
            {
                headers: {
                    ...req.headers,
                    'Content-Type': 'application/json'
                }
            }
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
        response = await axios.get( `${baseUrl}/sessions/${id}`, {
            headers: req.headers
        });
        const upvoteCount = response.data && response.data.upvoteCount;

        if( upvoteCount === undefined ) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount - 1 },
            {
                headers: {
                    ...req.headers,
                    'Content-Type': 'application/json'
                }
            }
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
  console.log( `JSON Server is running on port ${port}` );
});