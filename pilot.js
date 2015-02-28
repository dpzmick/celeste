module.exports = function(model) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'navigation') {
                var to = action.to;
                return model.moveShip(to);
            }
        }
    }
}
