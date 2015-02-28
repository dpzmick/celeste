module.exports = function () {
    var pilotSocket = null;
    var engineerSocket = null;

    return {
        registerPilot: function(socket) {
            pilotSocket = socket;
        },

        registerEngineer: function(socket) {
            engineerSocket = socket;
        },

        failNavigation: function() {
            pilotSocket.emit('message', {type: 'navigation error', content: 'fuck you'});
        }
    }
}
