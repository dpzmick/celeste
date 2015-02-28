module.exports = function(alerter) {
    var ship = require('./ship.js')(alerter);
    var space = require('./space.js')(alerter);
    return {
        moveShip: function(x, y) {
            if (ship.isPowered('warpdrive')){
                space.moveShipTo(x, y);
                alerter.jumpSucceeded();
            } else {
                alerter.jumpFailed('warp not active');
            }
        },

        getShip: function () {
            return ship;
        }
    }
}
