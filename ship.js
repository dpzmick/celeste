var powerTo = 'shields';

module.exports = function (alerter) {
    return {
        allocatePower: function (system) {
            powerTo = system;

            alerter.powerChange(powerTo);
        },

        isPowered: function (system) {
            return powerTo == system;
        }
    }
}
