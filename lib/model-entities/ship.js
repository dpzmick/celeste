var util   = require('util');

var Entity = require('../entity.js');

var Ship = function (alerter) {
    Ship.super_.call(this);
    this.alerter = alerter;
    this.powerTo = 'shields';
};
util.inherits(Ship, Entity);

Ship.prototype.allocatePower = function (system) {
    this.powerTo = system;

    return this.alerter.powerChange(system);
};

Ship.prototype.getPoweredSystem = function () {
    return this.powerTo;
};

Ship.prototype.isPowered = function (system) {
    return this.powerTo === system;
};

module.exports = Ship;
