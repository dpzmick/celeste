var Q = require('q');

var Ship  = require('./ship.js');
var Space = require('./space.js');

var GameError = require('./errors/game-error.js');

/**
 * Constructor for the GameModel object.
 *
 * This object is responsible for most of the things going on in the game.
 * - It (currently) contains dependency logic (is warpdrive active but this may
 *   need to be moved
 *
 * @constructor
 */
var Model = function (alerter) {
    this.alerter = alerter;
    this.ship    = new Ship(alerter);
    this.space   = new Space(100, 100, 0, 0, alerter);
};

/**
 * Moves the game's ship to a new location
 *
 * @param {number} x - x coordinate in space to move ship to
 * @param {number} y - y coordinate in space to move ship to
 */
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
