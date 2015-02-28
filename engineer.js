var _ = require('underscore');

module.exports = function (model, socket) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'allocate') {
                if (_.has(action, 'system')) {
                    allocatePower(model.getShip(), action.system);
                } else {
                    console.log('learn to throw an error');
                }
            }
        },
        
        getInitialStateData: function () {
            var ship = model.getShip();
            
            var powered = ship.getPoweredSystem();
            
            return { poweredSystem: powered };
        }
    }
}

function allocatePower (ship, system) {
    ship.allocatePower(system);
}
