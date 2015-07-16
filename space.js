var _width;
var _height;
var _shipX;
var _shipY;

module.exports = function (width, height, x, y, alerter) {
    _width = width;
    _height = height;
    _shipX = x;
    _shipY = y;

    return {
        getShipX: function () { return _shipX; },

        getShipY: function () { return _shipY; },

        moveShipTo: function (x, y) {
            _shipX = x;
            _shipY = y;

            // TODO bounds checking

            alerter.shipLocationChange(x,y);
        }
    }
}