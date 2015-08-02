var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon  = require('sinon');
var Q      = require('q');

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
