var Q = require('q');

var Ship = function (alerter) {
    this.alerter = alerter;
    this.powerTo = 'shields';
};

Ship.prototype.allocatePower = function (system) {
    this.powerTo = system;

    return this.alerter.powerChange(system);
};

Ship.prototype.getPoweredSystem = function () {
    return Q(this.powerTo);
};

Ship.prototype.isPowered = function (system) {
    return Q(this.powerTo === system);
};

module.exports = Ship;
