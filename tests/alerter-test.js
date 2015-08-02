var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon  = require('sinon');

var GameError  = require('../lib/errors/game-error.js');

var Alerter = require('../lib/alerter.js');

describe('Alerter', function () {
    // don't pull in any real sockets here, just make one up
    var socket = {
        emit: function () {}
    };

    var alerter = new Alerter({sockets: socket});

    // go ahead and add a few roles
    // TODO this may get hairy if the number of roles gets too large
    var pilotSocket    = { emit: function () {} };
    var engineerSocket = { emit: function () {} };

    alerter.registerSocketFor('pilot', pilotSocket);
    alerter.registerSocketFor('engineer', engineerSocket);

    describe('sendMessageTo', function () {
        it('sends a message to the given role', function () {
            var message = 'cat';

            var pMock = sinon.mock(pilotSocket);
            pMock.expects('emit').once().withExactArgs('message', message);

            return alerter.sendMessageTo('pilot', message).then(function () {
                return pMock.verify();
            });
        });

        it('should reject with GENERIC when the role is not registered', function () {
            var message = 'who cares';

            var promise = alerter.sendMessageTo('cat', message);
            return promise.should.eventually.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.GENERIC);
            });
        });
    });

    describe('sendMessageToEveryone', function () {
        it('sends arbitrary messages to everyone', function () {
            var message = 'cats are the best pet';

            var mock = sinon.mock(socket);
            mock.expects('emit').once().withExactArgs('message', message);

            return alerter.sendMessageToEveryone(message).then(function () {
                return mock.verify();
            });
        });
    });

    describe('someoneRegistered', function () {
        it('should send the correct message to everyone', function () {
            var role = 'cat role';
            var payload = {
                type: 'new registration',
                role: role
            };

            var mock = sinon.mock(socket);
            mock.expects('emit').once().withExactArgs('message', payload);

            return alerter.someoneRegistered(role).then(function () {
                mock.verify();
            });
        });
    });

    describe('shipLocationChange', function () {
        it('should send the correct message to everyone', function () {
            var x = 5;
            var y = 5;
            var payload = {
                type: 'ship location change',
                x: x,
                y: y
            };

            var mock = sinon.mock(socket);
            mock.expects('emit').once().withExactArgs('message', payload);

            return alerter.shipLocationChange(x, y).then(function () {
                return mock.verify();
            });
        });
    });

    describe('powerChange', function () {
        // this might not make sense, see comment at end of alerter file
        it('should send the correct message to the pilot and the engineer', function () {
            var system = 'cat drive';
            var payload = {
                type: 'allocation',
                system: system
            };

            var pMock = sinon.mock(pilotSocket);
            var eMock = sinon.mock(engineerSocket);
            pMock.expects('emit').once().withExactArgs('message', payload);
            eMock.expects('emit').once().withExactArgs('message', payload);

            return alerter.powerChange(system).then(function () {
                pMock.verify();
                return eMock.verify();
            });
        });
    });
});
