var util   = require('util');

var Entity = require('../entity.js');

/**
 * Creates a new ship
 *
 * @constructor
 * @param {object} alerter - the alerter to send updates to
 */
var Ship = function (alerter) {
    Ship.super_.call(this);
    this.alerter = alerter;
    this.powerTo = 'shields';
};
util.inherits(Ship, Entity);

/**
 * Allocates power to the given system
 *
 * @param {string} system
 * @return {promise} - promise that is resolved if the allocation was successful
 */
Ship.prototype.allocatePower = function (system) {
    this.powerTo = system;

    return this.alerter.powerChange(system);
};

Ship.prototype.getPoweredSystem = function () {
    return this.powerTo;
};

Ship.prototype.isPowered = function (system) {
    return this.getPoweredSystem() === system;
};

module.exports = Ship;
