module.exports = function (model, socket) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'allocate') {
                allocatePower(model.getShip(), action.system);
            }
        }
    }
}

function allocatePower (ship, system) {
    ship.allocatePower(system);
}
