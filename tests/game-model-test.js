var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon   = require('sinon');
var Q       = require('q');

var GameError = require('../lib/errors/game-error.js');
var Ship      = require('../lib/ship.js');
var Space     = require('../lib/space.js');
var Alerter   = require('../lib/alerter.js');
var Model     = require('../lib/game-model.js');

// @lawrence this is an excellent example of why dependency injections is a nice
// thing
describe('model', function () {
    // lots of mocks needed here, maybe this code needs to be simplified
    var alerter = Object.create(Alerter.prototype);
    var ship    = new Ship(alerter);
    var space   = new Space(alerter);

    // var alerterMock = sinon.mock(alerter);
    var shipMock    = sinon.mock(ship);
    var spaceMock   = sinon.mock(space);
    var model       = new Model(alerter, ship, space);

    describe('moveShip', function () {
        it('should move the current ship to the given coordinates, when warp drive is engaged', function () {
            var x = 10;
            var y = 10;

            // pretend the ship has warp drive enabled
            shipMock.expects('isPowered').once().withExactArgs('warpdrive').returns(true);

            // mock space, return a promise with 'cat'
            spaceMock.expects('moveShipTo').once().withExactArgs(x, y).returns(Q('cat'));

            return model.moveShip(x, y).should.eventually.equal('cat').then(function () {
                shipMock.verify();
                spaceMock.verify();
            });
        });
    });

});
