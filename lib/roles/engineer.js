'use strict';
var _    = require('lodash');
var Q    = require('q');
var util = require('util');

var GameError = require('../errors/game-error.js');
var Entity    = require('../entity.js');

/**
 * Constructor for an engineer.
 *
 * @constructor
 * @param {Ship} - the ship for this engineer to manage
 */
var Engineer = function (model) {
    Engineer.super_.call(this);
    this.model = model;
};
util.inherits(Engineer, Entity);

/**
 * Engineer's handle action
 *
 * @param {object} action - the action to handle
 * @return {promise} - a promise that will resolve when action is complete
 */
Engineer.prototype.handleAction = function (action) {
    var type = action.type;

    if (type === 'allocate') {
        if (_.has(action, 'system') && action.system !== '') {
            return this.model.getShip().allocatePower(action.system);
        } else {
            return Q.reject(new GameError(GameError.codes.MALFORMED_ACTION, 'missing system'));
        }
    } else {
        return Q.reject(new GameError(GameError.codes.UNHANDLED_ACTION, 'cannot handle this action'));
    }
};

module.exports = Engineer;
