var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon  = require('sinon');
var Q      = require('q');

var Ship       = require('../../lib/model-entities/ship.js');
var Alerter    = require('../../lib/alerter.js');

describe('Ship', function () {
    var alerter = Object.create(Alerter.prototype); // don't want to actually make one
    var ship = new Ship(alerter);
    var system = 'warpdrive';

    describe('constructor', function () {
        it('should set power to the shields', function () {
            ship.getPoweredSystem().should.equal('shields');
        });
    });

    describe('allocatePower', function () {
        it('should exist', function () {
            ship.allocatePower.should.be.a('function');
        });

        it('should change the ships power system and send an alert to the alerter', function () {
            var alertMock = sinon.mock(alerter);
            alertMock.expects('powerChange').once().withExactArgs(system).returns(Q());

            return ship.allocatePower(system).then(function () {
                ship.getPoweredSystem().should.equal(system);
                return alertMock.verify();
            });
        });
    });

    describe('isPowered', function () {
        it('should exist', function () {
            ship.isPowered.should.be.a('function');
        });

        it('should return true if the system is powered', function () {
            return ship.isPowered(system).should.be.true;
        });

        it('should return false if it is not', function () {
            return ship.isPowered('cat').should.be.false;
        });
    });

    describe('getPoweredSystem', function () {
        // this is just a getter, make sure it exists and we are good
        it('should exist', function () {
            ship.getPoweredSystem.should.be.a('function');
        });
    });
});
