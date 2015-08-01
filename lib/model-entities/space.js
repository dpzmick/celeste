var Space = function (width, height, x, y, alerter) {
    this.width  = width;
    this.height = height;
    this.shipX  = x;
    this.shipY  = y;
    this.alerter = alerter;
};

Space.prototype.getShipX = function () {
    return this.shipX;
};

Space.prototype.getShipY = function () {
    return this.shipY;
};

Space.prototype.moveShipTo = function (x, y) {
    this.shipX = x;
    this.shipY = y;

    this.alerter.shipLocationChange(x, y);
};

module.exports = Space;
