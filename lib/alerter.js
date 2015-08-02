var _ = require('lodash');
var Q = require('q');

var GameError = require('./errors/game-error.js');

/**
 * Constructs an object that reports events to the system
 *
 * @constructor
 * @param {socket} everyoneIO - the socket that can be used to send a message to everyone
 */
var Alerter = function (everyoneIO) {
    this.socket = everyoneIO.sockets;
    this.roles  = {};
};

/**
 * Sends a message to a registered role.
 *
 * not really intended to be used outside of this object
 *
 * @param {string} role - previously registered role to send the message to
 * @param {object} payload - message to send
 */
Alerter.prototype.sendMessageTo = function (role, payload) {
    if (_.has(this.roles, role)) {
        this.roles[role].emit('message', payload);
        return Q();
    } else {
        var errStr = 'server trying to send message to role for which it does not know how (' + role + ')';
        return Q.reject(new GameError(GameError.codes.GENERIC, errStr));
    }
};

/**
 * Sends a message to everyone in the system (the everyone socket used when
 * constructing the object)
 *
 * not really intended to be used outside of this object
 *
 * @param {object} payload - message to send
 */
Alerter.prototype.sendMessageToEveryone = function (payload) {
    this.socket.emit('message', payload);
    return Q();
};

/**
 * Registers a socket for a role
 *
 * @param {string} role - name of role
 * @param {socket} socket - the socket to associate with the role
 */
Alerter.prototype.registerSocketFor = function (role, socket) {
    this.roles[role] = socket;
};

/**
 * Let everyone know someone registered
 *
 * @param {string} role - the name of the role that registered
 * @return {promise} resolved when the message sends successfully
 */
Alerter.prototype.someoneRegistered = function (role) {
    var payload = {
        type: 'new registration',
        role: role
    };

    return this.sendMessageToEveryone(payload);
};

/**
 * Let everyone know the ship changed location
 *
 * @param {number} x - new x location
 * @param {number} y - new y location
 * @return {promise} resolved when the message sends successfully
 */
Alerter.prototype.shipLocationChange = function(x, y) {
    var payload = {
        type: 'ship location change',
        x: x,
        y: y
    };

    return this.sendMessageToEveryone(payload);
};

/**
 * Let the relevant parties know that the ships power allocation changed
 *
 * @param {string} system - the system that now has power
 * @return {promise} resolved when the message sends successfully
 */
Alerter.prototype.powerChange = function (system) {
    var payload = {
        type: 'allocation',
        system: system
    };

    return Q.all([
        this.sendMessageTo('engineer', payload),
        this.sendMessageTo('pilot', payload)
    ]);
};

module.exports = Alerter;

// TODO
// is there ever a case in which we do not want to send a message to everyone?
// If the UI has some sort of HUD then that HUD will need to be kept up to date
// so it would make sense to probably just send everything to everyone and then
// let the ui filter the updates
