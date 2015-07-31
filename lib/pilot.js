var _    = require('lodash');
var Q    = require('q');
var util = require('util');

var GameError = require('./errors/game-error.js');
var Role      = require('./role.js');

/**
 * Constructor for a Pilot object
 *
 * @constructor
 */
var Pilot = function (model) {
    this.model = model;
};

// sets Pilot's prototype object to a new object created by calling the Role
// constructor on the empty object. This means that there will be tons Role
// objects floating around in the system, which is unnecessary because of
// Javascript prototype system, but this makes some things easier (the Role
// constructor can generate uuids and set them, instead of some invoking some
// black magic with prototypes)
util.inherits(Pilot, Role);

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
