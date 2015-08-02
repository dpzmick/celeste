'use strict';
var uuid = require('node-uuid');

/**
 * Generic constructor for all entities, assigns a uuid to the object
 *
 * intended to be used with util.inherits
 *
 * @constructor
 */
var Entity = function () {
    // this uuid is guaranteed to be unique for the lifespan of the JS runtime
    this.uuid = uuid.v4();
};

Entity.prototype.getUUID = function () {
    return this.uuid;
};

module.exports = Entity;
