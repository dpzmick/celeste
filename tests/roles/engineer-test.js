// not using assert style because it is easier to chain expectations with should
var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon  = require('sinon');
var Q      = require('q');

var testCommon = require('../test-common.js');
var GameError  = require('../../lib/errors/game-error.js');

var Engineer   = require('../../lib/roles/engineer.js');

var Model      = require('../../lib/game-model.js');
var Ship       = require('../../lib/model-entities/ship.js');

describe('Engineer', function () {
    // to avoid creating a real Model we will use Object.create on the prototype
    // this means that, if we use something like getShip on this model, the ship
    // will be undefined, so we will need to mock the behavior of getShip, etc.
    var model = Object.create(Model.prototype);

    // create a mock for the model
    var mock  = sinon.mock(model);

    afterEach(function () {
        mock.restore();
    });

    it('should conform to the actor interface', function () {
        testCommon.checkRoleInterface(new Engineer(model));
    });

    it('should follow the actor uuid rules', function () {
        testCommon.checkRoleUUID(Engineer);
    });

    describe('handleAction', function () {
        it('should reject the promise with UNHANDLED_ACTION if the action cannot be handled', function () {
            var action = { type: 'NOT_REAL' };

            var e = new Engineer(model);

            return e.handleAction(action).should.eventually.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.UNHANDLED_ACTION);
            });
        });

        describe('allocate', function () {
            var e = new Engineer(model);

            it('should reject the promise with MALFORMED_ACTION if the system is not included', function () {
                var action = { type: 'allocate' };

                return e.handleAction(action).should.eventually.be.rejected.then(function (error) {
                    error.should.have.property('name').that.equals('GameError');
                    error.should.have.property('code').that.equals(GameError.codes.MALFORMED_ACTION);
                });
            });

            it('should reject the promise with MALFORMED_ACTION if the system is empty string', function () {
                var action = { type: 'allocate', system: '' };

                return e.handleAction(action).should.eventually.be.rejected.then(function (error) {
                    error.should.have.property('name').that.equals('GameError');
                    error.should.have.property('code').that.equals(GameError.codes.MALFORMED_ACTION);
                });
            });

            it('should succeed to allocate power', function () {
                var action = {
                    type: 'allocate',
                    system: 'warpdrive'
                };

                var ship = new Ship();
                var shipMock = sinon.mock(ship);

                // stick the fake ship into the system
                mock.expects('getShip').once().returns(ship);
                shipMock.expects('allocatePower').withExactArgs('warpdrive').returns(Q('cat'));

                return e.handleAction(action).then(function (result) {
                    result.should.equal('cat');
                    mock.verify();
                    shipMock.verify();
                });
            });
        });
    });
});
