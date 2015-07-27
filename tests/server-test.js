var assert = require('chai').assert;

var io     = require('socket.io-client');

var mkserver  = require('../lib/server.js');
var GameError = require('../lib/errors/game-error.js');

var options = {
  'force new connection': true
};

var socketURL = 'ws://localhost:3000';
var role = 'pilot';

describe('server', function () {
    var server = null;
    var client = null;

    before(function () {
        server = mkserver();
    });

    it('should accept a connection', function (done) {
        client = io.connect(socketURL, options);

        client.on('connect', function () {
            done();
        });

        client.on('error', function (err) {
            done(err);
        });
    });

    it('should allow the client to register a new role', function (done) {
        client.emit('register', role, function (err) {
            if (err) {
                // if we got here, we know we are in error state
                // but the errors we are passing back don't appear to retain their
                // "errorness" after coming through socket.io, so wrap it in an error
                // to make mocha happy
                if (err.name !== 'GameError') {
                    return done(new Error('the error type is not what is expected'));
                } else {
                    return done(new Error(err.message));
                }
            }

            // if we didn't get an error, it worked
            done();
        });
    });

    it('should not allow a new client to claim the same role', function (done) {
        // note: there may be roles later for which multiple roles are allowed
        // if logic gets more complicated, the role delegation should be done in
        // its own module, not in the server, and these tests would move to the
        // tests for that module
        var client2 = io.connect(socketURL, options);
        client2.on('connect', function () {
            client2.emit('register', role, function (err) {
                if (err) {
                    assert.equal(err.code, GameError.codes.ROLE_TAKEN);
                    return done();
                }

                return done(new Error('an error should have been thrown'));
            });
        });
    });

    it('should not allow the client to register a second time', function (done) {
        client.emit('register', 'anything', function (err) {
            if (err) {
                assert.equal(err.code, GameError.codes.ALREADY_HAS_ROLE);
                return done();
            }
            return done(new Error('should not have been able to register a second time'));
        });
    });

    after(function () {
        server.close();
    });
});
