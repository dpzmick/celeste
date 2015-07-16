var _ = require('underscore');

module.exports = function(model) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'navigation') {
                if (_.has(action, 'x') && _.has(action, 'y')) {
                    model.moveShip(action.x, action.y);
                } else {
                    // TODO throw error
                    console.log('learn to thrown an error');
                }
            }
        },

        getInitialStateData: function () {
            var space = model.getSpace();
            var ship  = model.getShip();
            
            var shipX = space.getShipX();
            var shipY = space.getShipY();
            
            var powered = ship.getPoweredSystem();
            
            return { locationX: shipY, locationY: shipY, poweredSystem: powered };
        }
    }
}
