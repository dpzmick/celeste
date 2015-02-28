module.exports = function(alerter) {
    var ship = require('./ship.js')(alerter);
    var space = require('./space.js')(alerter);

    return {
        getShip: function () {
            return ship;
        },
        getSpace: function () {
            return space;
        },
        moveShip: function(from, to) {
            if (ship.canWarp()) {
                console.log('warping from ' + from + ' to ' + to);
            } else {
                alerter.failNavigation();
            }
        }
    }
}
