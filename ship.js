var warpOn = false;

module.exports = function(alertController) {
    return {
        tryJump: function() {
            if (warpOn) {
                alertController.shipJumping();
            }
        },

        turnOnWarp: function() {
            warpOn = true;
        },

        callHidden: function() {
            hidden();
        }

    }
}

function hidden() {
    console.log('hidden function');
}
