var planets = {};

/**
 * this is literal crap
 */
module.exports = function () {
    return {
        addPlanet: function(planetName) {
            planets[planetName] = null;
        },
        putShipAt: function (ship, planetName) {
            // TODO check that planet exists
            planets[planetName] = ship;
        },
        removeShipAt: function (planetName) {
            planets[planetName] = null;
        }
    }
}
