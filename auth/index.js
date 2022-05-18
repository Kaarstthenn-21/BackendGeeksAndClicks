
const jwt = require('jsonwebtoken');
const config = require('../config');
const Error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        if (decoded.id !== owner) {
            throw Error('No tienes permisos de edicion', 401);
        }
    },
}
function getToken(authorization) {
    //Bearer token
    if (!authorization) {
        throw new Error('No cuenta con token');
    }
    if (authorization.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }
    let token = authorization.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};