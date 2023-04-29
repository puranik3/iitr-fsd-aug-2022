let crypto = require('crypto');

module.exports.encode = function (payload, secret) {
    let header = {
        typ: 'JWT',
        alg: 'HS256'
    };

    let jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));

    return jwt + '.' + sign(jwt, secret);
}

module.exports.decode = function (token, secret) {
    var segments = token.split('.');

    if (segments.length !== 3) {
        throw new Error('Token structure incorrect');
    }

    let header = JSON.parse(base64Decode(segments[0]));
    let payload = JSON.parse(base64Decode(segments[1]));
    let signature = segments[2];

    let rawSignature = segments[0] + '.' + segments[1];
    
    if (!verify(rawSignature, secret, signature)) {
        throw new Error('Signature verification failed');
    }

    return payload;
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function verify(rawSignature, secret, signature) {
    return sign(rawSignature, secret) === signature;
}

function base64Encode(str) {
    return new Buffer(str).toString('base64');
}

function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}