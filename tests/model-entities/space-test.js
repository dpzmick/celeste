var chai           = require('chai');
var should         = chai.should(); // eslint-disable-line no-unused-vars
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sinon  = require('sinon');
var Q      = require('q');

var Space      = require('../../lib/model-entities/space.js');
var Alerter    = require('../../lib/alerter.js');

var GameError = require('../../lib/errors/game-error.js');

describe('Ship', function () {
    var alerter = Object.create(Alerter.prototype); // don't want to actually make one
    var space   = new Space(10, 10, alerter);

    describe('constructor', function () {
        it('should set put the ship at (0,0)', function () {
            space.getShipX().should.equal(0);
            space.getShipY().should.equal(0);
        });
    });

    describe('moveShipTo', function () {
        it('should exist', function () {
            space.moveShipTo.should.be.a('function');
        });

        it('should fail with OUT_OF_BOUNDS if x is negative', function () {
            return space.moveShipTo(-1, 0).should.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.OUT_OF_BOUNDS);
            });
        });

        it('should fail with OUT_OF_BOUNDS if x is too large', function () {
            return space.moveShipTo(100, 0).should.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.OUT_OF_BOUNDS);
            });
        });

        it('should fail with OUT_OF_BOUNDS if y is negative', function () {
            return space.moveShipTo(0, -1).should.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.OUT_OF_BOUNDS);
            });
        });

        it('should fail with OUT_OF_BOUNDS if y is too large', function () {
            return space.moveShipTo(0, 100).should.be.rejected.then(function (error) {
                error.should.have.property('name').that.equals('GameError');
                error.should.have.property('code').that.equals(GameError.codes.OUT_OF_BOUNDS);
            });
        });

        it('should move the ship and send an alert', function () {
            var x = 5;
            var y = 5;

            var mock = sinon.mock(alerter);
            mock.expects('shipLocationChange').once().withExactArgs(x, y).returns(Q());

            return space.moveShipTo(x, y).then(function (){
                space.getShipX().should.equal(x);
                space.getShipY().should.equal(y);
                return mock.verify();
            });
        });
    });

    describe('getShipX', function () {
        it('should exist', function () { space.getShipX.should.be.a('function'); });
    });

    describe('getShipY', function () {
        it('should exist', function () { space.getShipY.should.be.a('function'); });
    });
});
