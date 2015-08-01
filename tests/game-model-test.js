var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon   = require('sinon');
var Q       = require('q');

var GameError = require('../lib/errors/game-error.js');
var Alerter   = require('../lib/alerter.js');
var Model     = require('../lib/game-model.js');

var Ship      = require('../lib/model-entities/ship.js');
var Space     = require('../lib/model-entities/space.js');

// @lawrence this is an excellent example of why dependency injections is a nice
// thing
describe('model', function () {
    var alerter = Object.create(Alerter.prototype);
    var ship    = new Ship(alerter);
    var space   = new Space(alerter);

    // var alerterMock = sinon.mock(alerter);
    var shipMock    = sinon.mock(ship);
    var spaceMock   = sinon.mock(space);
    var model       = new Model(alerter, ship, space);

    afterEach(function () {
        shipMock.restore();
        spaceMock.restore();
    });

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

        it('should throw an ALLOCATION_ERROR if the warpdrive is not active', function () {
            // pretend the ship does not have warp drive enabled
            shipMock.expects('isPowered').once().withExactArgs('warpdrive').returns(false);

            var promise = model.moveShip(10, 10);
            return promise.should.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.ALLOCATION_ERROR);
            });
        });
    });
});
