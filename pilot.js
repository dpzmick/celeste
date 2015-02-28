module.exports = function(ship) {
    return {
        handleAction: function(action) {
            console.log(action);
        },

        tryJump: function () {
            ship.tryJump();
        }
    }
}
