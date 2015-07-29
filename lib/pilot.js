var _ = require('lodash');
var Q = require('q');

var GameError = require('./errors/game-error.js');

/**
 * Constructor for a Pilot object
 *
 * @constructor
 */
var Pilot = function (model) {
    this.model = model;
};

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
    // var space = this.model.getSpace();
    // var ship  = this.model.getShip();

    return {};
};

module.exports = Pilot;
