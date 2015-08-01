var _    = require('lodash');
var Q    = require('q');
var util = require('util');

var GameError = require('../errors/game-error.js');
var Entity    = require('../entity.js');

/**
 * Constructor for a Pilot object
 *
 * @constructor
 */
var Pilot = function (model) {
    Pilot.super_.call(this);
    this.model = model;
};
util.inherits(Pilot, Entity);

/**
 * Pilot's handle action method
 *
 * @param {object} action - the action to handle
 * @return {promise} a promise that will resolve when the action is completed
 */
Pilot.prototype.handleAction = function (action) {
    var type = action.type;

    if (type === 'navigation') {
        if (_.has(action, 'x') && _.has(action, 'y')) {
            return this.model.moveShip(action.x, action.y);
        } else {
            return Q.reject(new GameError(GameError.codes.MALFORMED_ACTION, 'missing x or y coordinate'));
        }
    } else {
        return Q.reject(new GameError(GameError.codes.UNHANDLED_ACTION, 'cannot handle this action'));
    }
};

/**
 * gets the initial state data for a pilot
 */
Pilot.prototype.getInitialStateData = function () {
    return {
        ship: this.model.getShip().getUUID()
    };
};

module.exports = Pilot;
