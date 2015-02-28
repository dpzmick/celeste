var warpOn = false;
var powerTo = "warpdrive";

module.exports = function (alertController) {
    return {
        tryJump: function () {
            if (warpOn) {
                alertController.shipJumping();
            }
        },

        turnOnWarp: function () {
            warpOn = true;
        },

        callHidden: function () {
            hidden();
        },
        
        allocatePower: function (system) {
            powerTo = system;
            alertController.powerChange(powerTo);
        }
    }
}

function hidden() {
    console.log('hidden function');
}
