var powerTo = 'shields';

module.exports = function (alerter) {
    return {
        allocatePower: function (system) {
            powerTo = system;

            alerter.powerChange(powerTo);
        },
        
        getPoweredSystem: function () {
            return powerTo;  
        },

        isPowered: function (system) {
            return powerTo == system;
        }
    }
}
