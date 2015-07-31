var Q = require('q');

var GameError = require('./errors/game-error.js');

/**
 * Constructor for the GameModel object.
 *
 * This object is responsible for most of the things going on in the game.
 * - It (currently) contains dependency logic (is warpdrive active but this may
 *   need to be moved
 *
 * all members are injected
 *
 * @param {object} alerter - the alerter to use in this model
 * @param {object} ship - the ship to use in this model
 * @param {object} space - the space to use in this model
 *
 * @constructor
 */
var Model = function (alerter, ship, space) {
    this.alerter = alerter;
    this.ship    = ship;
    this.space   = space;
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

    return this.space.moveShipTo(x, y);
};

Model.prototype.getShip  = function () { return this.ship; };
Model.prototype.getSpace = function () { return this.space; };

module.exports = Model;
