var assert = require('chai').assert;
var sinon  = require('sinon');
var Q      = require('q');

// var GameError = require('../lib/errors/game-error.js');
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

                var p = new Pilot(model);
                return p.handleAction(action).then(function () {
                    mock.verify();
                });
            });
        });
    });
});
