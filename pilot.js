var _ = require('underscore');

module.exports = function(model) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'navigation') {
                if (_.has(action, 'x') && _.has(action, 'y')) {
                    var x = action.x;
                    var y = action.y;
                    debugger;
                    model.moveShip(x, y);
                } else {
                    // TODO throw error
                    console.log('learn to thrown an error');
                }
            }
        }
    }
}
