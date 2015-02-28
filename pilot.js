module.exports = function(ship) {
    return {
        handleAction: function (action) {
            var type = action.type;

            if (type == 'navigation') {
                console.log('navigate to: ' + action.place);
            }
        }
    }
}
