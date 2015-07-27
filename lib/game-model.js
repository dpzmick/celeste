var Q = require('q');

var Ship  = require('./ship.js');
var Space = require('./space.js');

var GameError = require('./errors/game-error.js');

var Model = function (alerter) {
    this.alerter = alerter;
    this.ship    = new Ship(alerter);
    this.space   = new Space(100, 100, 0, 0, alerter);
};

Model.prototype.moveShip = function (x, y) {
    if (!this.ship.isPowered('warpdrive')) {
        return Q.reject(new GameError(GameError.codes.ALLOCATION_ERROR, 'warpdrive not active'));
    }

    var bound = this.space.moveShipTo.bind(this.space);
    return this.ship.isPowered().then(function () {
        return bound(x, y);
    });
};

Model.prototype.getShip  = function () { return this.ship; };
Model.prototype.getSpace = function () { return this.space; };

module.exports = Model;
