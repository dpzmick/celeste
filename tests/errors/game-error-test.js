var chai   = require('chai');
var should = chai.should(); // eslint-disable-line no-unused-vars

var GameError = require('../../lib/errors/game-error.js');

describe('GameError', function () {
    describe('constructor', function () {
        var code = 0;
        var message = 'cats rule';
        var error = new GameError(code, message);

        // no idea how to implement this test
        // it('should capture a stack trace when thrown', function () {
        //     throw new Error('not implemented');
        // });

        it('should assign the message provided to the message property', function () {
            error.should.have.property('message', message);
        });

        it('should assign the error code to the code property', function () {
            error.should.have.property('code', code);
        });

        it('should a property \'type\' with value \'error\'', function () {
            error.should.have.property('type', 'error');
        });
    });

    describe('error codes', function () {
        it('should define a variety of error codes', function () {
            var codes = GameError.codes;

            codes.should.have.property('ALREADY_HAS_ROLE');
            codes.should.have.property('INVALID_ROLE');
            codes.should.have.property('ROLE_TAKEN');
            codes.should.have.property('MALFORMED_ACTION');
        });
    });
});
