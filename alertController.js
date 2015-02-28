module.exports = function () {
    return {
        shipJumping: function () {
            console.log('ship jumping');
        },
        
        jumpFailed: function () {
            console.log('Jump failed: insufficient power');
        },
        
        powerChange: function (system) {
            console.log('Power is now allocated to the ' + system);
        }
    }
}
