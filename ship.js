var warpOn = false;
var powerTo = 'warpdrive';

module.exports = function (alertController) {
    return {
        tryJump: function () {
            if (powerTo == 'warpdrive') {
                alertController.shipJumping();
            } else {
                alertController.jumpFailed();
            }
        },
        
        allocatePower: function (system) {
            powerTo = system;
            
            alertController.powerChange(powerTo);
        }
    }
}