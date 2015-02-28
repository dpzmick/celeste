module.exports = function (ship) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'allocate') {
                allocatePower(ship, action.system);
            }
        }
    }
}

function allocatePower (ship, system) {
    ship.allocatePower(system);
}