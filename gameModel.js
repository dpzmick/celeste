module.exports = function(alerter) {
    var ship = require('./ship.js')(alerter);
    var space = require('./space.js')(alerter);
    return {
        moveShip: function(to) {
            if (ship.isPowered('warpdrive')){
                alerter.shipMoved();
            } else {
                alerter.jumpFailed();
            }
        },

        getShip: function () {
            return ship;
        }
    }
}
