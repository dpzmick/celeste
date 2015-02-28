module.exports = function () {
    return {
        shipJumping: function () {
            console.log('ship jumping');
        },
        
        powerChange: function (system) {
            console.log('Power is now allocated to the ' + system);
        }
    }
}
