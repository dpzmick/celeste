var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon   = require('sinon');
var Q       = require('q');
var mockery = require('mockery');

var GameError = require('../lib/errors/game-error.js');
var Model      = require('../lib/game-model.js');

describe('model', function () {
    describe('moveShip', function () {
        it('should move the current ship to the given coordinates, when warp drive is engaged', function () {
        });
    });
});
