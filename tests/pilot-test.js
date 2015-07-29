// not using assert style because it is easier to chain expectations with should
var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon  = require('sinon');
var Q      = require('q');

var GameError = require('../lib/errors/game-error.js');
var Pilot      = require('../lib/pilot.js');
var Model      = require('../lib/game-model.js');
var testCommon = require('./test-common.js');

describe('pilot', function () {
    // to avoid creating a real Model we will use Object.create on the prototype
    var model = Object.create(Model.prototype);

    // create a mock for the model
    var mock  = sinon.mock(model);

    afterEach(function () {
        mock.restore();
    });

    it('should conform to the actor interface', function () {
        testCommon.checkRoleInterface(new Pilot(model));
    });

    describe('handleAction', function () {
        describe('navigation action', function () {
            var p = new Pilot(model);

            it('should try to move the model\'s ship to the destination given', function () {
                var x = 10;
                var y = 10;
                var action = {
                    type: 'navigation',
                    x: x,
                    y: y
                };

                // mock that expects moveShip to be called with x, y and returns
                // an empty promise
                mock.expects('moveShip').once().withExactArgs(x, y).returns(Q());

                return p.handleAction(action).then(function () {
                    mock.verify();
                });
            });

            it('should return MALFORMED_ACTION if the action is missing an x coordinate', function () {
                var action = {
                    type: 'navigation',
                    y: 10
                };

                // hard to check multiple properties, just make multiple
                // statements (see chai issue #72)
                var promise = p.handleAction(action);

                promise.should.eventually.have.property('name', 'GameError');
                promise.should.eventually.have.property('code', GameError.codes.MALFORMED_ACTION);

                // return the rejection last so that the error doesn't bubble
                // back up
                return promise.should.eventually.be.rejected;
            });

            it('should return MALFORMED_ACTION if the action is missing an y coordinate', function () {
                var action = {
                    type: 'navigation',
                    x: 10
                };

                // hard to check multiple properties, just make multiple
                // statements (see chai issue #72)
                var promise = p.handleAction(action);

                promise.should.eventually.have.property('name', 'GameError');
                promise.should.eventually.have.property('code', GameError.codes.MALFORMED_ACTION);

                // return the rejection last so that the error doesn't bubble
                // back up
                return promise.should.eventually.be.rejected;
            });
        });
    });
});
