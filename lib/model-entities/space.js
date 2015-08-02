'use strict';
var Q = require('q');

var GameError = require('../errors/game-error.js');

/**
 * checks if (x,y) is in (0,0) -> (xmax, ymax)
 *
 * xmax, ymax endpoints are NOT inclusive
 */
var checkBounds = function (xmax, ymax, x, y) {
    return x >= 0
           && y >= 0
           && x < xmax
           && y < ymax;
};

/**
 * Creates a space entity. The space has dimensions and tracks the location of
 * other entities in the game
 *
 * The ship starts at (0,0).
 *
 * @constructor
 * @param {number} width - width of the space
 * @param {number} height - height of the space
 * @param {object} alerter - alerter to send updates to
 */
var Space = function (width, height, alerter) {
    this.width  = width;
    this.height = height;
    this.alerter = alerter;

    this.shipX = 0;
    this.shipY = 0;
};

/**
 * Moves the ship to a given location. Checks if (x,y) is in bounds
 *
 * @param {number} x
 * @param {number} y
 * @return {promise} - resolved if the move was sucessful
 */
Space.prototype.moveShipTo = function (x, y) {
    if (!checkBounds(this.width, this.height, x, y)) {
        return Q.reject(new GameError(GameError.codes.OUT_OF_BOUNDS), 'ship can\'t be moved to this location');
    }

    this.shipX = x;
    this.shipY = y;

    return this.alerter.shipLocationChange(x, y);
};

Space.prototype.getShipX = function () {
    return this.shipX;
};

Space.prototype.getShipY = function () {
    return this.shipY;
};

module.exports = Space;
