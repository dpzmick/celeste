var util = require('util');

/**
 * An error obect to use
 *
 * It does not appear that this gets written out over a socket as a real error,
 * perhaps due to some behavior of util.inherits
 */
var GameError = function (code, message) {
    Error.captureStackTrace(this);
    this.name    = 'GameError';
    this.code    = code;
    this.message = message;
    this.type    = 'error';
};

// TODO test this all
GameError.codes = {
    ALREADY_HAS_ROLE: 0,
    INVALID_ROLE: 1,
    ROLE_TAKEN: 2
};

util.inherits(GameError, Error);

module.exports = GameError;
