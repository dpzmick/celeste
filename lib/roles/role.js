var uuid = require('node-uuid');

/**
 *
 * Constructor for a Role object.
 *
 * These objects are intended to be used with util.inherits to give other roles
 * access to globally unique identifiers.
 *
 * I know this isn't like, strictly prototype-y but its easy to understand and
 * since node comes with util.inherits I think this is okay
 *
 * @constructor
 */
var Role = function () {
    // the uuid generated here will be unique for the entire lifetime of the
    // current javascript runtime. In this case, the node process that created
    // the uuid
    this.uuid = uuid.v4();
};

/**
 * gets the uuid of this role
 */
Role.prototype.getUUID = function () {
    return this.uuid;
};

/**
 * This method should never be called. It exists only to throw an error if
 * someone util.inherits to create a new role but forgets to define all of the
 * required methods on the role. It sort of serves to emulate an interface.
 *
 * There is also a test utility to check that this interface is satisfied. I
 * think having both around will be handy (especially when debugging), but that
 * also means we need to define some property on this method to make sure that
 * the assertion in the test case doesn't pick up this method in the prorotype
 * chain when checking to see if it exists.
 */
Role.prototype.handleAction = function () {
    throw new Error('this method should never be called '
                   + 'are you sure it is defined for this role?'
                   + ' (see documentation in Role.js for details)');
};
Role.prototype.handleAction.IS_FAKE_STUB = true;

/**
 * This method is the same handleAction
 */
Role.prototype.getInitialStateData = function () {
    throw new Error('this method should never be called '
                   + 'are you sure it is defined for this role?'
                   + ' (see documentation in Role.js for details)');
};
Role.prototype.getInitialStateData.IS_FAKE_STUB = true;

module.exports = Role;
