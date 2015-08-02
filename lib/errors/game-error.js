var util = require('util');

/**
 * An error object to use in celeste. Because it is a pain to make a bunch of
 * errors that all do the same thing, I'm using a single GameError object for all
 * errors.
 *
 * Having errors with different names might be nice, but it doesn't provide much
 * more than slightly more clear syntax.
 *
 * It does not appear that this gets written out over a socket as a real error,
 * perhaps due to some behavior of util.inherits
 *
 * @constructor
 */
var GameError = function (code, message) {
    Error.captureStackTrace(this);
    this.name    = 'GameError';
    this.code    = code;
    this.message = message;
    this.type    = 'error';
};
util.inherits(GameError, Error);

// could use strings for all of the error codes, but I want to define a
// consistent set of error codes across the application
// If we do not enforce what the valid error codes are, we are likely to end up
// with a variety of different error code that all mean the same thing.
// autogenerate the "enum"
var validErrors = [
    'ALREADY_HAS_ROLE',
    'INVALID_ROLE',
    'ROLE_TAKEN',
    'MALFORMED_ACTION',
    'ALLOCATION_ERROR',
    'OUT_OF_BOUNDS',
    'GENERIC'
];

// helper function that will be called when module is required the first time
// because require caches objects, this will only get called once when the
// application runs, and will probably get called very close to startup time
// I will admit it is a bit questionable to do this
function generateCodes () {
    GameError.codes = {};

    var i = 0;
    for (i = 0; i < validErrors.length; i++) {
        GameError.codes[validErrors[i]] = i;
    }
}
generateCodes();
module.exports = GameError;
