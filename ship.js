var powerTo = 'warpdrive';

module.exports = function (alertController) {
    return {
        jump: function () {
            alertController.shipJumping();
        },
        
        canWarp: function () {
            if (powerTo == 'warpdrive') {
                return true;
            } else {
                return false;
            }
        },
        
        allocatePower: function (system) {
            powerTo = system;
            
            alertController.powerChange(powerTo);
        }
    }
}