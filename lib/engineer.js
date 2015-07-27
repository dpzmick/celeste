var _ = require('lodash');
var Q = require('q');

var GameError = require('./errors/game-error.js');

/**
 * Constructor for an engineer.
 *
 * @param {Ship} - the ship for this engineer to manage
 */
var Engineer = function (model) {
    this.ship = model.shipl
};

/**
 * Engineer's handle action
 *
 * @param {object} action - the action to handle
 * @return {promise} - a promise that will resolve when action is complete
 */
Engineer.prototype.handleAction = function (action) {
    var type = action.type;

    if (type === 'allocate') {
        if (_.has(action, 'system')) {
            return this.ship.allocatePower(action.system);
        } else {
            return Q.reject(new GameError(GameError.codes.MALFORMED_ACTION, 'missing system'));
        }
    } else {
        return Q.reject(new GameError(GameError.codes.UNHANDLED_ACTION, 'cannot handle this action'));
    }
};

/**
 * TODO???
 */
Engineer.prototype.getInitialStateData = function () {
    return {};
};

module.exports = Engineer;
