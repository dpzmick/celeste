module.exports = function(ship) {
    return {
        allocatePower: function(system) {
            ship.allocatePower(system);
        }
    }
}