var Ship = function (alerter) {
    this.alerter = alerter;
    this.powerTo = 'shields';
};

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
